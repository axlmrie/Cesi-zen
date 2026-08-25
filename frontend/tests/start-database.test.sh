#!/usr/bin/env bash

set -Eeuo pipefail

TEST_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
FRONTEND_ROOT="$(cd -- "${TEST_DIR}/.." && pwd -P)"
SANDBOX="$(mktemp -d /tmp/cesizen-mariadb-script.XXXXXX)"

cleanup() {
  case "${SANDBOX}" in
    /tmp/cesizen-mariadb-script.*)
      rm -rf -- "${SANDBOX}"
      ;;
  esac
}
trap cleanup EXIT

mkdir -p "${SANDBOX}/app" "${SANDBOX}/bin"
cp -- "${FRONTEND_ROOT}/start-database.sh" "${SANDBOX}/app/start-database.sh"

cat >"${SANDBOX}/bin/docker" <<'DOCKER_STUB'
#!/usr/bin/env bash
printf '%s\n' "$*" >>"${FAKE_DOCKER_LOG:?}"

if [[ "$1" == info ]]; then
  exit 0
fi
if [[ "$1" == container && "$2" == inspect ]]; then
  exit 1
fi
exit 0
DOCKER_STUB

cat >"${SANDBOX}/bin/nc" <<'NC_STUB'
#!/usr/bin/env bash
exit 1
NC_STUB

chmod +x "${SANDBOX}/bin/docker" "${SANDBOX}/bin/nc"

cat >"${SANDBOX}/app/.env" <<'VALID_ENV'
DATABASE_URL="mysql://cesizen_user:p%40ssword@localhost:3307/cesizen_db"
VALID_ENV

FAKE_DOCKER_LOG="${SANDBOX}/docker.log" \
  PATH="${SANDBOX}/bin:${PATH}" \
  bash "${SANDBOX}/app/start-database.sh" >"${SANDBOX}/stdout.log"

grep -Fq -- 'run --detach --name cesizen-mariadb-cesizen_db' "${SANDBOX}/docker.log"
grep -Fq -- '--env MARIADB_USER=cesizen_user' "${SANDBOX}/docker.log"
grep -Fq -- '--env MARIADB_PASSWORD=p@ssword' "${SANDBOX}/docker.log"
grep -Fq -- '--publish 3307:3306' "${SANDBOX}/docker.log"
grep -Fq -- '--volume cesizen-mariadb-cesizen_db-data:/var/lib/mysql' "${SANDBOX}/docker.log"
grep -Fq -- 'docker.io/library/mariadb:11.4' "${SANDBOX}/docker.log"

cat >"${SANDBOX}/app/.env" <<'INVALID_ENV'
DATABASE_URL="postgresql://cesizen_user:password@localhost:5432/cesizen_db"
INVALID_ENV
: >"${SANDBOX}/docker.log"

if FAKE_DOCKER_LOG="${SANDBOX}/docker.log" \
  PATH="${SANDBOX}/bin:${PATH}" \
  bash "${SANDBOX}/app/start-database.sh" \
  >"${SANDBOX}/invalid.stdout.log" 2>"${SANDBOX}/invalid.stderr.log"; then
  printf 'PostgreSQL URL was unexpectedly accepted.\n' >&2
  exit 1
fi

[[ ! -s "${SANDBOX}/docker.log" ]]
grep -Fq -- 'valid MariaDB connection URL' "${SANDBOX}/invalid.stderr.log"
if grep -Fq -- 'password' "${SANDBOX}/invalid.stderr.log"; then
  printf 'The rejected database URL leaked credentials.\n' >&2
  exit 1
fi

cat >"${SANDBOX}/app/.env" <<'ROOT_ENV'
DATABASE_URL="mysql://root:root_password@localhost:3306/cesizen_db"
ROOT_ENV
: >"${SANDBOX}/docker.log"

if FAKE_DOCKER_LOG="${SANDBOX}/docker.log" \
  PATH="${SANDBOX}/bin:${PATH}" \
  bash "${SANDBOX}/app/start-database.sh" \
  >"${SANDBOX}/root.stdout.log" 2>"${SANDBOX}/root.stderr.log"; then
  printf 'The root MariaDB account was unexpectedly accepted.\n' >&2
  exit 1
fi

[[ ! -s "${SANDBOX}/docker.log" ]]
grep -Fq -- 'dedicated MariaDB user' "${SANDBOX}/root.stderr.log"

printf 'MariaDB development database script tests passed.\n'
