import "server-only";

import {
  GlpiClientError,
  glpiCategoryEnvironmentVariables,
  type CreateGlpiTicketInput,
  type GlpiCategoryIds,
  type GlpiCategoryKey,
  type GlpiTicket,
} from "./types";

const DEFAULT_TIMEOUT_MS = 10_000;
const MAX_TIMEOUT_MS = 60_000;
const MAX_SUBJECT_LENGTH = 255;
const MAX_CONTENT_LENGTH = 65_535;
const DEFAULT_REQUEST_URGENCY = 3;
const REQUEST_TICKET_TYPE = 2;
const NEW_TICKET_STATUS = 1;

type GlpiConfiguration = Readonly<{
  apiUrl: string;
  appToken: string;
  userToken: string;
  timeoutMs: number;
  categoryIds: GlpiCategoryIds;
}>;

type JsonObject = Record<string, unknown>;

function configurationError(): GlpiClientError {
  return new GlpiClientError(
    "CONFIGURATION",
    "Le service de support n'est pas configuré correctement.",
  );
}

function readRequiredSecret(value: string | undefined): string {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    throw configurationError();
  }

  return normalizedValue;
}

function readApiUrl(value: string | undefined): string {
  const normalizedValue = value?.trim().replace(/\/+$/, "");

  if (!normalizedValue) {
    throw configurationError();
  }

  try {
    const url = new URL(normalizedValue);
    const isHttp = url.protocol === "http:" || url.protocol === "https:";

    if (
      !isHttp ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      !url.pathname.endsWith("/apirest.php")
    ) {
      throw configurationError();
    }

    return url.toString().replace(/\/$/, "");
  } catch (error) {
    if (error instanceof GlpiClientError) {
      throw error;
    }

    throw configurationError();
  }
}

function readTimeout(value: string | undefined): number {
  if (value === undefined || value.trim() === "") {
    return DEFAULT_TIMEOUT_MS;
  }

  const timeoutMs = Number(value);

  if (
    !Number.isSafeInteger(timeoutMs) ||
    timeoutMs <= 0 ||
    timeoutMs > MAX_TIMEOUT_MS
  ) {
    throw configurationError();
  }

  return timeoutMs;
}

function readPositiveInteger(value: string | undefined): number {
  const normalizedValue = value?.trim();

  if (!normalizedValue || !/^\d+$/.test(normalizedValue)) {
    throw configurationError();
  }

  const parsedValue = Number(normalizedValue);

  if (!Number.isSafeInteger(parsedValue) || parsedValue <= 0) {
    throw configurationError();
  }

  return parsedValue;
}

function readCategoryIds(): GlpiCategoryIds {
  const categoryIds = Object.fromEntries(
    Object.entries(glpiCategoryEnvironmentVariables).map(
      ([categoryKey, environmentVariable]) => [
        categoryKey,
        readPositiveInteger(process.env[environmentVariable]),
      ],
    ),
  ) as Record<GlpiCategoryKey, number>;

  if (
    new Set(Object.values(categoryIds)).size !== Object.keys(categoryIds).length
  ) {
    throw configurationError();
  }

  return categoryIds;
}

function readConfiguration(): GlpiConfiguration {
  return {
    apiUrl: readApiUrl(process.env.GLPI_API_URL),
    appToken: readRequiredSecret(process.env.GLPI_APP_TOKEN),
    userToken: readRequiredSecret(process.env.GLPI_USER_TOKEN),
    timeoutMs: readTimeout(process.env.GLPI_TIMEOUT_MS),
    categoryIds: readCategoryIds(),
  };
}

export function isGlpiConfigured(): boolean {
  try {
    readConfiguration();
    return true;
  } catch {
    return false;
  }
}

export function getGlpiCategoryIds(): GlpiCategoryIds {
  return readCategoryIds();
}

export function getGlpiCategoryId(category: GlpiCategoryKey): number {
  return readCategoryIds()[category];
}

function buildUrl(configuration: GlpiConfiguration, path: string): string {
  return `${configuration.apiUrl}/${path}`;
}

function createHttpError(status: number): GlpiClientError {
  if (status === 401 || status === 403) {
    return new GlpiClientError(
      "AUTHENTICATION",
      "Le service de support refuse l'authentification.",
    );
  }

  if (status === 404) {
    return new GlpiClientError(
      "NOT_FOUND",
      "Le ticket demandé est introuvable.",
    );
  }

  return new GlpiClientError(
    "UNAVAILABLE",
    "Le service de support est temporairement indisponible.",
  );
}

