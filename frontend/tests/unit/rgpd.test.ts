import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  accountDeleteMany: vi.fn(),
  journalDeleteMany: vi.fn(),
  responseDeleteMany: vi.fn(),
  resultDeleteMany: vi.fn(),
  sessionDeleteMany: vi.fn(),
  transaction: vi.fn(),
  userCount: vi.fn(),
  userFindUnique: vi.fn(),
  userUpdate: vi.fn(),
}));

vi.mock("server-only", () => ({}));

vi.mock("@/server/db", () => ({
  db: {
    $transaction: mocks.transaction,
  },
}));

import { deleteAndAnonymizeUserAccount } from "../../src/server/rgpd";

const transactionClient = {
  account: { deleteMany: mocks.accountDeleteMany },
  journalEmotion: { deleteMany: mocks.journalDeleteMany },
  reponseDiagnostic: { deleteMany: mocks.responseDeleteMany },
  resultatDiagnostic: { deleteMany: mocks.resultDeleteMany },
  session: { deleteMany: mocks.sessionDeleteMany },
  user: {
    count: mocks.userCount,
    findUnique: mocks.userFindUnique,
    update: mocks.userUpdate,
  },
};

function executeTransaction(
  operation: (transaction: typeof transactionClient) => Promise<unknown>,
) {
  return operation(transactionClient);
}

describe("transactional RGPD account deletion", () => {
  beforeEach(() => {
    mocks.transaction.mockImplementation(executeTransaction);
    mocks.userFindUnique.mockResolvedValue({ role: "USER", isActif: true });
    mocks.userCount.mockResolvedValue(1);
    mocks.userUpdate.mockResolvedValue({ id: "user-123" });

    for (const operation of [
      mocks.accountDeleteMany,
      mocks.journalDeleteMany,
      mocks.responseDeleteMany,
      mocks.resultDeleteMany,
      mocks.sessionDeleteMany,
    ]) {
      operation.mockResolvedValue({ count: 1 });
    }
  });

  it("deletes related data and forces the anonymized role to USER", async () => {
    await deleteAndAnonymizeUserAccount("user-123");

    expect(mocks.userFindUnique).toHaveBeenCalledWith({
      where: { id: "user-123" },
      select: { role: true, isActif: true },
    });
    expect(mocks.journalDeleteMany).toHaveBeenCalledWith({
      where: { utilisateurId: "user-123" },
    });
    expect(mocks.responseDeleteMany).toHaveBeenCalledWith({
      where: { resultat: { utilisateurId: "user-123" } },
    });
    expect(mocks.resultDeleteMany).toHaveBeenCalledWith({
      where: { utilisateurId: "user-123" },
    });
    expect(mocks.sessionDeleteMany).toHaveBeenCalledWith({
      where: { userId: "user-123" },
    });
    expect(mocks.accountDeleteMany).toHaveBeenCalledWith({
      where: { userId: "user-123" },
    });
    expect(mocks.userUpdate).toHaveBeenCalledWith({
      where: { id: "user-123" },
      data: {
        age: null,
        dateConsentement: null,
        email: "deleted-user-123@deleted.local",
        emailVerified: false,
        firstName: "Compte",
        image: null,
        isActif: false,
        lastName: "Supprime",
        name: "Compte supprime",
        role: "USER",
      },
    });
    expect(mocks.transaction).toHaveBeenCalledWith(expect.any(Function), {
      isolationLevel: "Serializable",
    });
  });

  it("refuses deletion of the last active administrator before any write", async () => {
    mocks.userFindUnique.mockResolvedValue({ role: "ADMIN", isActif: true });
    mocks.userCount.mockResolvedValue(0);

    await expect(deleteAndAnonymizeUserAccount("admin-last")).rejects.toThrow(
      "Impossible de retirer le dernier administrateur actif.",
    );

    expect(mocks.userCount).toHaveBeenCalledWith({
      where: {
        id: { not: "admin-last" },
        role: "ADMIN",
        isActif: true,
      },
    });
    expect(mocks.journalDeleteMany).not.toHaveBeenCalled();
    expect(mocks.userUpdate).not.toHaveBeenCalled();
    expect(mocks.transaction).toHaveBeenCalledWith(expect.any(Function), {
      isolationLevel: "Serializable",
    });
  });

  it("allows deletion of an administrator when another active admin remains", async () => {
    mocks.userFindUnique.mockResolvedValue({ role: "ADMIN", isActif: true });
    mocks.userCount.mockResolvedValue(1);

    await expect(deleteAndAnonymizeUserAccount("admin-other")).resolves.toEqual(
      { id: "user-123" },
    );

    expect(mocks.userUpdate).toHaveBeenCalledOnce();
  });

  it("retries a serializable transaction after a Prisma P2034 conflict", async () => {
    mocks.transaction
      .mockRejectedValueOnce({ code: "P2034" })
      .mockImplementationOnce(executeTransaction);

    await deleteAndAnonymizeUserAccount("user-123");

    expect(mocks.transaction).toHaveBeenCalledTimes(2);
    for (const call of mocks.transaction.mock.calls) {
      expect(call[1]).toEqual({ isolationLevel: "Serializable" });
    }
  });
});
