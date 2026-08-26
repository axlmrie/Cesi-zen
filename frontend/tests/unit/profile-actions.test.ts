import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  changePassword: vi.fn(),
  deleteAndAnonymizeUserAccount: vi.fn(),
  getSession: vi.fn(),
  headers: vi.fn(),
  userFindUnique: vi.fn(),
  userUpdate: vi.fn(),
}));

vi.mock("next/headers", () => ({ headers: mocks.headers }));

vi.mock("@/server/better-auth/config", () => ({
  auth: {
    api: {
      changePassword: mocks.changePassword,
      getSession: mocks.getSession,
    },
  },
}));

vi.mock("@/server/db", () => ({
  db: {
    user: {
      findUnique: mocks.userFindUnique,
      update: mocks.userUpdate,
    },
  },
}));

vi.mock("@/server/rgpd", () => ({
  deleteAndAnonymizeUserAccount: mocks.deleteAndAnonymizeUserAccount,
}));

import {
  changeUserPassword,
  deleteUserAccount,
  exportUserData,
  softDeleteAccount,
  updateUserProfile,
} from "../../src/app/(protected)/profil/actions";

describe("profile server actions", () => {
  beforeEach(() => {
    mocks.headers.mockResolvedValue(new Headers({ cookie: "session=test" }));
    mocks.getSession.mockResolvedValue({ user: { id: "user-123" } });
    mocks.userUpdate.mockResolvedValue({});
    mocks.userFindUnique.mockResolvedValue({ id: "user-123" });
    mocks.changePassword.mockResolvedValue({ status: true });
    mocks.deleteAndAnonymizeUserAccount.mockResolvedValue([]);
  });

  it("updates only the account identified by the authenticated session", async () => {
    await expect(
      updateUserProfile({
        firstName: " Alice ",
        lastName: " Martin ",
        age: 25,
      }),
    ).resolves.toEqual({ success: true });

    expect(mocks.userUpdate).toHaveBeenCalledWith({
      where: { id: "user-123" },
      data: {
        age: 25,
        firstName: "Alice",
        lastName: "Martin",
        name: "Alice Martin",
      },
    });
  });

  it("does not write an invalid profile", async () => {
    const result = await updateUserProfile({
      firstName: "Alice",
      lastName: "Martin",
      age: 12,
    });

    expect(result).toEqual({
      success: false,
      error: "L'age doit etre compris entre 13 et 120 ans.",
    });
    expect(mocks.userUpdate).not.toHaveBeenCalled();
  });

  it("revokes other sessions after a password change", async () => {
    await expect(
      changeUserPassword({
        currentPassword: "ancien-mot-de-passe",
        newPassword: "nouveau-mot-de-passe",
      }),
    ).resolves.toEqual({ success: true });

    expect(mocks.changePassword).toHaveBeenCalledWith({
      headers: expect.any(Headers) as Headers,
      body: {
        currentPassword: "ancien-mot-de-passe",
        newPassword: "nouveau-mot-de-passe",
        revokeOtherSessions: true,
      },
    });
  });

  it("exports data only for the authenticated account", async () => {
    const exportedData = {
      id: "user-123",
      resultatsDiagnostic: [],
      journalEmotions: [],
      supportTickets: [],
    };
    mocks.userFindUnique.mockResolvedValue(exportedData);

    await expect(exportUserData()).resolves.toEqual({
      success: true,
      data: exportedData,
    });
    expect(mocks.userFindUnique).toHaveBeenCalledWith({
      where: { id: "user-123" },
      include: {
        resultatsDiagnostic: true,
        journalEmotions: true,
        supportTickets: true,
      },
    });
  });

  it.each([
    ["legacy soft deletion", softDeleteAccount],
    ["right to erasure", deleteUserAccount],
  ])(
    "uses the shared transactional RGPD service for %s",
    async (_label, action) => {
      await expect(action()).resolves.toEqual({ success: true });
      expect(mocks.deleteAndAnonymizeUserAccount).toHaveBeenCalledWith(
        "user-123",
      );
    },
  );

  it("reports refusal when the current account is the last active administrator", async () => {
    mocks.deleteAndAnonymizeUserAccount.mockRejectedValue(
      new Error("Impossible de retirer le dernier administrateur actif."),
    );

    await expect(deleteUserAccount()).resolves.toEqual({
      success: false,
      error: "Impossible de retirer le dernier administrateur actif.",
    });
  });

  it.each([
    [
      "profile update",
      () => updateUserProfile({ firstName: "A", lastName: "B", age: 20 }),
    ],
    [
      "password change",
      () => changeUserPassword({ currentPassword: "old", newPassword: "new" }),
    ],
    ["data export", () => exportUserData()],
    ["legacy account deletion", () => softDeleteAccount()],
    ["account deletion", () => deleteUserAccount()],
  ])("rejects an anonymous %s", async (_label, action) => {
    mocks.getSession.mockResolvedValue(null);

    await expect(action()).rejects.toThrow();
    expect(mocks.userUpdate).not.toHaveBeenCalled();
    expect(mocks.changePassword).not.toHaveBeenCalled();
    expect(mocks.deleteAndAnonymizeUserAccount).not.toHaveBeenCalled();
  });
});
