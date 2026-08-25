#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
# shellcheck source=../common.sh
source "${SCRIPT_DIR}/../common.sh"

main() {
  [[ $# -eq 0 ]] || die "Usage: $0"

  initialize_deploy_context
  start_maintenance_infrastructure
  activate_route maintenance
  log "Maintenance mode is active. NPM continues to target cesizen-router:8080."
}

main "$@"