async function sendRequest(
  configuration: GlpiConfiguration,
  path: string,
  init: RequestInit,
): Promise<Response> {
  const abortController = new AbortController();
  let didTimeout = false;
  const timeout = setTimeout(() => {
    didTimeout = true;
    abortController.abort();
  }, configuration.timeoutMs);

  let response: Response;

  try {
    response = await fetch(buildUrl(configuration, path), {
      ...init,
      cache: "no-store",
      credentials: "omit",
      redirect: "error",
      signal: abortController.signal,
    });
  } catch {
    if (didTimeout) {
      throw new GlpiClientError(
        "TIMEOUT",
        "Le service de support ne répond pas dans le délai imparti.",
      );
    }

    throw new GlpiClientError(
      "UNAVAILABLE",
      "Le service de support est temporairement indisponible.",
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw createHttpError(response.status);
  }

  return response;
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new GlpiClientError(
      "INVALID_RESPONSE",
      "Le service de support a renvoyé une réponse invalide.",
    );
  }
}

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readSessionToken(value: unknown): string {
  if (!isJsonObject(value)) {
    throw new GlpiClientError(
      "INVALID_RESPONSE",
      "Le service de support a renvoyé une réponse invalide.",
    );
  }

  const sessionToken = value.session_token;

  if (typeof sessionToken !== "string" || !sessionToken.trim()) {
    throw new GlpiClientError(
      "INVALID_RESPONSE",
      "Le service de support a renvoyé une réponse invalide.",
    );
  }

  return sessionToken.trim();
}

function sessionHeaders(
  configuration: GlpiConfiguration,
  sessionToken: string,
): Record<string, string> {
  return {
    Accept: "application/json",
    "App-Token": configuration.appToken,
    "Content-Type": "application/json",
    "Session-Token": sessionToken,
  };
}

async function initializeSession(
  configuration: GlpiConfiguration,
): Promise<string> {
  const response = await sendRequest(configuration, "initSession", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "App-Token": configuration.appToken,
      Authorization: `user_token ${configuration.userToken}`,
      "Content-Type": "application/json",
    },
  });

  return readSessionToken(await readJson(response));
}

async function killSession(
  configuration: GlpiConfiguration,
  sessionToken: string,
): Promise<void> {
  await sendRequest(configuration, "killSession", {
    method: "GET",
    headers: sessionHeaders(configuration, sessionToken),
  });
}

async function withGlpiSession<T>(
  configuration: GlpiConfiguration,
  operation: (sessionToken: string) => Promise<T>,
): Promise<T> {
  const sessionToken = await initializeSession(configuration);

  try {
    return await operation(sessionToken);
  } finally {
    try {
      await killSession(configuration, sessionToken);
    } catch {
      // A cleanup failure must not hide the operation result or encourage a
      // caller to create the same remote ticket a second time.
    }
  }
}

function readRequiredText(
  value: string,
  label: string,
  maximumLength: number,
): string {
  const normalizedValue = value.trim();

  if (!normalizedValue || normalizedValue.length > maximumLength) {
    throw new GlpiClientError("VALIDATION", `${label} du ticket est invalide.`);
  }

  return normalizedValue;
}

function assertAllowedCategory(
  categoryId: number | undefined,
  categoryIds: GlpiCategoryIds,
): void {
  if (categoryId === undefined) {
    return;
  }

  if (
    !Number.isSafeInteger(categoryId) ||
    !Object.values(categoryIds).includes(categoryId)
  ) {
    throw new GlpiClientError(
      "VALIDATION",
      "La catégorie du ticket est invalide.",
    );
  }
}

function readCreatedTicketId(value: unknown): number {
  if (!isJsonObject(value)) {
    throw new GlpiClientError(
      "INVALID_RESPONSE",
      "Le service de support a renvoyé une réponse invalide.",
    );
  }

  const ticketId = value.id;

  if (
    typeof ticketId !== "number" ||
    !Number.isSafeInteger(ticketId) ||
    ticketId <= 0
  ) {
    throw new GlpiClientError(
      "INVALID_RESPONSE",
      "Le service de support a renvoyé une réponse invalide.",
    );
  }

  return ticketId;
}

