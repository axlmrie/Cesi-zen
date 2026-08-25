#!/usr/bin/env bash

# Start a MariaDB container for local development using DATABASE_URL from .env.

set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
ENV_FILE="${SCRIPT_DIR}/.env"

die() {
  printf 'ERROR: %s\n' "$*" >&2
  exit 1
}

[[ -f "${ENV_FILE}" ]] || \
  die "${ENV_FILE} is missing. Copy .env.example to .env first."

DATABASE_URL="$({
  sed -n -E \
    's/^[[:space:]]*(export[[:space:]]+)?DATABASE_URL[[:space:]]*=[[:space:]]*(.*)[[:space:]]*$/\2/p' \
    "${ENV_FILE}" | head -n 1
})"

if [[ "${DATABASE_URL}" == \"*\" && ${#DATABASE_URL} -ge 2 ]]; then
  DATABASE_URL="${DATABASE_URL:1:${#DATABASE_URL}-2}"
elif [[ "${DATABASE_URL}" == \'*\' && ${#DATABASE_URL} -ge 2 ]]; then
  DATABASE_URL="${DATABASE_URL:1:${#DATABASE_URL}-2}"
fi

[[ -n "${DATABASE_URL}" ]] || die "DATABASE_URL is missing from ${ENV_FILE}."
command -v node >/dev/null 2>&1 || die "Node.js is required to parse DATABASE_URL safely."

PARSED_DATABASE="$({
  # Node can include its input in an URL parsing error; suppress stderr so a
  # malformed URL never leaks database credentials in CI or terminal logs.
  DATABASE_URL="${DATABASE_URL}" node 2>/dev/null <<'NODE'
const url = new URL(process.env.DATABASE_URL ?? "");

if (url.protocol !== "mysql:") {
  throw new Error("DATABASE_URL must use mysql:// for MariaDB");
}

const decode = (value) => decodeURIComponent(value);
const values = [
  decode(url.username),
  decode(url.password),
  url.hostname,
  url.port || "3306",
  decode(url.pathname.replace(/^\//, "")),
];

if (values.some((value) => /[\r\n]/.test(value))) {
  throw new Error("DATABASE_URL components must not contain line breaks");
}

process.stdout.write(`${values.join("\n")}\n`);
NODE
})" || die "DATABASE_URL is not a valid MariaDB connection URL."

mapfile -t DB_PARTS <<<"${PARSED_DATABASE}"
[[ ${#DB_PARTS[@]} -eq 5 ]] || die "DATABASE_URL could not be parsed."

DB_USER="${DB_PARTS[0]}"
DB_PASSWORD="${DB_PARTS[1]}"
DB_HOST="${DB_PARTS[2]}"
DB_PORT="${DB_PARTS[3]}"
DB_NAME="${DB_PARTS[4]}"

[[ "${DB_HOST}" == localhost || "${DB_HOST}" == 127.0.0.1 || \
  "${DB_HOST}" == "[::1]" ]] || \
  die "start-database.sh only manages a local MariaDB URL."
[[ "${DB_PORT}" =~ ^[0-9]{1,5}$ ]] && \
  ((10#${DB_PORT} >= 1 && 10#${DB_PORT} <= 65535)) || \
  die "The MariaDB port must be between 1 and 65535."
[[ "${DB_USER}" =~ ^[A-Za-z0-9_]+$ ]] || die "The MariaDB user name is invalid."
[[ "${DB_USER}" != root ]] || die "Use a dedicated MariaDB user instead of root."
[[ -n "${DB_PASSWORD}" ]] || die "The MariaDB password must not be empty."
[[ "${DB_NAME}" =~ ^[A-Za-z0-9_]+$ ]] || die "The MariaDB database name is invalid."

DB_CONTAINER_NAME="cesizen-mariadb-${DB_NAME}"

if command -v docker >/dev/null 2>&1; then
  CONTAINER_CMD="docker"
elif command -v podman >/dev/null 2>&1; then
  CONTAINER_CMD="podman"
else
  die "Docker or Podman is not installed."
fi

"${CONTAINER_CMD}" info >/dev/null 2>&1 || \
  die "The ${CONTAINER_CMD} daemon is unavailable."

if "${CONTAINER_CMD}" container inspect "${DB_CONTAINER_NAME}" >/dev/null 2>&1; then
  if [[ "$("${CONTAINER_CMD}" inspect --format '{{.State.Running}}' "${DB_CONTAINER_NAME}")" == true ]]; then
    printf "MariaDB container '%s' is already running.\n" "${DB_CONTAINER_NAME}"
  else
    "${CONTAINER_CMD}" start "${DB_CONTAINER_NAME}" >/dev/null
    printf "Existing MariaDB container '%s' started.\n" "${DB_CONTAINER_NAME}"
  fi
  exit 0
fi

if command -v nc >/dev/null 2>&1 && nc -z localhost "${DB_PORT}" 2>/dev/null; then
  die "Port ${DB_PORT} is already in use."
fi

"${CONTAINER_CMD}" run --detach \
  --name "${DB_CONTAINER_NAME}" \
  --env MARIADB_DATABASE="${DB_NAME}" \
  --env MARIADB_USER="${DB_USER}" \
  --env MARIADB_PASSWORD="${DB_PASSWORD}" \
  --env MARIADB_RANDOM_ROOT_PASSWORD=1 \
  --publish "${DB_PORT}:3306" \
  --volume "${DB_CONTAINER_NAME}-data:/var/lib/mysql" \
  docker.io/library/mariadb:11.4 >/dev/null

printf "MariaDB container '%s' was created on port %s.\n" \
  "${DB_CONTAINER_NAME}" "${DB_PORT}"
