import type { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  countDiagnostics: vi.fn(),
  countJournals: vi.fn(),
  findDiagnostics: vi.fn(),
  findJournals: vi.fn(),
  getMobileSession: vi.fn(),
}));

vi.mock("@/server/db", () => ({
  db: {
    journalEmotion: {
      count: mocks.countJournals,
      findMany: mocks.findJournals,
    },
    resultatDiagnostic: {
      count: mocks.countDiagnostics,
      findMany: mocks.findDiagnostics,
    },
  },
}));

vi.mock("@/app/api/mobile/_utils", () => ({
  getMobileSession: mocks.getMobileSession,
  jsonResponse: (_request: NextRequest, body: unknown, init?: ResponseInit) =>
    Response.json(body, init),
  optionsResponse: () => new Response(null, { status: 204 }),
  unauthorizedResponse: () =>
    Response.json({ error: "Authentification requise." }, { status: 401 }),
}));

import { GET } from "../../src/app/api/mobile/dashboard/route";

const request = new Request(
  "http://localhost:3000/api/mobile/dashboard",
) as NextRequest;

describe("mobile dashboard route", () => {
  beforeEach(() => {
    mocks.getMobileSession.mockResolvedValue(null);
    mocks.findDiagnostics.mockResolvedValue([]);
    mocks.findJournals.mockResolvedValue([]);
    mocks.countDiagnostics.mockResolvedValue(0);
    mocks.countJournals.mockResolvedValue(0);
  });

  it("returns 401 without querying private data for an anonymous request", async () => {
    const response = await GET(request);

    expect(response.status).toBe(401);
    expect(mocks.findDiagnostics).not.toHaveBeenCalled();
    expect(mocks.findJournals).not.toHaveBeenCalled();
  });

  it("scopes every query to the current user and returns total counts", async () => {
    mocks.getMobileSession.mockResolvedValue({ user: { id: "user-123" } });
    mocks.findDiagnostics.mockResolvedValue([
      { scoreTotal: 310, niveauStress: "Élevé" },
      { scoreTotal: 120, niveauStress: "Faible" },
    ]);
    mocks.findJournals.mockResolvedValue([{ id: "journal-1" }]);
    mocks.countDiagnostics.mockResolvedValue(7);
    mocks.countJournals.mockResolvedValue(12);

    const response = await GET(request);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      stats: {
        diagnosticsCount: 7,
        journalEntriesCount: 12,
        latestStressLevel: "Élevé",
        latestStressScore: 310,
      },
    });

    const userFilter = { where: { utilisateurId: "user-123" } };
    expect(mocks.countDiagnostics).toHaveBeenCalledWith(userFilter);
    expect(mocks.countJournals).toHaveBeenCalledWith(userFilter);
    expect(mocks.findDiagnostics).toHaveBeenCalledWith(
      expect.objectContaining(userFilter),
    );
    expect(mocks.findJournals).toHaveBeenCalledWith(
      expect.objectContaining(userFilter),
    );
  });
});
