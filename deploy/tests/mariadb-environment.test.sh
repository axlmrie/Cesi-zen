#!/usr/bin/env bash

set -Eeuo pipefail

TEST_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
DEPLOY_ROOT_FOR_TEST="$(cd -- "${TEST_DIR}/.." && pwd -P)"
SANDBOX="$(mktemp -d /tmp/cesizen-mariadb-env.XXXXXX)"

cleanup() {
  case "${SANDBOX}" in
    /tmp/cesizen-mariadb-env.*)
      rm -rf -- "${SANDBOX}"
      ;;
  esac
}
trap cleanup EXIT

# shellcheck source=../common.sh
source "${DEPLOY_ROOT_FOR_TEST}/common.sh"

PRODUCTION_ENV_FILE="${SANDBOX}/.env.production"
export PRODUCTION_ENV_FILE

# Git Bash exposes Windows ACLs as mode 644 even after chmod. Keep the real
# permission check on Linux (including CI) and normalize only this test double.
if [[ "$(uname -s)" == MINGW* ]]; then
  stat() {
    if [[ "$1" == -c && "$2" == %a && "$3" == "${PRODUCTION_ENV_FILE}" ]]; then
      printf '600\n'
      return 0
    fi
    command stat "$@"
  }
fi

cat >"${PRODUCTION_ENV_FILE}" <<'VALID_ENV'
DATABASE_URL="mysql://cesizen_user:encoded_password@mariadb.internal:3306/cesizen"
BETTER_AUTH_SECRET="a-valid-literal-secret-with-at-least-32-characters"
BETTER_AUTH_URL="https://cesizen.example.test"
VALID_ENV
chmod 600 "${PRODUCTION_ENV_FILE}"

validate_production_environment

cat >"${PRODUCTION_ENV_FILE}" <<'INVALID_ENV'
DATABASE_URL="postgresql://cesizen_user:password@database.internal:5432/cesizen"
BETTER_AUTH_SECRET="a-valid-literal-secret-with-at-least-32-characters"
BETTER_AUTH_URL="https://cesizen.example.test"
INVALID_ENV
chmod 600 "${PRODUCTION_ENV_FILE}"

if (validate_production_environment) >"${SANDBOX}/stdout.log" 2>"${SANDBOX}/stderr.log"; then
  printf 'A PostgreSQL production URL was unexpectedly accepted.\n' >&2
  exit 1
fi

grep -Fq -- 'mysql:// scheme required by Prisma for MariaDB' "${SANDBOX}/stderr.log"

printf 'MariaDB production environment tests passed.\n'
