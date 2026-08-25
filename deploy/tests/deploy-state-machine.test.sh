#!/usr/bin/env bash

set -Eeuo pipefail

TEST_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
DEPLOY_ROOT="$(cd -- "${TEST_DIR}/.." && pwd -P)"
TARGET_IMAGE='ghcr.io/example/cesizen@sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
PASS_COUNT=0
FAIL_COUNT=0

new_sandbox() {
  local sandbox

  sandbox="$(mktemp -d)"
  mkdir -p "${sandbox}/scripts"
  cp -- "${DEPLOY_ROOT}/scripts/deploy.sh" "${sandbox}/scripts/deploy.sh"
  cp -- "${TEST_DIR}/fixtures/common.stub.sh" "${sandbox}/common.sh"
  printf '%s' "${sandbox}"
}

event_line() {
  local event="$1"
  local events_file="$2"

  grep -n -m 1 -F -- "${event}" "${events_file}" | cut -d: -f1
}

assert_event() {
  local event="$1"
  local events_file="$2"

  grep -Fqx -- "${event}" "${events_file}"
}

assert_event_matching() {
  local event="$1"
  local events_file="$2"

  grep -Fq -- "${event}" "${events_file}"
}

assert_no_event_matching() {
  local event="$1"
  local events_file="$2"

  ! grep -Fq -- "${event}" "${events_file}"
}

assert_before() {
  local first_event="$1"
  local second_event="$2"
  local events_file="$3"
  local first_line second_line

  first_line="$(event_line "${first_event}" "${events_file}")"
  second_line="$(event_line "${second_event}" "${events_file}")"
  [[ -n "${first_line}" && -n "${second_line}" && first_line -lt second_line ]]
}

run_deploy() {
  local sandbox="$1"
  local fail_stage="$2"
  local previous_present="$3"
  shift 3

  TEST_EVENTS_FILE="${sandbox}/events.log" \
    TEST_STATE_FILE="${sandbox}/state" \
    TEST_FAIL_STAGE="${fail_stage}" \
    TEST_PREVIOUS_PRESENT="${previous_present}" \
    CESIZEN_IMAGE="${TARGET_IMAGE}" \
    bash "${sandbox}/scripts/deploy.sh" "$@" \
    >"${sandbox}/stdout.log" 2>"${sandbox}/stderr.log"
}

report_case() {
  local name="$1"
  local status="$2"
  local sandbox="$3"

  if [[ "${status}" -eq 0 ]]; then
    PASS_COUNT=$((PASS_COUNT + 1))
    printf 'ok - %s\n' "${name}"
    return
  fi

  FAIL_COUNT=$((FAIL_COUNT + 1))
  printf 'not ok - %s\n' "${name}"
  sed 's/^/  event: /' "${sandbox}/events.log" 2>/dev/null || true
  sed 's/^/  stderr: /' "${sandbox}/stderr.log" 2>/dev/null || true
}

test_digest_argument_is_mandatory() {
  local sandbox status=0

  sandbox="$(new_sandbox)"
  if run_deploy "${sandbox}" none true; then
    status=1
  fi
  assert_no_event_matching 'maintenance-' "${sandbox}/events.log" || status=1
  report_case 'digest argument is mandatory before side effects' "${status}" "${sandbox}"
  rm -rf -- "${sandbox}"
}

test_tag_argument_is_rejected() {
  local sandbox status=0 tagged_image

  sandbox="$(new_sandbox)"
  tagged_image='ghcr.io/example/cesizen:latest'
  if run_deploy "${sandbox}" none true "${tagged_image}"; then
    status=1
  fi
  assert_no_event_matching 'maintenance-' "${sandbox}/events.log" || status=1
  report_case 'mutable image tag is rejected before side effects' "${status}" "${sandbox}"
  rm -rf -- "${sandbox}"
}

test_success_order() {
  local sandbox status=0 events

  sandbox="$(new_sandbox)"
  events="${sandbox}/events.log"
  run_deploy "${sandbox}" none true "${TARGET_IMAGE}" || status=1
  assert_event 'route-active:maintenance' "${events}" || status=1
  assert_event 'migration' "${events}" || status=1
  assert_event 'compose:run --rm cesizen-web npx prisma migrate deploy' "${events}" || status=1
  assert_event "migration-image:${TARGET_IMAGE}" "${events}" || status=1
  assert_event "app-up:${TARGET_IMAGE}" "${events}" || status=1
  assert_event_matching "http-health:cesizen-web:${TARGET_IMAGE}" "${events}" || status=1
  assert_event 'route-active:production' "${events}" || status=1
  assert_event_matching 'prune:' "${events}" || status=1
  assert_before 'route-active:maintenance' "pull:${TARGET_IMAGE}" "${events}" || status=1
  assert_before 'route-active:maintenance' 'migration' "${events}" || status=1
  assert_before "pull:${TARGET_IMAGE}" 'migration' "${events}" || status=1
  assert_before 'migration' "app-up:${TARGET_IMAGE}" "${events}" || status=1
  assert_before "http-health:cesizen-web:${TARGET_IMAGE}" 'route-active:production' "${events}" || status=1
  assert_before 'route-active:production' 'prune:' "${events}" || status=1
  report_case 'success follows maintenance, migration, health, production, prune' "${status}" "${sandbox}"
  rm -rf -- "${sandbox}"
}

