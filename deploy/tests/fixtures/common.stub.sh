#!/usr/bin/env bash

# Test double sourced by a temporary copy of deploy.sh. It deliberately exposes
# only the operational surface used by the deployment state machine.

TEST_FAIL_STAGE="${TEST_FAIL_STAGE:-none}"
TEST_PREVIOUS_PRESENT="${TEST_PREVIOUS_PRESENT:-true}"
DEPLOY_HEALTH_TIMEOUT=1
DEPLOY_HEALTH_INTERVAL=1
INFRA_HEALTH_TIMEOUT=1

record_event() {
  printf '%s\n' "$1" >>"${TEST_EVENTS_FILE:?}"
}

log() {
  record_event "log:$*"
}

warn() {
  record_event "warn:$*"
}

die() {
  record_event "die:$*"
  exit 1
}

initialize_deploy_context() {
  : "${CESIZEN_IMAGE:?CESIZEN_IMAGE must be set by deploy.sh}"
  printf '%s\n' 'sha256:old-image' >"${TEST_STATE_FILE:?}"
  record_event 'initialize'
}

start_maintenance_infrastructure() {
  record_event 'maintenance-infrastructure'
}

activate_route() {
  local route_name="$1"

  record_event "route-attempt:${route_name}"
  if [[ "${route_name}" == production && "${TEST_FAIL_STAGE}" == production-route ]]; then
    return 1
  fi

  record_event "route-active:${route_name}"
}

container_is_healthy() {
  record_event "existing-health:$1"
  [[ "${TEST_FAIL_STAGE}" != existing-health && \
    "${TEST_FAIL_STAGE}" != migration-and-existing-health ]]
}

wait_for_container_health() {
  local container_name="$1"
  local current_image

  current_image="$(<"${TEST_STATE_FILE}")"
  record_event "health:${container_name}:${current_image}"

  if [[ "${container_name}" == cesizen-web ]]; then
    if [[ "${current_image}" == cesizen-rollback:* ]]; then
      [[ "${TEST_FAIL_STAGE}" != rollback-health && \
        "${TEST_FAIL_STAGE}" != target-and-rollback-health ]]
      return
    fi

    [[ "${TEST_FAIL_STAGE}" != target-health && \
      "${TEST_FAIL_STAGE}" != target-and-rollback-health ]]
  fi
}

wait_for_application_http() {
  local container_name="$1"
  local current_image

  current_image="$(<"${TEST_STATE_FILE}")"
  record_event "http-health:${container_name}:${current_image}"

  if [[ "${current_image}" == cesizen-rollback:* ]]; then
    [[ "${TEST_FAIL_STAGE}" != rollback-health && \
      "${TEST_FAIL_STAGE}" != target-and-rollback-health && \
      "${TEST_FAIL_STAGE}" != migration-and-rollback-health ]]
    return
  fi

  [[ "${TEST_FAIL_STAGE}" != target-health && \
    "${TEST_FAIL_STAGE}" != target-and-rollback-health ]]
}

handle_compose() {
  local arguments=" $* "

  record_event "compose:$*"

  if [[ "${arguments}" == *' pull '* && "${arguments}" == *' cesizen-web '* ]]; then
    record_event "pull:${CESIZEN_IMAGE:?}"
    [[ "${TEST_FAIL_STAGE}" != pull ]]
    return
  fi

  if [[ "${arguments}" == *' run '* && \
    "${arguments}" == *' prisma migrate deploy '* ]]; then
    record_event 'migration'
    record_event "migration-image:${CESIZEN_IMAGE:-unset}"
    [[ "${TEST_FAIL_STAGE}" != migration && \
      "${TEST_FAIL_STAGE}" != migration-and-rollback-health ]]
    return
  fi

  if [[ "${arguments}" == *' up '* && "${arguments}" == *' cesizen-web '* ]]; then
    printf '%s\n' "${CESIZEN_IMAGE:?}" >"${TEST_STATE_FILE}"
    record_event "app-up:${CESIZEN_IMAGE}"
    [[ "${TEST_FAIL_STAGE}" != compose-up ]]
  fi
}

compose() {
  handle_compose "$@"
}

docker() {
  local arguments=" $* "

  case "${arguments}" in
    *' container inspect cesizen-web '*)
      [[ "${TEST_PREVIOUS_PRESENT}" == true ]]
      ;;
    *" inspect --format {{.Image}} cesizen-web "*)
      printf '%s\n' 'sha256:old-image'
      ;;
    *' image tag '*)
      record_event "rollback-tag:${*: -1}"
      ;;
    *' image rm '*)
      record_event "image-rm:${*: -1}"
      ;;
    *' pull '*)
      record_event "pull:${*: -1}"
      [[ "${TEST_FAIL_STAGE}" != pull ]]
      ;;
    *' compose '*)
      handle_compose "${@:2}"
      ;;
    *' system prune '*)
      record_event "prune:$*"
      ;;
    *' image prune '*)
      record_event "prune:$*"
      ;;
    *)
      record_event "docker:$*"
      ;;
  esac
}

curl() {
  record_event "http-health:$*"
  [[ "${TEST_FAIL_STAGE}" != target-health && \
    "${TEST_FAIL_STAGE}" != target-and-rollback-health ]]
}
