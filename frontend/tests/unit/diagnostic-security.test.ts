import { describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

import { determineStressLevel } from "../../src/lib/cesizen";
import {
  getUniqueDiagnosticEventIds,
  mobileFallbackDiagnosticItems,
  resolveDiagnostic,
  webFallbackDiagnosticItems,
} from "../../src/lib/diagnostic";

const mocks = vi.hoisted(() => ({
  getWebSession: vi.fn(),
  getMobileSession: vi.fn(),
  headers: vi.fn(async () => new Headers()),
  findUser: vi.fn(),
  findActiveEvents: vi.fn(),
  findResultPages: vi.fn(),
  createResult: vi.fn(),
}));

vi.mock("@/server/better-auth/config", () => ({
  auth: { api: { getSession: mocks.getWebSession } },
}));

vi.mock("next/headers", () => ({ headers: mocks.headers }));

vi.mock("@/server/db", () => ({
  db: {
    user: { findUnique: mocks.findUser },
    evenementStress: { findMany: mocks.findActiveEvents },
    pageInfo: { findMany: mocks.findResultPages },
    resultatDiagnostic: { create: mocks.createResult },
  },
}));

vi.mock("@/app/api/mobile/_utils", () => ({
  getMobileSession: mocks.getMobileSession,
  jsonResponse: (_request: NextRequest, body: unknown, init?: ResponseInit) =>
    Response.json(body, init),
  optionsResponse: () => new Response(null, { status: 204 }),
  unauthorizedResponse: () =>
    Response.json(
      { error: "Vous devez etre connecte pour acceder a cette ressource." },
      { status: 401 },
    ),
}));

import {
  GET as getMobileDiagnostic,
  POST as saveMobileDiagnostic,
} from "../../src/app/api/mobile/diagnostic/route";
import { saveDiagnosticScore } from "../../src/app/diagnostic/actions";

function mobileRequest(body: unknown) {
  return new Request("http://localhost/api/mobile/diagnostic", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }) as NextRequest;
}

function rawMobileRequest(body?: string) {
  return new Request("http://localhost/api/mobile/diagnostic", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  }) as NextRequest;
}

function expectCoherentPersistence(
  userId: string,
  scoreTotal: number,
  eventIds: string[],
) {
  expect(mocks.createResult).toHaveBeenCalledOnce();
  expect(mocks.createResult).toHaveBeenCalledWith(
    expect.objectContaining({
      data: {
        scoreTotal,
        niveauStress: determineStressLevel(scoreTotal),
        utilisateurId: userId,
        reponses:
          eventIds.length > 0
            ? {
                create: eventIds.map((eventId) => ({
                  evenementId: eventId,
                })),
              }
            : undefined,
      },
    }),
  );
}

describe("diagnostic score integrity", () => {
  it("always resolves an empty selection to zero regardless of the client score", () => {
    expect(
      resolveDiagnostic(
        [],
        [{ id: "server-event", points: 100 }],
        webFallbackDiagnosticItems,
      ),
    ).toEqual({
      scoreTotal: 0,
      niveauStress: determineStressLevel(0),
      responseEventIds: [],
      fallbackEventIds: [],
    });
  });

  it("keeps the historical web and mobile fallback-12 mappings distinct", () => {
    expect(
      resolveDiagnostic(
        ["fallback-12", "fallback-999"],
        [],
        webFallbackDiagnosticItems,
      ),
    ).toEqual({
      scoreTotal: 38,
      niveauStress: determineStressLevel(38),
      responseEventIds: [],
      fallbackEventIds: ["fallback-12"],
    });

    expect(
      resolveDiagnostic(
        ["fallback-12", "fallback-999"],
        [],
        mobileFallbackDiagnosticItems,
      ),
    ).toEqual({
      scoreTotal: 20,
      niveauStress: determineStressLevel(20),
      responseEventIds: [],
      fallbackEventIds: ["fallback-12"],
    });

    expect(webFallbackDiagnosticItems).toHaveLength(15);
    expect(mobileFallbackDiagnosticItems).toHaveLength(12);
  });

  it("deduplicates identifiers and derives score, level and responses from active events", () => {
    expect(
      getUniqueDiagnosticEventIds(["event-a", "event-a", " event-b ", "", 42]),
    ).toEqual(["event-a", "event-b"]);

    expect(
      resolveDiagnostic(
        ["event-a", "event-a", "event-b", "inactive-event"],
        [
          { id: "event-a", points: 100 },
          { id: "event-a", points: 100 },
          { id: "event-b", points: 75 },
        ],
        webFallbackDiagnosticItems,
      ),
    ).toEqual({
      scoreTotal: 175,
      niveauStress: determineStressLevel(175),
      responseEventIds: ["event-a", "event-b"],
      fallbackEventIds: [],
    });
  });

  it("ignores unknown, inactive and malformed identifiers", () => {
    expect(
      resolveDiagnostic(
        ["unknown", "inactive"],
        [],
        webFallbackDiagnosticItems,
      ),
    ).toEqual({
      scoreTotal: 0,
      niveauStress: determineStressLevel(0),
      responseEventIds: [],
      fallbackEventIds: [],
    });

    expect(resolveDiagnostic([42], [], webFallbackDiagnosticItems)).toEqual({
      scoreTotal: 0,
      niveauStress: determineStressLevel(0),
      responseEventIds: [],
      fallbackEventIds: [],
    });
  });
});

