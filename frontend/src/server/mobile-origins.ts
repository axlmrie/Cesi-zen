const DEFAULT_APP_BASE_URL = "http://localhost:3000";
const DEFAULT_MOBILE_DEV_HOST = "172.20.10.2";

const nativeTrustedOrigins = ["appli://", "exp://"] as const;

type MobileOriginEnvironment = {
  BETTER_AUTH_URL?: string;
  MOBILE_ALLOWED_ORIGINS?: string;
  MOBILE_DEV_HOST?: string;
  NODE_ENV?: string;
};

function getTrimmedValueOrDefault(value: string | undefined, fallback: string) {
  const trimmedValue = value?.trim();
  return trimmedValue?.length ? trimmedValue : fallback;
}

function normalizeBrowserOrigin(value: string) {
  try {
    const url = new URL(value.trim());

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

function normalizeDevHost(value: string) {
  try {
    const url = new URL(`http://${value.trim()}`);

    if (
      !url.hostname ||
      url.username ||
      url.password ||
      url.port ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }

    return url.hostname;
  } catch {
    return null;
  }
}

export function buildMobileBrowserTrustedOrigins(
  environment: MobileOriginEnvironment = process.env,
) {
  const origins = new Set<string>();
  const addOrigin = (value: string) => {
    const origin = normalizeBrowserOrigin(value);
    if (origin) {
      origins.add(origin);
    }
  };

  const isDevelopment = environment.NODE_ENV !== "production";
  const configuredAppBaseURL = getTrimmedValueOrDefault(
    environment.BETTER_AUTH_URL,
    isDevelopment ? DEFAULT_APP_BASE_URL : "",
  );

  if (configuredAppBaseURL) {
    addOrigin(configuredAppBaseURL);
  }

  if (isDevelopment) {
    addOrigin("http://localhost:3000");
    addOrigin("http://localhost:8081");
  }

  const configuredDevHost = getTrimmedValueOrDefault(
    environment.MOBILE_DEV_HOST,
    isDevelopment ? DEFAULT_MOBILE_DEV_HOST : "",
  );
  const mobileDevHost = configuredDevHost
    ? normalizeDevHost(configuredDevHost)
    : null;

  if (mobileDevHost) {
    addOrigin(`http://${mobileDevHost}:3000`);
    addOrigin(`http://${mobileDevHost}:8081`);
  }

  for (const configuredOrigin of (
    environment.MOBILE_ALLOWED_ORIGINS ?? ""
  ).split(",")) {
    if (configuredOrigin.trim()) {
      addOrigin(configuredOrigin);
    }
  }

  return [...origins];
}

export const betterAuthBaseURL = getTrimmedValueOrDefault(
  process.env.BETTER_AUTH_URL,
  DEFAULT_APP_BASE_URL,
);

export const mobileBrowserTrustedOrigins = buildMobileBrowserTrustedOrigins();

export const betterAuthTrustedOrigins = [
  ...nativeTrustedOrigins,
  ...mobileBrowserTrustedOrigins,
];

const mobileBrowserTrustedOriginSet = new Set(mobileBrowserTrustedOrigins);

export function getAllowedMobileBrowserOrigin(origin: string | null) {
  if (!origin) {
    return null;
  }

  const normalizedOrigin = normalizeBrowserOrigin(origin);
  return normalizedOrigin && mobileBrowserTrustedOriginSet.has(normalizedOrigin)
    ? normalizedOrigin
    : null;
}

export function isMobileRequestOriginAllowed(origin: string | null) {
  return origin === null || getAllowedMobileBrowserOrigin(origin) !== null;
}