function readTicket(value: unknown, expectedId: number): GlpiTicket {
  if (!isJsonObject(value)) {
    throw new GlpiClientError(
      "INVALID_RESPONSE",
      "Le service de support a renvoyé une réponse invalide.",
    );
  }

  const ticketId = value.id;
  const status = value.status;

  if (
    typeof ticketId !== "number" ||
    !Number.isSafeInteger(ticketId) ||
    ticketId !== expectedId ||
    typeof status !== "number" ||
    !Number.isSafeInteger(status) ||
    status <= 0
  ) {
    throw new GlpiClientError(
      "INVALID_RESPONSE",
      "Le service de support a renvoyé une réponse invalide.",
    );
  }

  const dateModified = value.date_mod;

  if (dateModified !== undefined && typeof dateModified !== "string") {
    throw new GlpiClientError(
      "INVALID_RESPONSE",
      "Le service de support a renvoyé une réponse invalide.",
    );
  }

  return {
    id: ticketId,
    status,
    ...(dateModified ? { dateModified } : {}),
  };
}

function assertTicketId(ticketId: number): void {
  if (!Number.isSafeInteger(ticketId) || ticketId <= 0) {
    throw new GlpiClientError(
      "VALIDATION",
      "L'identifiant du ticket est invalide.",
    );
  }
}

async function fetchTicket(
  configuration: GlpiConfiguration,
  sessionToken: string,
  ticketId: number,
): Promise<GlpiTicket> {
  const response = await sendRequest(
    configuration,
    `Ticket/${ticketId}?expand_dropdowns=false`,
    {
      method: "GET",
      headers: sessionHeaders(configuration, sessionToken),
    },
  );

  return readTicket(await readJson(response), ticketId);
}

export async function createGlpiTicket(
  input: CreateGlpiTicketInput,
): Promise<GlpiTicket> {
  const configuration = readConfiguration();
  const subject = readRequiredText(
    input.subject,
    "Le sujet",
    MAX_SUBJECT_LENGTH,
  );
  const content = readRequiredText(
    input.content,
    "Le contenu",
    MAX_CONTENT_LENGTH,
  );
  assertAllowedCategory(input.categoryId, configuration.categoryIds);

  return withGlpiSession(configuration, async (sessionToken) => {
    const ticketInput: JsonObject = {
      name: subject,
      content,
      type: REQUEST_TICKET_TYPE,
      urgency: DEFAULT_REQUEST_URGENCY,
    };

    if (input.categoryId !== undefined) {
      ticketInput.itilcategories_id = input.categoryId;
    }

    const response = await sendRequest(configuration, "Ticket", {
      method: "POST",
      headers: sessionHeaders(configuration, sessionToken),
      body: JSON.stringify({ input: ticketInput }),
    });
    const ticketId = readCreatedTicketId(await readJson(response));

    return {
      id: ticketId,
      status: NEW_TICKET_STATUS,
    };
  });
}

export async function getGlpiTicket(ticketId: number): Promise<GlpiTicket> {
  assertTicketId(ticketId);
  const configuration = readConfiguration();

  return withGlpiSession(configuration, (sessionToken) =>
    fetchTicket(configuration, sessionToken, ticketId),
  );
}

export async function getGlpiTickets(
  ticketIds: number[],
): Promise<Map<number, GlpiTicket>> {
  const uniqueTicketIds = [...new Set(ticketIds)];

  for (const ticketId of uniqueTicketIds) {
    assertTicketId(ticketId);
  }

  if (uniqueTicketIds.length === 0) {
    return new Map();
  }

  const configuration = readConfiguration();

  return withGlpiSession(configuration, async (sessionToken) => {
    const tickets: GlpiTicket[] = [];

    for (const ticketId of uniqueTicketIds) {
      tickets.push(await fetchTicket(configuration, sessionToken, ticketId));
    }

    return new Map(tickets.map((ticket) => [ticket.id, ticket]));
  });
}

export { getGlpiStatus } from "./domain";
export {
  GlpiClientError,
  type CreateGlpiTicketInput,
  type GlpiCategoryIds,
  type GlpiCategoryKey,
  type GlpiClientErrorCode,
  type GlpiStatusPresentation,
  type GlpiStatusTone,
  type GlpiTicket,
} from "./types";
