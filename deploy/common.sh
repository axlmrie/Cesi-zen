#!/usr/bin/env bash

set -Eeuo pipefail

DEPLOY_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
COMPOSE_FILE="${DEPLOY_ROOT}/docker-compose.production.yml"
ROUTER_TEMPLATE_DIR="${DEPLOY_ROOT}/nginx/templates"
ROUTER_RUNTIME_DIR="${DEPLOY_ROOT}/nginx/runtime"
ROUTER_ACTIVE_CONFIG="${ROUTER_RUNTIME_DIR}/active.conf"
DEPLOY_LOCK_FILE="${DEPLOY_ROOT}/.deploy.lock"

readonly DEPLOY_ROOT COMPOSE_FILE ROUTER_TEMPLATE_DIR ROUTER_RUNTIME_DIR
readonly ROUTER_ACTIVE_CONFIG DEPLOY_LOCK_FILE

log() {
  printf '[cesizen-deploy] %s\n' "$*" >&2
}

warn() {
  printf '[cesizen-deploy] WARNING: %s\n' "$*" >&2
}

die() {
  printf '[cesizen-deploy] ERROR: %s\n' "$*" >&2
  exit 1
}

trim_whitespace() {
  local value="$1"
  value="${value#"${value%%[![:space:]]*}"}"
  value="${value%"${value##*[![:space:]]}"}"
  printf '%s' "${value}"
}

resolve_existing_file() {
  local supplied_path="$1"
  local candidate directory filename

  if [[ "${supplied_path}" = /* ]]; then
    candidate="${supplied_path}"
  else
    candidate="${DEPLOY_ROOT}/${supplied_path}"
  fi

  [[ -f "${candidate}" ]] || die "Required file not found: ${candidate}"

  directory="$(cd -- "$(dirname -- "${candidate}")" && pwd -P)"
  filename="$(basename -- "${candidate}")"
  printf '%s/%s' "${directory}" "${filename}"
}

is_supported_deploy_key() {
  case "$1" in
    CESIZEN_IMAGE | COMPOSE_PROJECT_NAME | DATABASE_NETWORK | DEPLOY_HEALTH_INTERVAL | \
      DEPLOY_HEALTH_TIMEOUT | INFRA_HEALTH_TIMEOUT | MAINTENANCE_CONTAINER | \
      MAINTENANCE_PORT | NGINX_IMAGE | NPM_NETWORK | PRODUCTION_ENV_FILE)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

parse_deploy_env_file() {
  local env_file="$1"
  local line line_number=0 key value
  local -A seen_keys=()

  while IFS= read -r line || [[ -n "${line}" ]]; do
    line_number=$((line_number + 1))
    line="${line%$'\r'}"
    line="$(trim_whitespace "${line}")"

    if [[ -z "${line}" || "${line}" == \#* ]]; then
      continue
    fi

    if [[ ! "${line}" =~ ^([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
      die "Invalid assignment in ${env_file} at line ${line_number}."
    fi

    key="${BASH_REMATCH[1]}"
    value="$(trim_whitespace "${BASH_REMATCH[2]}")"

    is_supported_deploy_key "${key}" || \
      die "Unsupported variable ${key} in ${env_file} at line ${line_number}."
    [[ ! -v "seen_keys[${key}]" ]] || \
      die "Duplicate variable ${key} in ${env_file} at line ${line_number}."
    seen_keys["${key}"]=1

    if [[ "${value}" == \"* ]]; then
      [[ ${#value} -ge 2 && "${value: -1}" == '"' ]] || \
        die "Unclosed double quote for ${key} in ${env_file}."
      value="${value:1:${#value}-2}"
    elif [[ "${value}" == \'* ]]; then
      [[ ${#value} -ge 2 && "${value: -1}" == "'" ]] || \
        die "Unclosed single quote for ${key} in ${env_file}."
      value="${value:1:${#value}-2}"
    fi

    # Explicit process environment values take precedence for CI deployments.
    if [[ ! -v "${key}" ]]; then
      printf -v "${key}" '%s' "${value}"
      export "${key?}"
    fi
  done <"${env_file}"
}

read_env_assignment() {
  local key_to_find="$1"
  local env_file="$2"
  local line key value was_quoted

  while IFS= read -r line || [[ -n "${line}" ]]; do
    line="${line%$'\r'}"
    line="$(trim_whitespace "${line}")"

    if [[ -z "${line}" || "${line}" == \#* ]]; then
      continue
    fi

    if [[ "${line}" =~ ^(export[[:space:]]+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
      key="${BASH_REMATCH[2]}"
      if [[ "${key}" == "${key_to_find}" ]]; then
        value="$(trim_whitespace "${BASH_REMATCH[3]}")"
        was_quoted=false
        if [[ ${#value} -ge 2 ]]; then
          if [[ "${value:0:1}" == '"' && "${value: -1}" == '"' ]]; then
            value="${value:1:${#value}-2}"
            was_quoted=true
          elif [[ "${value:0:1}" == "'" && "${value: -1}" == "'" ]]; then
            value="${value:1:${#value}-2}"
            was_quoted=true
          fi
        fi
        if [[ "${was_quoted}" == false && \
          "${value}" =~ ^(.*[^[:space:]])[[:space:]]+\#.*$ ]]; then
          value="${BASH_REMATCH[1]}"
        fi
        printf '%s' "${value}"
        return 0
      fi
    fi
  done <"${env_file}"

  return 1
}

validate_unique_env_assignment() {
  local key_to_find="$1"
  local env_file="$2"
  local line key assignment_count=0

  while IFS= read -r line || [[ -n "${line}" ]]; do
    line="${line%$'\r'}"
    line="$(trim_whitespace "${line}")"

    if [[ "${line}" =~ ^(export[[:space:]]+)?([A-Za-z_][A-Za-z0-9_]*)= ]]; then
      key="${BASH_REMATCH[2]}"
      if [[ "${key}" == "${key_to_find}" ]]; then
        assignment_count=$((assignment_count + 1))
      fi
    fi
  done <"${env_file}"

  if ((assignment_count == 0)); then
    die "${key_to_find} is missing from ${env_file}."
  fi
  if ((assignment_count > 1)); then
    die "${key_to_find} is defined more than once in ${env_file}."
  fi
}

validate_positive_integer() {
  local variable_name="$1"
  local value="$2"

  [[ "${value}" =~ ^[1-9][0-9]*$ ]] || \
    die "${variable_name} must be a positive integer (seconds)."
}

validate_production_environment() {
  local database_url auth_secret auth_url permissions group_bits other_bits

  validate_unique_env_assignment DATABASE_URL "${PRODUCTION_ENV_FILE}"
  validate_unique_env_assignment BETTER_AUTH_SECRET "${PRODUCTION_ENV_FILE}"
  validate_unique_env_assignment BETTER_AUTH_URL "${PRODUCTION_ENV_FILE}"

  database_url="$(read_env_assignment DATABASE_URL "${PRODUCTION_ENV_FILE}")"
  auth_secret="$(read_env_assignment BETTER_AUTH_SECRET "${PRODUCTION_ENV_FILE}")"
  auth_url="$(read_env_assignment BETTER_AUTH_URL "${PRODUCTION_ENV_FILE}")"

  [[ "${database_url}" == mysql://* ]] || \
    die "DATABASE_URL must use the mysql:// scheme required by Prisma for MariaDB."
  [[ ${#auth_secret} -ge 32 ]] || \
    die "BETTER_AUTH_SECRET must contain at least 32 characters."
  [[ "${auth_secret}" != \#* ]] || \
    die "BETTER_AUTH_SECRET must not be an empty value followed by a comment."
  [[ "${auth_secret}" != *'$'* && "${auth_secret}" != *'\'* ]] || \
    die "BETTER_AUTH_SECRET must be literal and must not use Compose interpolation or escapes."
  [[ "${auth_url}" == https://* ]] || \
    die "BETTER_AUTH_URL must use HTTPS in production."
  [[ "${database_url}" != *'$'* && "${auth_url}" != *'$'* ]] || \
    die "Required production URLs must be literal and must not use Compose interpolation."

  if [[ "${database_url}" == *REPLACE_* || "${database_url}" == *DATABASE_HOST* || \
    "${auth_secret}" == *REPLACE_* || "${auth_url}" == *example.org* ]]; then
    die "Production placeholders remain in ${PRODUCTION_ENV_FILE}."
  fi

  if permissions="$(stat -c '%a' "${PRODUCTION_ENV_FILE}" 2>/dev/null)"; then
    group_bits="${permissions: -2:1}"
    other_bits="${permissions: -1}"
    [[ "${other_bits}" == 0 ]] || \
      die "${PRODUCTION_ENV_FILE} must not grant permissions to other users; chmod 600 is recommended."
    if [[ "${group_bits}" != 0 ]]; then
      warn "${PRODUCTION_ENV_FILE} grants group permissions; chmod 600 is recommended."
    fi
  fi
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || die "Required command not found: $1"
}

load_and_validate_environment() {
  local deploy_env_input production_env_input

  deploy_env_input="${DEPLOY_ENV_FILE:-${DEPLOY_ROOT}/.env.deploy}"
  DEPLOY_ENV_FILE="$(resolve_existing_file "${deploy_env_input}")"
  export DEPLOY_ENV_FILE

  parse_deploy_env_file "${DEPLOY_ENV_FILE}"

  : "${COMPOSE_PROJECT_NAME:=cesizen}"
  : "${NGINX_IMAGE:=nginx:1.30.4-alpine}"
  : "${DEPLOY_HEALTH_TIMEOUT:=150}"
  : "${DEPLOY_HEALTH_INTERVAL:=3}"
  : "${INFRA_HEALTH_TIMEOUT:=60}"
  : "${MAINTENANCE_CONTAINER:=maintenance-web}"
  : "${MAINTENANCE_PORT:=80}"
  : "${DATABASE_NETWORK:=db-tier}"
  : "${PRODUCTION_ENV_FILE:=.env.production}"

  : "${CESIZEN_IMAGE:?CESIZEN_IMAGE is required in .env.deploy or the process environment}"
  : "${NPM_NETWORK:?NPM_NETWORK is required in .env.deploy or the process environment}"

  [[ "${CESIZEN_IMAGE}" =~ ^ghcr\.io/[A-Za-z0-9._-]+(/[A-Za-z0-9._-]+)+(:[A-Za-z0-9_][A-Za-z0-9._-]*|@sha256:[A-Fa-f0-9]{64})$ ]] || \
    die "CESIZEN_IMAGE must be a full tagged or digest-pinned ghcr.io reference."
  [[ "${NPM_NETWORK}" =~ ^[A-Za-z0-9][A-Za-z0-9_.-]*$ ]] || \
    die "NPM_NETWORK contains unsupported characters."
  [[ "${DATABASE_NETWORK}" =~ ^[A-Za-z0-9][A-Za-z0-9_.-]*$ ]] || \
    die "DATABASE_NETWORK contains unsupported characters."
  [[ "${COMPOSE_PROJECT_NAME}" =~ ^[a-z0-9][a-z0-9_-]*$ ]] || \
    die "COMPOSE_PROJECT_NAME must use lowercase letters, digits, underscores or hyphens."
  [[ "${MAINTENANCE_CONTAINER}" =~ ^[A-Za-z0-9][A-Za-z0-9_.-]*$ ]] || \
    die "MAINTENANCE_CONTAINER contains unsupported characters."
  [[ "${MAINTENANCE_CONTAINER}" != cesizen-router && \
    "${MAINTENANCE_CONTAINER}" != cesizen-web ]] || \
    die "MAINTENANCE_CONTAINER must be distinct from CesiZen managed containers."
  [[ "${MAINTENANCE_PORT}" =~ ^[1-9][0-9]{0,4}$ ]] && \
    ((10#${MAINTENANCE_PORT} <= 65535)) || \
    die "MAINTENANCE_PORT must be between 1 and 65535."
  [[ "${NGINX_IMAGE}" =~ ^[A-Za-z0-9][A-Za-z0-9._/:@+-]*$ ]] || \
    die "NGINX_IMAGE contains unsupported image-reference characters."

  validate_positive_integer DEPLOY_HEALTH_TIMEOUT "${DEPLOY_HEALTH_TIMEOUT}"
  validate_positive_integer DEPLOY_HEALTH_INTERVAL "${DEPLOY_HEALTH_INTERVAL}"
  validate_positive_integer INFRA_HEALTH_TIMEOUT "${INFRA_HEALTH_TIMEOUT}"

  production_env_input="${PRODUCTION_ENV_FILE}"
  PRODUCTION_ENV_FILE="$(resolve_existing_file "${production_env_input}")"
  [[ "${PRODUCTION_ENV_FILE}" =~ ^/[A-Za-z0-9._/@+-]+$ ]] || \
    die "PRODUCTION_ENV_FILE must resolve to a safe absolute Ubuntu path."

  export CESIZEN_IMAGE COMPOSE_PROJECT_NAME DATABASE_NETWORK DEPLOY_HEALTH_INTERVAL
  export DEPLOY_HEALTH_TIMEOUT INFRA_HEALTH_TIMEOUT MAINTENANCE_CONTAINER
  export MAINTENANCE_PORT NGINX_IMAGE NPM_NETWORK PRODUCTION_ENV_FILE

  validate_production_environment
}

compose() {
  docker compose \
    --project-name "${COMPOSE_PROJECT_NAME}" \
    --project-directory "${DEPLOY_ROOT}" \
    --env-file "${DEPLOY_ENV_FILE}" \
    --file "${COMPOSE_FILE}" \
    "$@"
}

acquire_deploy_lock() {
  [[ ! -L "${DEPLOY_LOCK_FILE}" ]] || \
    die "Deployment lock path must not be a symlink: ${DEPLOY_LOCK_FILE}"

  exec {DEPLOY_LOCK_FD}>"${DEPLOY_LOCK_FILE}"
  flock --nonblock "${DEPLOY_LOCK_FD}" || \
    die "Another CesiZen deployment or maintenance operation is already running."
}

ensure_runtime_config() {
  local production_template="${ROUTER_TEMPLATE_DIR}/production.conf"

  [[ -d "${ROUTER_RUNTIME_DIR}" && ! -L "${ROUTER_RUNTIME_DIR}" ]] || \
    die "Router runtime directory is missing or is a symlink: ${ROUTER_RUNTIME_DIR}"
  [[ -f "${production_template}" ]] || \
    die "Production router template is missing: ${production_template}"
  [[ ! -L "${ROUTER_ACTIVE_CONFIG}" ]] || \
    die "Router active configuration must not be a symlink: ${ROUTER_ACTIVE_CONFIG}"

  if [[ ! -f "${ROUTER_ACTIVE_CONFIG}" ]]; then
    install -m 0644 -- "${production_template}" "${ROUTER_ACTIVE_CONFIG}"
  fi
}

assert_compose_container_ownership() {
  local container_name="$1"
  local expected_service="$2"
  local actual_project actual_service

  if ! docker container inspect "${container_name}" >/dev/null 2>&1; then
    return 0
  fi

  actual_project="$(docker inspect \
    --format '{{with index .Config.Labels "com.docker.compose.project"}}{{.}}{{end}}' \
    "${container_name}")"
  actual_service="$(docker inspect \
    --format '{{with index .Config.Labels "com.docker.compose.service"}}{{.}}{{end}}' \
    "${container_name}")"

  [[ "${actual_project}" == "${COMPOSE_PROJECT_NAME}" && \
    "${actual_service}" == "${expected_service}" ]] || \
    die "Container name collision: ${container_name} is not owned by ${COMPOSE_PROJECT_NAME}/${expected_service}."
}

initialize_deploy_context() {
  require_command docker
  require_command flock
  require_command install
  require_command mktemp
  require_command sed
  require_command stat

  [[ -f "${COMPOSE_FILE}" ]] || die "Compose file is missing: ${COMPOSE_FILE}"
  [[ -f "${DEPLOY_ROOT}/nginx/router.conf" ]] || die "Router configuration is missing."

  load_and_validate_environment
  acquire_deploy_lock

  docker compose version >/dev/null 2>&1 || \
    die "Docker Compose v2 is required (docker compose)."
  docker info >/dev/null 2>&1 || \
    die "The Docker daemon is unavailable for the current user."
  docker network inspect "${NPM_NETWORK}" >/dev/null 2>&1 || \
    die "External NPM network not found: ${NPM_NETWORK}"
  docker network inspect "${DATABASE_NETWORK}" >/dev/null 2>&1 || \
    die "External database network not found: ${DATABASE_NETWORK}"

  assert_compose_container_ownership cesizen-router cesizen-router
  assert_compose_container_ownership cesizen-web cesizen-web

  ensure_runtime_config
  compose config --quiet
}

container_is_healthy() {
  local container_name="$1"
  local status

  status="$(docker inspect \
    --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}no-health:{{.State.Status}}{{end}}' \
    "${container_name}" 2>/dev/null || true)"
  [[ "${status}" == healthy ]]
}

wait_for_container_health() {
  local container_name="$1"
  local timeout_seconds="$2"
  local interval_seconds="$3"
  local deadline status

  deadline=$((SECONDS + timeout_seconds))
  while ((SECONDS < deadline)); do
    status="$(docker inspect \
      --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}no-health:{{.State.Status}}{{end}}' \
      "${container_name}" 2>/dev/null || true)"

    if [[ "${status}" == healthy ]]; then
      log "${container_name} is healthy."
      return 0
    fi

    if [[ "${status}" == no-health:exited || "${status}" == no-health:dead ]]; then
      break
    fi

    sleep "${interval_seconds}"
  done

  warn "${container_name} did not become healthy within ${timeout_seconds}s (last state: ${status:-missing})."
  docker logs --tail 80 "${container_name}" >&2 2>/dev/null || true
  return 1
}

wait_for_application_http() {
  local container_name="$1"
  local timeout_seconds="$2"
  local interval_seconds="$3"
  local max_attempts request_timeout_ms attempt

  max_attempts=$(((timeout_seconds + interval_seconds - 1) / interval_seconds))
  request_timeout_ms=$((interval_seconds * 1000))
  if ((request_timeout_ms > 5000)); then
    request_timeout_ms=5000
  fi

  for ((attempt = 1; attempt <= max_attempts; attempt++)); do
    if docker exec "${container_name}" node -e \
      "fetch('http://127.0.0.1:3000/api/health', { redirect: 'manual', signal: AbortSignal.timeout(${request_timeout_ms}) }).then((response) => process.exit(response.status === 200 ? 0 : 1)).catch(() => process.exit(1))"; then
      log "${container_name} returned HTTP 200 on /api/health (attempt ${attempt}/${max_attempts})."
      return 0
    fi

    if ((attempt < max_attempts)); then
      sleep "${interval_seconds}"
    fi
  done

  warn "${container_name} did not return HTTP 200 on /api/health after ${max_attempts} attempts."
  docker logs --tail 80 "${container_name}" >&2 2>/dev/null || true
  return 1
}

network_has_container() {
  local network_name="$1"
  local container_name="$2"
  local container_id attached_id

  container_id="$(docker inspect --format '{{.Id}}' "${container_name}" 2>/dev/null)" || \
    return 1

  while IFS= read -r attached_id; do
    if [[ "${attached_id}" == "${container_id}" ]]; then
      return 0
    fi
  done < <(
    docker network inspect \
      --format '{{range $id, $_ := .Containers}}{{println $id}}{{end}}' \
      "${network_name}" 2>/dev/null
  )

  return 1
}

wait_for_container_running() {
  local container_name="$1"
  local timeout_seconds="$2"
  local interval_seconds="$3"
  local deadline status

  deadline=$((SECONDS + timeout_seconds))
  while ((SECONDS < deadline)); do
    status="$(docker inspect --format '{{.State.Status}}' "${container_name}" 2>/dev/null || true)"
    if [[ "${status}" == running ]]; then
      log "${container_name} is running."
      return 0
    fi
    if [[ "${status}" == dead || "${status}" == removing ]]; then
      break
    fi
    sleep "${interval_seconds}"
  done

  warn "${container_name} did not reach the running state within ${timeout_seconds}s (last state: ${status:-missing})."
  docker logs --tail 80 "${container_name}" >&2 2>/dev/null || true
  return 1
}

ensure_external_maintenance_container() {
  local current_state

  docker container inspect "${MAINTENANCE_CONTAINER}" >/dev/null 2>&1 || \
    die "External maintenance container not found: ${MAINTENANCE_CONTAINER}"

  current_state="$(docker inspect --format '{{.State.Status}}' "${MAINTENANCE_CONTAINER}")"
  case "${current_state}" in
    running | restarting)
      ;;
    created | exited)
      log "Starting external maintenance container ${MAINTENANCE_CONTAINER}."
      docker container start "${MAINTENANCE_CONTAINER}" >/dev/null
      ;;
    paused)
      die "External maintenance container is paused; unpause it explicitly before deploying."
      ;;
    *)
      die "External maintenance container cannot be started from state: ${current_state}"
      ;;
  esac
  wait_for_container_running \
    "${MAINTENANCE_CONTAINER}" \
    "${INFRA_HEALTH_TIMEOUT}" \
    "${DEPLOY_HEALTH_INTERVAL}"

  if ! network_has_container "${NPM_NETWORK}" "${MAINTENANCE_CONTAINER}"; then
    log "Connecting ${MAINTENANCE_CONTAINER} to ${NPM_NETWORK}."
    if ! docker network connect "${NPM_NETWORK}" "${MAINTENANCE_CONTAINER}"; then
      network_has_container "${NPM_NETWORK}" "${MAINTENANCE_CONTAINER}" || \
        die "Could not connect ${MAINTENANCE_CONTAINER} to ${NPM_NETWORK}."
    fi
  fi
}

wait_for_maintenance_reachability() {
  local deadline

  deadline=$((SECONDS + INFRA_HEALTH_TIMEOUT))
  while ((SECONDS < deadline)); do
    if compose exec --no-TTY cesizen-router sh -c \
      "wget -S -O /dev/null 'http://${MAINTENANCE_CONTAINER}:${MAINTENANCE_PORT}/' 2>&1 | grep -Eq 'HTTP/[0-9.]+ [0-9]{3}'"; then
      log "${MAINTENANCE_CONTAINER}:${MAINTENANCE_PORT} is reachable from cesizen-router."
      return 0
    fi
    sleep "${DEPLOY_HEALTH_INTERVAL}"
  done

  warn "${MAINTENANCE_CONTAINER}:${MAINTENANCE_PORT} is not reachable from cesizen-router."
  return 1
}

start_maintenance_infrastructure() {
  ensure_external_maintenance_container

  compose up --detach --no-deps cesizen-router
  wait_for_container_health cesizen-router "${INFRA_HEALTH_TIMEOUT}" "${DEPLOY_HEALTH_INTERVAL}"
  wait_for_maintenance_reachability
}

activate_route() {
  local route_name="$1"
  local template candidate backup
  local had_active_config=false

  case "${route_name}" in
    production | maintenance)
      ;;
    *)
      warn "Unknown router mode: ${route_name}"
      return 1
      ;;
  esac

  template="${ROUTER_TEMPLATE_DIR}/${route_name}.conf"
  [[ -f "${template}" ]] || {
    warn "Router template is missing: ${template}"
    return 1
  }

  candidate="$(mktemp "${ROUTER_RUNTIME_DIR}/.active.conf.candidate.XXXXXX")"
  backup="$(mktemp "${ROUTER_RUNTIME_DIR}/.active.conf.backup.XXXXXX")"

  if [[ -f "${ROUTER_ACTIVE_CONFIG}" ]]; then
    cp -- "${ROUTER_ACTIVE_CONFIG}" "${backup}"
    had_active_config=true
  fi

  if [[ "${route_name}" == maintenance ]]; then
    sed \
      -e "s/__MAINTENANCE_CONTAINER__/${MAINTENANCE_CONTAINER}/g" \
      -e "s/__MAINTENANCE_PORT__/${MAINTENANCE_PORT}/g" \
      -- "${template}" >"${candidate}"
    chmod 0644 "${candidate}"
  else
    install -m 0644 -- "${template}" "${candidate}"
  fi
  mv -f -- "${candidate}" "${ROUTER_ACTIVE_CONFIG}"

  if ! compose exec --no-TTY cesizen-router nginx -t; then
    warn "Nginx rejected the ${route_name} router configuration."
    if [[ "${had_active_config}" == true ]]; then
      mv -f -- "${backup}" "${ROUTER_ACTIVE_CONFIG}"
    else
      rm -f -- "${ROUTER_ACTIVE_CONFIG}" "${backup}"
    fi
    return 1
  fi

  if ! compose exec --no-TTY cesizen-router nginx -s reload; then
    warn "Nginx could not reload the ${route_name} router configuration."
    if [[ "${had_active_config}" == true ]]; then
      mv -f -- "${backup}" "${ROUTER_ACTIVE_CONFIG}"
      compose exec --no-TTY cesizen-router nginx -t >/dev/null 2>&1 && \
        compose exec --no-TTY cesizen-router nginx -s reload >/dev/null 2>&1 || true
    else
      rm -f -- "${ROUTER_ACTIVE_CONFIG}" "${backup}"
    fi
    return 1
  fi

  rm -f -- "${backup}"
  log "Router switched to ${route_name}."
}
