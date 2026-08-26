import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import {
  createGlpiTicket,
  getGlpiCategoryId,
  getGlpiCategoryIds,
  getGlpiStatus,
  getGlpiTicket,
  getGlpiTickets,
  isGlpiConfigured,
} from "../../src/server/glpi/client";

const fetchMock = vi.fn<typeof fetch>();

const validEnvironment = {
  GLPI_API_URL: "http://glpi/apirest.php",
  GLPI_APP_TOKEN: "app-token-secret",
  GLPI_USER_TOKEN: "user-token-secret",
  GLPI_TIMEOUT_MS: "5000",
  GLPI_CATEGORY_ACCOUNT_ID: "101",
  GLPI_CATEGORY_TECHNICAL_ID: "102",
  GLPI_CATEGORY_USAGE_ID: "103",
  GLPI_CATEGORY_PRIVACY_ID: "104",
  GLPI_CATEGORY_OTHER_ID: "105",
} as const;

function stubValidEnvironment() {
  for (const [name, value] of Object.entries(validEnvironment)) {
    vi.stubEnv(name, value);
  }
}

function jsonResponse(body: unknown, status = 200): Response {
  return Response.json(body, { status });
}

function emptyResponse(status = 200): Response {
  return new Response(null, { status });
}

function requestAt(index: number) {
  const request = fetchMock.mock.calls[index];

  expect(request).toBeDefined();

  const [input, init] = request!;
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.toString()
        : input.url;

  return {
    url,
    init: init ?? {},
    headers: new Headers(init?.headers),
  };
}

function requestBodyAt(index: number): string {
  const body = requestAt(index).init.body;

  expect(typeof body).toBe("string");

  return typeof body === "string" ? body : "";
}

function queueSuccessfulCreation(ticketId = 42) {
  fetchMock
    .mockResolvedValueOnce(jsonResponse({ session_token: "session-test" }))
    .mockResolvedValueOnce(jsonResponse({ id: ticketId }, 201))
    .mockResolvedValueOnce(emptyResponse());
}

describe("GLPI status presentation", () => {
  it.each([
    [1, "Nouveau", "info", 10],
    [2, "En cours (attribué)", "info", 35],
    [3, "En cours (planifié)", "info", 50],
    [4, "En attente", "warning", 60],
    [5, "Résolu", "success", 90],
    [6, "Clos", "neutral", 100],
    [10, "En attente d’approbation", "warning", 20],
  ] as const)(
    "maps GLPI status %i to a stable presentation",
    (code, label, tone, progress) => {
      expect(getGlpiStatus(code)).toEqual({ label, tone, progress });
    },
  );

  it("uses a safe fallback for a future or unknown status", () => {
    expect(getGlpiStatus(999)).toEqual({
      label: "Statut inconnu",
      tone: "neutral",
      progress: 0,
    });
  });
});

