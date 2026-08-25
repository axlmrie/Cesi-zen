#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
# shellcheck source=../common.sh
source "${SCRIPT_DIR}/../common.sh"

MAINTENANCE_ACTIVE=false
APP_REPLACEMENT_STARTED=false
NEW_VERSION_HEALTHY=false
PREVIOUS_CONTAINER_PRESENT=false
MIGRATION_STEP_STARTED=false
ROLLBACK_IMAGE=""
TARGET_IMAGE=""

deployment_failed() {
  local exit_status="${1:-1}"
  local failed_line="${2:-unknown}"

  trap - ERR HUP INT TERM
  set +e

  warn "Deployment failed at line ${failed_line}; starting recovery."

  if [[ "${MIGRATION_STEP_STARTED}" == true ]]; then
    warn "Database migrations are not rolled back automatically. Verify Prisma migration status and schema compatibility before the next deployment."
  fi

  if [[ "${MAINTENANCE_ACTIVE}" != true ]]; then
    if [[ -n "${ROLLBACK_IMAGE}" ]]; then
      docker image rm "${ROLLBACK_IMAGE}" >/dev/null 2>&1 || true
    fi
    warn "Maintenance routing was not activated; no router recovery is required."
    exit "${exit_status}"
  fi

  if [[ "${NEW_VERSION_HEALTHY}" == true ]]; then
    warn "The new application is healthy, but production routing could not be restored. Maintenance remains active."
    exit "${exit_status}"
  fi

  if [[ "${APP_REPLACEMENT_STARTED}" == true || \
    "${MIGRATION_STEP_STARTED}" == true ]]; then
    if [[ -z "${ROLLBACK_IMAGE}" ]]; then
      warn "No previous image exists for rollback. Maintenance remains active."
      exit "${exit_status}"
    fi

    log "Attempting rollback with ${ROLLBACK_IMAGE}."
    if CESIZEN_IMAGE="${ROLLBACK_IMAGE}" compose up \
      --detach \
      --no-deps \
      --force-recreate \
      cesizen-web && \
      wait_for_application_http \
        cesizen-web \
        "${DEPLOY_HEALTH_TIMEOUT}" \
        "${DEPLOY_HEALTH_INTERVAL}" && \
      activate_route production; then
      MAINTENANCE_ACTIVE=false
      warn "Rollback succeeded; the previous application is serving traffic."
    else
      warn "Rollback failed. Maintenance remains active for a safe manual recovery."
    fi

    exit "${exit_status}"
  fi

  if [[ "${PREVIOUS_CONTAINER_PRESENT}" == true ]] && \
    container_is_healthy cesizen-web && \
    activate_route production; then
    MAINTENANCE_ACTIVE=false
    if [[ -n "${ROLLBACK_IMAGE}" ]]; then
      docker image rm "${ROLLBACK_IMAGE}" >/dev/null 2>&1 || true
    fi
    warn "The new image was not installed; the previous application is serving traffic."
  else
    warn "The previous application is unavailable. Maintenance remains active."
  fi

  exit "${exit_status}"
}

trap 'deployment_failed "$?" "${LINENO}"' ERR
trap 'deployment_failed 129 "${LINENO}"' HUP
trap 'deployment_failed 130 "${LINENO}"' INT
trap 'deployment_failed 143 "${LINENO}"' TERM

main() {
  local previous_image_id deployment_id

  [[ $# -eq 1 ]] || die "Usage: $0 ghcr.io/owner/image@sha256:digest"
  CESIZEN_IMAGE="$1"
  export CESIZEN_IMAGE

  initialize_deploy_context
  TARGET_IMAGE="${CESIZEN_IMAGE}"
  [[ "${TARGET_IMAGE}" =~ ^ghcr[.]io/[a-z0-9._/-]+@sha256:[a-f0-9]{64}$ ]] || \
    die "The deployment image must be an immutable lowercase GHCR sha256 digest."

  if docker container inspect cesizen-web >/dev/null 2>&1; then
    PREVIOUS_CONTAINER_PRESENT=true
    previous_image_id="$(docker inspect --format '{{.Image}}' cesizen-web)"
    [[ "${previous_image_id}" == sha256:* ]] || \
      die "Could not determine the current cesizen-web image ID."

    deployment_id="$(date -u '+%Y%m%d%H%M%S')-$$"
    ROLLBACK_IMAGE="cesizen-rollback:${deployment_id}"
    docker image tag "${previous_image_id}" "${ROLLBACK_IMAGE}"
    log "Prepared local rollback image ${ROLLBACK_IMAGE}."
  fi

  start_maintenance_infrastructure
  activate_route maintenance
  MAINTENANCE_ACTIVE=true

  log "Pulling ${TARGET_IMAGE}."
  CESIZEN_IMAGE="${TARGET_IMAGE}" compose pull cesizen-web

  log "Applying pending Prisma migrations with ${TARGET_IMAGE}."
  MIGRATION_STEP_STARTED=true
  CESIZEN_IMAGE="${TARGET_IMAGE}" compose run \
    --rm \
    cesizen-web \
    prisma migrate deploy

  APP_REPLACEMENT_STARTED=true
  CESIZEN_IMAGE="${TARGET_IMAGE}" compose up \
    --detach \
    --no-deps \
    --force-recreate \
    cesizen-web

  wait_for_application_http \
    cesizen-web \
    "${DEPLOY_HEALTH_TIMEOUT}" \
    "${DEPLOY_HEALTH_INTERVAL}"
  NEW_VERSION_HEALTHY=true

  activate_route production
  MAINTENANCE_ACTIVE=false

  if [[ -n "${ROLLBACK_IMAGE}" ]]; then
    docker image rm "${ROLLBACK_IMAGE}" >/dev/null 2>&1 || \
      warn "Temporary rollback tag ${ROLLBACK_IMAGE} could not be removed."
  fi

  log "Removing unused Docker images."
  docker image prune --all --force || \
    warn "Unused Docker images could not be pruned; deployment remains successful."

  log "Deployment succeeded with ${TARGET_IMAGE}."
}

main "$@"