describe("web diagnostic action", () => {
  it("rejects a missing session before reading or writing diagnostic data", async () => {
    mocks.getWebSession.mockResolvedValue(null);

    await expect(saveDiagnosticScore(100, [])).rejects.toThrow(/connect/i);

    expect(mocks.findUser).not.toHaveBeenCalled();
    expect(mocks.findActiveEvents).not.toHaveBeenCalled();
    expect(mocks.createResult).not.toHaveBeenCalled();
  });

  it("rejects an inactive account before reading or writing diagnostic data", async () => {
    mocks.getWebSession.mockResolvedValue({ user: { id: "inactive-user" } });
    mocks.findUser.mockResolvedValue({ isActif: false });

    await expect(saveDiagnosticScore(100, [])).rejects.toThrow(/desactive/i);

    expect(mocks.findActiveEvents).not.toHaveBeenCalled();
    expect(mocks.createResult).not.toHaveBeenCalled();
  });

  it("persists one coherent result calculated from unique active events", async () => {
    mocks.getWebSession.mockResolvedValue({ user: { id: "web-user" } });
    mocks.findUser.mockResolvedValue({ isActif: true });
    mocks.findActiveEvents.mockResolvedValue([
      { id: "event-a", points: 100 },
      { id: "event-b", points: 75 },
    ]);
    mocks.createResult.mockResolvedValue({ id: "result-web" });

    await expect(
      saveDiagnosticScore(9999, [
        "event-a",
        "event-a",
        "inactive-event",
        "event-b",
      ]),
    ).resolves.toEqual({ success: true });

    expect(mocks.findActiveEvents).toHaveBeenCalledWith({
      where: {
        id: { in: ["event-a", "inactive-event", "event-b"] },
        isActif: true,
      },
      select: { id: true, points: true },
    });
    expectCoherentPersistence("web-user", 175, ["event-a", "event-b"]);
  });

  it("does not restore the client score when selected identifiers match no active event", async () => {
    mocks.getWebSession.mockResolvedValue({ user: { id: "web-user" } });
    mocks.findUser.mockResolvedValue({ isActif: true });
    mocks.findActiveEvents.mockResolvedValue([]);
    mocks.createResult.mockResolvedValue({ id: "result-web" });

    await expect(
      saveDiagnosticScore(9999, ["unknown", "inactive-event"]),
    ).resolves.toEqual({ success: true });

    expectCoherentPersistence("web-user", 0, []);
  });

  it("ignores a forged client score when the event list is empty", async () => {
    mocks.getWebSession.mockResolvedValue({ user: { id: "web-user" } });
    mocks.findUser.mockResolvedValue({ isActif: true });
    mocks.createResult.mockResolvedValue({ id: "result-web" });

    await expect(saveDiagnosticScore(9999, [])).resolves.toEqual({
      success: true,
    });

    expect(mocks.findActiveEvents).not.toHaveBeenCalled();
    expectCoherentPersistence("web-user", 0, []);
  });

  it("uses the historical web fallback-12 finance value", async () => {
    mocks.getWebSession.mockResolvedValue({ user: { id: "web-user" } });
    mocks.findUser.mockResolvedValue({ isActif: true });
    mocks.createResult.mockResolvedValue({ id: "result-web" });

    await expect(
      saveDiagnosticScore(9999, ["fallback-12", "fallback-999"]),
    ).resolves.toEqual({ success: true });

    expect(mocks.findActiveEvents).not.toHaveBeenCalled();
    expectCoherentPersistence("web-user", 38, []);
  });
});