describe("GLPI client", () => {
  beforeEach(() => {
    stubValidEnvironment();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  describe("configuration", () => {
    it("exposes only parsed, server-controlled category identifiers", () => {
      expect(isGlpiConfigured()).toBe(true);
      expect(getGlpiCategoryIds()).toEqual({
        account: 101,
        technical: 102,
        usage: 103,
        privacy: 104,
        other: 105,
      });
      expect(getGlpiCategoryId("privacy")).toBe(104);
    });

    it.each([
      ["GLPI_API_URL", "https://glpi.example.test/api.php"],
      ["GLPI_API_URL", "https://user:password@glpi.test/apirest.php"],
      ["GLPI_API_URL", "https://glpi.test/apirest.php?token=secret"],
      ["GLPI_APP_TOKEN", ""],
      ["GLPI_USER_TOKEN", ""],
      ["GLPI_TIMEOUT_MS", "0"],
      ["GLPI_TIMEOUT_MS", "60001"],
      ["GLPI_CATEGORY_TECHNICAL_ID", "not-a-number"],
      ["GLPI_CATEGORY_USAGE_ID", "0"],
      ["GLPI_CATEGORY_OTHER_ID", "101"],
    ])("rejects an unsafe or incomplete %s value", async (name, value) => {
      vi.stubEnv(name, value);

      expect(isGlpiConfigured()).toBe(false);
      await expect(
        createGlpiTicket({ subject: "Sujet", content: "Description" }),
      ).rejects.toMatchObject({ code: "CONFIGURATION" });
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("uses the default timeout when GLPI_TIMEOUT_MS is absent", async () => {
      vi.stubEnv("GLPI_TIMEOUT_MS", "");
      queueSuccessfulCreation();

      await expect(
        createGlpiTicket({ subject: "Aide", content: "Description" }),
      ).resolves.toEqual({ id: 42, status: 1 });
    });
  });

  describe("ticket creation", () => {
    it("authenticates, creates a request ticket and always closes the session", async () => {
      vi.stubEnv("GLPI_API_URL", "http://glpi/apirest.php/");
      queueSuccessfulCreation(73);

      await expect(
        createGlpiTicket({
          subject: "  Accès impossible  ",
          content: "  Je ne peux plus ouvrir mon compte.  ",
          categoryId: 101,
        }),
      ).resolves.toEqual({ id: 73, status: 1 });

      expect(fetchMock).toHaveBeenCalledTimes(3);

      const initialization = requestAt(0);
      expect(initialization.url).toBe("http://glpi/apirest.php/initSession");
      expect(initialization.init).toMatchObject({
        method: "GET",
        cache: "no-store",
        credentials: "omit",
        redirect: "error",
      });
      expect(initialization.init.signal).toBeInstanceOf(AbortSignal);
      expect(initialization.headers.get("authorization")).toBe(
        "user_token user-token-secret",
      );
      expect(initialization.headers.get("app-token")).toBe("app-token-secret");
      expect(initialization.headers.get("content-type")).toBe(
        "application/json",
      );

      const creation = requestAt(1);
      expect(creation.url).toBe("http://glpi/apirest.php/Ticket");
      expect(creation.init.method).toBe("POST");
      expect(creation.headers.get("session-token")).toBe("session-test");
      expect(creation.headers.get("app-token")).toBe("app-token-secret");
      expect(creation.headers.has("authorization")).toBe(false);
      expect(JSON.parse(requestBodyAt(1))).toEqual({
        input: {
          name: "Accès impossible",
          content: "Je ne peux plus ouvrir mon compte.",
          itilcategories_id: 101,
          type: 2,
          urgency: 3,
        },
      });

      const cleanup = requestAt(2);
      expect(cleanup.url).toBe("http://glpi/apirest.php/killSession");
      expect(cleanup.init.method).toBe("GET");
      expect(cleanup.headers.get("session-token")).toBe("session-test");

      for (const request of [initialization, creation, cleanup]) {
        expect(request.url).not.toContain("app-token-secret");
        expect(request.url).not.toContain("user-token-secret");
      }
    });

    it("omits itilcategories_id when no category is requested", async () => {
      queueSuccessfulCreation();

      await createGlpiTicket({ subject: "Question", content: "Description" });

      const body = JSON.parse(requestBodyAt(1)) as {
        input: Record<string, unknown>;
      };
      expect(body.input).not.toHaveProperty("itilcategories_id");
    });

    it.each([
      ["an empty subject", { subject: "   ", content: "Description" }],
      [
        "an oversized subject",
        { subject: "s".repeat(256), content: "Description" },
      ],
      ["an empty content", { subject: "Sujet", content: "\n\t" }],
      ["oversized content", { subject: "Sujet", content: "c".repeat(65_536) }],
      [
        "an arbitrary category",
        { subject: "Sujet", content: "Description", categoryId: 999 },
      ],
    ])("rejects %s before opening a GLPI session", async (_label, input) => {
      await expect(createGlpiTicket(input)).rejects.toMatchObject({
        code: "VALIDATION",
      });
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("keeps the operation error and still attempts to close the session", async () => {
      fetchMock
        .mockResolvedValueOnce(
          jsonResponse({ session_token: "session-operation-error" }),
        )
        .mockResolvedValueOnce(
          new Response("database.internal app-token-secret user-token-secret", {
            status: 500,
          }),
        )
        .mockResolvedValueOnce(emptyResponse());

      const error = await createGlpiTicket({
        subject: "Sujet",
        content: "Description",
      }).catch((caughtError: unknown) => caughtError);

      expect(error).toMatchObject({ code: "UNAVAILABLE" });
      expect(String(error)).not.toContain("database.internal");
      expect(String(error)).not.toContain("app-token-secret");
      expect(String(error)).not.toContain("user-token-secret");
      expect(fetchMock).toHaveBeenCalledTimes(3);
      expect(requestAt(2).url).toMatch(/\/killSession$/);
    });

    it("does not turn a successful creation into a failure when cleanup fails", async () => {
      fetchMock
        .mockResolvedValueOnce(jsonResponse({ session_token: "session-test" }))
        .mockResolvedValueOnce(jsonResponse({ id: 81 }, 201))
        .mockResolvedValueOnce(emptyResponse(503));

      await expect(
        createGlpiTicket({ subject: "Sujet", content: "Description" }),
      ).resolves.toEqual({ id: 81, status: 1 });
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it.each([
      [jsonResponse({ message: "missing id" }, 201), "INVALID_RESPONSE"],
      [new Response("{", { status: 201 }), "INVALID_RESPONSE"],
    ])("rejects a malformed successful response", async (response, code) => {
      fetchMock
        .mockResolvedValueOnce(jsonResponse({ session_token: "session-test" }))
        .mockResolvedValueOnce(response)
        .mockResolvedValueOnce(emptyResponse());

      await expect(
        createGlpiTicket({ subject: "Sujet", content: "Description" }),
      ).rejects.toMatchObject({ code });
      expect(requestAt(2).url).toMatch(/\/killSession$/);
    });

    it("does not attempt cleanup when session initialization fails", async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ session_token: "" }));

      await expect(
        createGlpiTicket({ subject: "Sujet", content: "Description" }),
      ).rejects.toMatchObject({ code: "INVALID_RESPONSE" });
      expect(fetchMock).toHaveBeenCalledOnce();
    });
  });

  describe("ticket reads", () => {
    it("reads one explicitly supplied ticket identifier", async () => {
      fetchMock
        .mockResolvedValueOnce(jsonResponse({ session_token: "read-session" }))
        .mockResolvedValueOnce(
          jsonResponse({
            id: 42,
            status: 10,
            date_mod: "2026-08-26 12:45:00",
            content: "Field deliberately not exposed",
          }),
        )
        .mockResolvedValueOnce(emptyResponse());

      await expect(getGlpiTicket(42)).resolves.toEqual({
        id: 42,
        status: 10,
        dateModified: "2026-08-26 12:45:00",
      });

      expect(requestAt(1).url).toBe(
        "http://glpi/apirest.php/Ticket/42?expand_dropdowns=false",
      );
      expect(requestAt(1).init.method).toBe("GET");
      expect(requestAt(1).headers.get("session-token")).toBe("read-session");
    });

    it.each([
      [{ id: 41, status: 2 }, "a mismatched identifier"],
      [{ id: 42, status: "2" }, "a non-numeric status"],
      [{ id: 42, status: 2, date_mod: 123 }, "an invalid update date"],
    ])("rejects $1 in a ticket response", async (ticket, _label) => {
      fetchMock
        .mockResolvedValueOnce(jsonResponse({ session_token: "read-session" }))
        .mockResolvedValueOnce(jsonResponse(ticket))
        .mockResolvedValueOnce(emptyResponse());

      await expect(getGlpiTicket(42)).rejects.toMatchObject({
        code: "INVALID_RESPONSE",
      });
      expect(requestAt(2).url).toMatch(/\/killSession$/);
    });

    it("returns a safe not-found error and closes the session", async () => {
      fetchMock
        .mockResolvedValueOnce(jsonResponse({ session_token: "read-session" }))
        .mockResolvedValueOnce(
          new Response("private upstream details", { status: 404 }),
        )
        .mockResolvedValueOnce(emptyResponse());

      const error = await getGlpiTicket(42).catch(
        (caughtError: unknown) => caughtError,
      );

      expect(error).toMatchObject({ code: "NOT_FOUND" });
      expect(String(error)).not.toContain("private upstream details");
      expect(requestAt(2).url).toMatch(/\/killSession$/);
    });

    it("retrieves deduplicated owned IDs with one shared session", async () => {
      fetchMock
        .mockResolvedValueOnce(jsonResponse({ session_token: "batch-session" }))
        .mockResolvedValueOnce(jsonResponse({ id: 12, status: 2 }))
        .mockResolvedValueOnce(
          jsonResponse({ id: 7, status: 6, date_mod: "2026-08-26 13:00:00" }),
        )
        .mockResolvedValueOnce(emptyResponse());

      const tickets = await getGlpiTickets([12, 7, 12]);

      expect(tickets).toEqual(
        new Map([
          [12, { id: 12, status: 2 }],
          [
            7,
            {
              id: 7,
              status: 6,
              dateModified: "2026-08-26 13:00:00",
            },
          ],
        ]),
      );
      expect(fetchMock).toHaveBeenCalledTimes(4);
      expect(requestAt(1).headers.get("session-token")).toBe("batch-session");
      expect(requestAt(2).headers.get("session-token")).toBe("batch-session");
      expect(requestAt(3).url).toMatch(/\/killSession$/);
    });

    it("returns an empty map without requiring configuration or network", async () => {
      vi.stubEnv("GLPI_API_URL", "");

      await expect(getGlpiTickets([])).resolves.toEqual(new Map());
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])(
      "rejects invalid ticket identifier %s before network access",
      async (ticketId) => {
        await expect(getGlpiTicket(ticketId)).rejects.toMatchObject({
          code: "VALIDATION",
        });
        expect(fetchMock).not.toHaveBeenCalled();
      },
    );
  });

  describe("transport failures", () => {
    it("converts network failures to an error that cannot leak configuration", async () => {
      fetchMock.mockRejectedValueOnce(
        new Error(
          "http://glpi/apirest.php app-token-secret user-token-secret refused",
        ),
      );

      const error = await createGlpiTicket({
        subject: "Sujet",
        content: "Description",
      }).catch((caughtError: unknown) => caughtError);

      expect(error).toMatchObject({ code: "UNAVAILABLE" });
      expect(String(error)).not.toContain("http://glpi");
      expect(String(error)).not.toContain("app-token-secret");
      expect(String(error)).not.toContain("user-token-secret");
      expect(fetchMock).toHaveBeenCalledOnce();
    });

    it("aborts a timed-out operation, reports it safely and closes the session", async () => {
      vi.useFakeTimers();
      vi.stubEnv("GLPI_TIMEOUT_MS", "25");
      fetchMock
        .mockResolvedValueOnce(jsonResponse({ session_token: "slow-session" }))
        .mockImplementationOnce(
          (_input, init) =>
            new Promise<Response>((_resolve, reject) => {
              init?.signal?.addEventListener(
                "abort",
                () => reject(new DOMException("aborted", "AbortError")),
                { once: true },
              );
            }),
        )
        .mockResolvedValueOnce(emptyResponse());

      const creation = createGlpiTicket({
        subject: "Sujet",
        content: "Description",
      });
      const rejection = expect(creation).rejects.toMatchObject({
        code: "TIMEOUT",
      });

      await vi.advanceTimersByTimeAsync(25);
      await rejection;

      expect(fetchMock).toHaveBeenCalledTimes(3);
      expect(requestAt(1).init.signal).toMatchObject({ aborted: true });
      expect(requestAt(2).url).toMatch(/\/killSession$/);
    });
  });
});
