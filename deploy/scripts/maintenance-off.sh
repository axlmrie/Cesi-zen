#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
# shellcheck source=../common.sh
source "${SCRIPT_DIR}/../common.sh"

main() {
  [[ $# -eq 0 ]] || die "Usage: $0"

  initialize_deploy_context

  wait_for_container_health \
    cesizen-web \
    "${DEPLOY_HEALTH_TIMEOUT}" \
    "${DEPLOY_HEALTH_INTERVAL}"

  compose up --detach --no-deps cesizen-router
  wait_for_container_health \
    cesizen-router \
    "${INFRA_HEALTH_TIMEOUT}" \
    "${DEPLOY_HEALTH_INTERVAL}"

  activate_route production
  log "Production mode is active; external maintenance container remains running."
}

main "$@"
