import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createEntry: vi.fn(),
  getSession: vi.fn(),
  headers: vi.fn(),
}));

vi.mock("next/headers", () => ({ headers: mocks.headers }));

vi.mock("@/server/better-auth/config", () => ({
  auth: { api: { getSession: mocks.getSession } },
}));

vi.mock("@/server/db", () => ({
  db: { journalEmotion: { create: mocks.createEntry } },
}));

import { saveJournalEntry } from "../../src/app/(protected)/journal/actions";

describe("journal server action", () => {
  beforeEach(() => {
    mocks.headers.mockResolvedValue(new Headers({ cookie: "session=test" }));
    mocks.getSession.mockResolvedValue({ user: { id: "user-123" } });
    mocks.createEntry.mockResolvedValue({ id: "entry-1" });
  });

  it("rejects an anonymous write before accessing the database", async () => {
    mocks.getSession.mockResolvedValue(null);

    await expect(saveJournalEntry("emotion-1", "Note")).rejects.toThrow(
      /non autorisée/i,
    );
    expect(mocks.createEntry).not.toHaveBeenCalled();
  });

  it("always attaches a cleaned note to the authenticated user", async () => {
    await expect(
      saveJournalEntry("emotion-1", "  Respiration avant examen  "),
    ).resolves.toEqual({ success: true });

    expect(mocks.createEntry).toHaveBeenCalledWith({
      data: {
        emotionN2Id: "emotion-1",
        notePersonnelle: "Respiration avant examen",
        utilisateurId: "user-123",
      },
    });
  });

  it("stores a whitespace-only note as null", async () => {
    await saveJournalEntry("emotion-1", "   \n ");

    expect(mocks.createEntry).toHaveBeenCalledWith({
      data: {
        emotionN2Id: "emotion-1",
        notePersonnelle: null,
        utilisateurId: "user-123",
      },
    });
  });

  it("returns a stable public error when persistence fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    mocks.createEntry.mockRejectedValue(new Error("database details"));

    await expect(saveJournalEntry("unknown", "Note")).resolves.toEqual({
      success: false,
      error: "Impossible de sauvegarder votre entrée.",
    });
  });
});