test_migration_failure_with_failed_rollback_keeps_maintenance() {
  local sandbox command_status=0 status=0 events

  sandbox="$(new_sandbox)"
  events="${sandbox}/events.log"
  run_deploy "${sandbox}" migration-and-rollback-health true "${TARGET_IMAGE}" || command_status=$?
  [[ "${command_status}" -ne 0 ]] || status=1
  assert_event 'migration' "${events}" || status=1
  assert_event_matching 'app-up:cesizen-rollback:' "${events}" || status=1
  assert_event_matching 'http-health:cesizen-web:cesizen-rollback:' "${events}" || status=1
  assert_no_event_matching 'route-active:production' "${events}" || status=1
  assert_no_event_matching 'prune:' "${events}" || status=1
  report_case 'migration rollback failure never exposes an unhealthy old application' "${status}" "${sandbox}"
  rm -rf -- "${sandbox}"
}

test_migration_failure_restores_old_application() {
  local sandbox command_status=0 status=0 events

  sandbox="$(new_sandbox)"
  events="${sandbox}/events.log"
  run_deploy "${sandbox}" migration true "${TARGET_IMAGE}" || command_status=$?
  [[ "${command_status}" -ne 0 ]] || status=1
  assert_event 'migration' "${events}" || status=1
  assert_no_event_matching "app-up:${TARGET_IMAGE}" "${events}" || status=1
  assert_event_matching 'app-up:cesizen-rollback:' "${events}" || status=1
  assert_event_matching 'http-health:cesizen-web:cesizen-rollback:' "${events}" || status=1
  assert_event 'route-active:production' "${events}" || status=1
  assert_before 'migration' 'app-up:cesizen-rollback:' "${events}" || status=1
  assert_before 'http-health:cesizen-web:cesizen-rollback:' 'route-active:production' "${events}" || status=1
  assert_no_event_matching 'prune:' "${events}" || status=1
  report_case 'migration failure keeps old healthy application and exits non-zero' "${status}" "${sandbox}"
  rm -rf -- "${sandbox}"
}

test_target_health_failure_rolls_back() {
  local sandbox command_status=0 status=0 events

  sandbox="$(new_sandbox)"
  events="${sandbox}/events.log"
  run_deploy "${sandbox}" target-health true "${TARGET_IMAGE}" || command_status=$?
  [[ "${command_status}" -ne 0 ]] || status=1
  assert_event_matching "http-health:cesizen-web:${TARGET_IMAGE}" "${events}" || status=1
  assert_event_matching 'app-up:cesizen-rollback:' "${events}" || status=1
  assert_event_matching 'http-health:cesizen-web:cesizen-rollback:' "${events}" || status=1
  assert_event 'route-active:production' "${events}" || status=1
  assert_before "http-health:cesizen-web:${TARGET_IMAGE}" 'app-up:cesizen-rollback:' "${events}" || status=1
  assert_before 'http-health:cesizen-web:cesizen-rollback:' 'route-active:production' "${events}" || status=1
  assert_no_event_matching 'prune:' "${events}" || status=1
  report_case 'target health failure rolls back before restoring production' "${status}" "${sandbox}"
  rm -rf -- "${sandbox}"
}

test_failed_rollback_keeps_maintenance() {
  local sandbox command_status=0 status=0 events

  sandbox="$(new_sandbox)"
  events="${sandbox}/events.log"
  run_deploy "${sandbox}" target-and-rollback-health true "${TARGET_IMAGE}" || command_status=$?
  [[ "${command_status}" -ne 0 ]] || status=1
  assert_event 'route-active:maintenance' "${events}" || status=1
  assert_event_matching 'app-up:cesizen-rollback:' "${events}" || status=1
  assert_no_event_matching 'route-active:production' "${events}" || status=1
  assert_no_event_matching 'prune:' "${events}" || status=1
  report_case 'failed rollback leaves maintenance active' "${status}" "${sandbox}"
  rm -rf -- "${sandbox}"
}