describe("mobile diagnostic route", () => {
  it("serves the same trusted fallback catalogue used for score calculation", async () => {
    mocks.findActiveEvents.mockResolvedValue([]);
    mocks.findResultPages.mockResolvedValue([]);

    const response = await getMobileDiagnostic(
      new Request("http://localhost/api/mobile/diagnostic") as NextRequest,
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      items: mobileFallbackDiagnosticItems,
    });
    expect(mobileFallbackDiagnosticItems[11]).toEqual({
      id: "fallback-12",
      label: "Déménagement",
      points: 20,
    });
  });

  it("returns 401 for a missing session without touching diagnostic data", async () => {
    mocks.getMobileSession.mockResolvedValue(null);

    const response = await saveMobileDiagnostic(
      mobileRequest({ score: 100, selectedEventIds: [] }),
    );

    expect(response.status).toBe(401);
    expect(mocks.findActiveEvents).not.toHaveBeenCalled();
    expect(mocks.createResult).not.toHaveBeenCalled();
  });

  it("returns 400 for an absent body without writing", async () => {
    mocks.getMobileSession.mockResolvedValue({ user: { id: "mobile-user" } });

    const response = await saveMobileDiagnostic(rawMobileRequest());

    expect(response.status).toBe(400);
    expect(mocks.findActiveEvents).not.toHaveBeenCalled();
    expect(mocks.createResult).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid JSON without writing", async () => {
    mocks.getMobileSession.mockResolvedValue({ user: { id: "mobile-user" } });

    const response = await saveMobileDiagnostic(rawMobileRequest("{"));

    expect(response.status).toBe(400);
    expect(mocks.findActiveEvents).not.toHaveBeenCalled();
    expect(mocks.createResult).not.toHaveBeenCalled();
  });

  it("returns 400 for a non-array selectedEventIds field without writing", async () => {
    mocks.getMobileSession.mockResolvedValue({ user: { id: "mobile-user" } });

    const response = await saveMobileDiagnostic(
      mobileRequest({ score: 9999, selectedEventIds: "fallback-1" }),
    );

    expect(response.status).toBe(400);
    expect(mocks.findActiveEvents).not.toHaveBeenCalled();
    expect(mocks.createResult).not.toHaveBeenCalled();
  });

  it("ignores a forged score and persists a coherent active-event result", async () => {
    mocks.getMobileSession.mockResolvedValue({ user: { id: "mobile-user" } });
    mocks.findActiveEvents.mockResolvedValue([
      { id: "event-a", points: 100 },
      { id: "event-b", points: 75 },
    ]);
    mocks.createResult.mockResolvedValue({
      id: "result-mobile",
      scoreTotal: 175,
      niveauStress: determineStressLevel(175),
      dateEvaluation: new Date("2026-08-25T10:00:00.000Z"),
    });

    const response = await saveMobileDiagnostic(
      mobileRequest({
        score: 9999,
        selectedEventIds: ["event-a", "event-a", "inactive-event", "event-b"],
      }),
    );

    expect(response.status).toBe(201);
    expect(mocks.findActiveEvents).toHaveBeenCalledWith({
      where: {
        id: { in: ["event-a", "inactive-event", "event-b"] },
        isActif: true,
      },
      select: { id: true, points: true },
    });
    expectCoherentPersistence("mobile-user", 175, ["event-a", "event-b"]);
  });

  it("cannot inject a score through unknown, inactive or malformed identifiers", async () => {
    mocks.getMobileSession.mockResolvedValue({ user: { id: "mobile-user" } });
    mocks.findActiveEvents.mockResolvedValue([]);
    mocks.createResult.mockResolvedValue({
      id: "result-mobile",
      scoreTotal: 0,
      niveauStress: determineStressLevel(0),
      dateEvaluation: new Date("2026-08-25T10:00:00.000Z"),
    });

    const response = await saveMobileDiagnostic(
      mobileRequest({
        score: 9999,
        selectedEventIds: ["unknown", "inactive-event", 42],
      }),
    );

    expect(response.status).toBe(201);
    expectCoherentPersistence("mobile-user", 0, []);
  });

  it("ignores a forged score submitted with an empty event list", async () => {
    mocks.getMobileSession.mockResolvedValue({ user: { id: "mobile-user" } });
    mocks.createResult.mockResolvedValue({
      id: "result-mobile",
      scoreTotal: 0,
      niveauStress: determineStressLevel(0),
      dateEvaluation: new Date("2026-08-25T10:00:00.000Z"),
    });

    const response = await saveMobileDiagnostic(
      mobileRequest({ score: 9999, selectedEventIds: [] }),
    );

    expect(response.status).toBe(201);
    expect(mocks.findActiveEvents).not.toHaveBeenCalled();
    expectCoherentPersistence("mobile-user", 0, []);
  });

  it("uses the historical mobile fallback-12 moving value", async () => {
    mocks.getMobileSession.mockResolvedValue({ user: { id: "mobile-user" } });
    mocks.createResult.mockResolvedValue({
      id: "result-mobile",
      scoreTotal: 20,
      niveauStress: determineStressLevel(20),
      dateEvaluation: new Date("2026-08-25T10:00:00.000Z"),
    });

    const response = await saveMobileDiagnostic(
      mobileRequest({
        score: 9999,
        selectedEventIds: ["fallback-12", "fallback-999"],
      }),
    );

    expect(response.status).toBe(201);
    expect(mocks.findActiveEvents).not.toHaveBeenCalled();
    expectCoherentPersistence("mobile-user", 20, []);
  });
});
