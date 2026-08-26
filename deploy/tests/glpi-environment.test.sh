#!/usr/bin/env bash

set -Eeuo pipefail

TEST_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
DEPLOY_ROOT_FOR_TEST="$(cd -- "${TEST_DIR}/.." && pwd -P)"
SANDBOX="$(mktemp -d /tmp/cesizen-glpi-env.XXXXXX)"

cleanup() {
  case "${SANDBOX}" in
    /tmp/cesizen-glpi-env.*)
      rm -rf -- "${SANDBOX}"
      ;;
  esac
}
trap cleanup EXIT

# shellcheck source=../common.sh
source "${DEPLOY_ROOT_FOR_TEST}/common.sh"

PRODUCTION_ENV_FILE="${SANDBOX}/.env.production"
export PRODUCTION_ENV_FILE

if [[ "$(uname -s)" == MINGW* ]]; then
  stat() {
    if [[ "$1" == -c && "$2" == %a && "$3" == "${PRODUCTION_ENV_FILE}" ]]; then
      printf '600\n'
      return 0
    fi
    command stat "$@"
  }
fi

write_base_environment() {
  cat >"${PRODUCTION_ENV_FILE}" <<'BASE_ENV'
DATABASE_URL="mysql://cesizen_user:encoded_password@mariadb.internal:3306/cesizen"
BETTER_AUTH_SECRET="a-valid-literal-secret-with-at-least-32-characters"
BETTER_AUTH_URL="https://cesizen.example.test"
BASE_ENV
  chmod 600 "${PRODUCTION_ENV_FILE}"
}

write_complete_glpi_environment() {
  write_base_environment
  cat >>"${PRODUCTION_ENV_FILE}" <<'GLPI_ENV'
GLPI_API_URL="http://glpi/apirest.php"
GLPI_APP_TOKEN="valid-app-token"
GLPI_USER_TOKEN="valid-user-token"
GLPI_TIMEOUT_MS="10000"
GLPI_CATEGORY_ACCOUNT_ID="10"
GLPI_CATEGORY_TECHNICAL_ID="20"
GLPI_CATEGORY_USAGE_ID="30"
GLPI_CATEGORY_PRIVACY_ID="40"
GLPI_CATEGORY_OTHER_ID="50"
GLPI_ENV
}

# GLPI remains optional for installations that have not enabled support yet.
write_base_environment
validate_production_environment

# A complete internal GLPI configuration is accepted.
write_complete_glpi_environment
validate_production_environment

# A partial configuration must fail before a deployment starts.
write_base_environment
cat >>"${PRODUCTION_ENV_FILE}" <<'PARTIAL_GLPI_ENV'
GLPI_API_URL="http://glpi/apirest.php"
GLPI_APP_TOKEN="valid-app-token"
PARTIAL_GLPI_ENV

if (validate_production_environment) >"${SANDBOX}/stdout.log" 2>"${SANDBOX}/stderr.log"; then
  printf 'A partial GLPI configuration was unexpectedly accepted.\n' >&2
  exit 1
fi
grep -Fq -- 'GLPI support configuration is partial' "${SANDBOX}/stderr.log"

# Category IDs are positive GLPI identifiers.
write_complete_glpi_environment
sed -i 's/GLPI_CATEGORY_OTHER_ID="50"/GLPI_CATEGORY_OTHER_ID="0"/' "${PRODUCTION_ENV_FILE}"

if (validate_production_environment) >"${SANDBOX}/stdout.log" 2>"${SANDBOX}/stderr.log"; then
  printf 'An invalid GLPI category ID was unexpectedly accepted.\n' >&2
  exit 1
fi
grep -Fq -- 'Every GLPI category ID must be a positive integer' "${SANDBOX}/stderr.log"

# Category mappings must be unambiguous.
write_complete_glpi_environment
sed -i 's/GLPI_CATEGORY_OTHER_ID="50"/GLPI_CATEGORY_OTHER_ID="10"/' "${PRODUCTION_ENV_FILE}"

if (validate_production_environment) >"${SANDBOX}/stdout.log" 2>"${SANDBOX}/stderr.log"; then
  printf 'Duplicate GLPI category IDs were unexpectedly accepted.\n' >&2
  exit 1
fi
grep -Fq -- 'Every GLPI category ID must be distinct' "${SANDBOX}/stderr.log"

# The App-Token contract is the legacy V1 endpoint, not the OAuth V2 endpoint.
write_complete_glpi_environment
sed -i 's#/apirest.php#/api.php#' "${PRODUCTION_ENV_FILE}"

if (validate_production_environment) >"${SANDBOX}/stdout.log" 2>"${SANDBOX}/stderr.log"; then
  printf 'A non-legacy GLPI API URL was unexpectedly accepted.\n' >&2
  exit 1
fi
grep -Fq -- 'must target the legacy /apirest.php endpoint' "${SANDBOX}/stderr.log"

# A timeout alone is still a partial configuration and must not silently pass.
write_base_environment
printf 'GLPI_TIMEOUT_MS="10000"\n' >>"${PRODUCTION_ENV_FILE}"

if (validate_production_environment) >"${SANDBOX}/stdout.log" 2>"${SANDBOX}/stderr.log"; then
  printf 'A timeout-only GLPI configuration was unexpectedly accepted.\n' >&2
  exit 1
fi
grep -Fq -- 'GLPI support configuration is partial' "${SANDBOX}/stderr.log"

# The outbound API timeout stays bounded.
write_complete_glpi_environment
sed -i 's/GLPI_TIMEOUT_MS="10000"/GLPI_TIMEOUT_MS="99"/' "${PRODUCTION_ENV_FILE}"

if (validate_production_environment) >"${SANDBOX}/stdout.log" 2>"${SANDBOX}/stderr.log"; then
  printf 'An unsafe GLPI timeout was unexpectedly accepted.\n' >&2
  exit 1
fi
grep -Fq -- 'GLPI_TIMEOUT_MS must be between 100 and 60000 milliseconds' "${SANDBOX}/stderr.log"

printf 'GLPI production environment tests passed.\n'