test_first_deploy_failure_keeps_maintenance() {
  local sandbox command_status=0 status=0 events

  sandbox="$(new_sandbox)"
  events="${sandbox}/events.log"
  run_deploy "${sandbox}" migration false "${TARGET_IMAGE}" || command_status=$?
  [[ "${command_status}" -ne 0 ]] || status=1
  assert_event 'route-active:maintenance' "${events}" || status=1
  assert_no_event_matching 'route-active:production' "${events}" || status=1
  assert_no_event_matching 'app-up:cesizen-rollback:' "${events}" || status=1
  report_case 'first deployment failure has no unsafe production fallback' "${status}" "${sandbox}"
  rm -rf -- "${sandbox}"
}

test_first_deploy_health_failure_keeps_maintenance() {
  local sandbox command_status=0 status=0 events

  sandbox="$(new_sandbox)"
  events="${sandbox}/events.log"
  run_deploy "${sandbox}" target-health false "${TARGET_IMAGE}" || command_status=$?
  [[ "${command_status}" -ne 0 ]] || status=1
  assert_event 'migration' "${events}" || status=1
  assert_event "app-up:${TARGET_IMAGE}" "${events}" || status=1
  assert_event_matching "http-health:cesizen-web:${TARGET_IMAGE}" "${events}" || status=1
  assert_event 'route-active:maintenance' "${events}" || status=1
  assert_no_event_matching 'route-active:production' "${events}" || status=1
  assert_no_event_matching 'app-up:cesizen-rollback:' "${events}" || status=1
  assert_no_event_matching 'prune:' "${events}" || status=1
  report_case 'first deployment health failure keeps maintenance active' "${status}" "${sandbox}"
  rm -rf -- "${sandbox}"
}

test_production_route_failure_keeps_maintenance() {
  local sandbox command_status=0 status=0 events

  sandbox="$(new_sandbox)"
  events="${sandbox}/events.log"
  run_deploy "${sandbox}" production-route true "${TARGET_IMAGE}" || command_status=$?
  [[ "${command_status}" -ne 0 ]] || status=1
  assert_event_matching "http-health:cesizen-web:${TARGET_IMAGE}" "${events}" || status=1
  assert_event 'route-attempt:production' "${events}" || status=1
  assert_no_event_matching 'route-active:production' "${events}" || status=1
  assert_no_event_matching 'app-up:cesizen-rollback:' "${events}" || status=1
  assert_no_event_matching 'prune:' "${events}" || status=1
  report_case 'production route failure leaves the healthy target behind maintenance' "${status}" "${sandbox}"
  rm -rf -- "${sandbox}"
}

test_http_helper_requires_exact_200_and_is_bounded() {
  local sandbox status=0

  sandbox="$(new_sandbox)"
  : >"${sandbox}/events.log"
  : >"${sandbox}/stderr.log"

  if ! (
    # shellcheck source=../common.sh
    source "${DEPLOY_ROOT}/common.sh"

    TEST_HTTP_ATTEMPTS=0
    TEST_HTTP_SUCCEED_AT=2

    docker() {
      if [[ "$1" == exec ]]; then
        TEST_HTTP_ATTEMPTS=$((TEST_HTTP_ATTEMPTS + 1))
        printf '%s\n' "$*" >>"${sandbox}/events.log"
        ((TEST_HTTP_ATTEMPTS >= TEST_HTTP_SUCCEED_AT))
        return
      fi
      return 0
    }

    sleep() {
      return 0
    }

    log() {
      return 0
    }

    warn() {
      return 0
    }

    wait_for_application_http cesizen-web 5 2
    [[ "${TEST_HTTP_ATTEMPTS}" -eq 2 ]]

    TEST_HTTP_ATTEMPTS=0
    TEST_HTTP_SUCCEED_AT=99
    if wait_for_application_http cesizen-web 5 2; then
      exit 1
    fi
    [[ "${TEST_HTTP_ATTEMPTS}" -eq 3 ]]
  ) >"${sandbox}/stdout.log" 2>"${sandbox}/stderr.log"; then
    status=1
  fi

  assert_event_matching "/api/health" "${sandbox}/events.log" || status=1
  assert_event_matching "response.status === 200" "${sandbox}/events.log" || status=1
  assert_event_matching "AbortSignal.timeout(2000)" "${sandbox}/events.log" || status=1
  report_case 'HTTP polling requires exact 200 and stops at its attempt limit' "${status}" "${sandbox}"
  rm -rf -- "${sandbox}"
}

test_digest_argument_is_mandatory
test_tag_argument_is_rejected
test_success_order
test_migration_failure_restores_old_application
test_migration_failure_with_failed_rollback_keeps_maintenance
test_target_health_failure_rolls_back
test_failed_rollback_keeps_maintenance
test_first_deploy_failure_keeps_maintenance
test_first_deploy_health_failure_keeps_maintenance
test_production_route_failure_keeps_maintenance
test_http_helper_requires_exact_200_and_is_bounded

printf '%s passed, %s failed\n' "${PASS_COUNT}" "${FAIL_COUNT}"
[[ "${FAIL_COUNT}" -eq 0 ]]
