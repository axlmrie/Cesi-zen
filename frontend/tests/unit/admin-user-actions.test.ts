import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  deleteAndAnonymizeUserAccount: vi.fn(),
  hashPassword: vi.fn(),
  revalidatePath: vi.fn(),
  requireAdminAction: vi.fn(),
  sessionDeleteMany: vi.fn(),
  transaction: vi.fn(),
  userCount: vi.fn(),
  userCreate: vi.fn(),
  userFindUnique: vi.fn(),
  userUpdate: vi.fn(),
}));

vi.mock("server-only", () => ({}));

vi.mock("better-auth/crypto", () => ({
  hashPassword: mocks.hashPassword,
}));

vi.mock("next/cache", () => ({
  revalidatePath: mocks.revalidatePath,
}));

vi.mock("@/server/admin", () => ({
  requireAdminAction: mocks.requireAdminAction,
}));

vi.mock("@/server/db", () => ({
  db: {
    $transaction: mocks.transaction,
    session: { deleteMany: mocks.sessionDeleteMany },
    user: {
      count: mocks.userCount,
      create: mocks.userCreate,
      findUnique: mocks.userFindUnique,
      update: mocks.userUpdate,
    },
  },
}));

vi.mock("@/server/rgpd", () => ({
  deleteAndAnonymizeUserAccount: mocks.deleteAndAnonymizeUserAccount,
}));

import {
  anonymizeManagedUser,
  createManagedUser,
  toggleManagedUserStatus,
  updateManagedUserRole,
} from "../../src/app/admin/actions";

const currentAdmin = {
  id: "admin-current",
  name: "Admin Current",
  email: "admin@example.com",
  role: "ADMIN" as const,
  isActif: true,
};

const transactionClient = {
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

function userForm(userId: string, entries: Record<string, string> = {}) {
  const formData = new FormData();
  formData.set("userId", userId);
  for (const [key, value] of Object.entries(entries)) {
    formData.set(key, value);
  }
  return formData;
}

describe("administrator user-management invariants", () => {
  beforeEach(() => {
    mocks.requireAdminAction.mockResolvedValue(currentAdmin);
    mocks.userFindUnique.mockResolvedValue(null);
    mocks.userCount.mockResolvedValue(1);
    mocks.userUpdate.mockResolvedValue({});
    mocks.userCreate.mockResolvedValue({});
    mocks.sessionDeleteMany.mockResolvedValue({ count: 0 });
    mocks.hashPassword.mockResolvedValue("hashed-password");
    mocks.deleteAndAnonymizeUserAccount.mockResolvedValue({});
    mocks.transaction.mockImplementation(executeTransaction);
  });

  it("stops immediately when the administrator guard rejects the request", async () => {
    mocks.requireAdminAction.mockRejectedValue(
      new Error("Action non autorisee."),
    );
    const formData = new FormData();
    formData.set("firstName", "Alice");
    formData.set("lastName", "Martin");
    formData.set("email", "alice@example.com");
    formData.set("password", "mot-de-passe-solide");

    await expect(createManagedUser(formData)).rejects.toThrow(
      "Action non autorisee.",
    );
    expect(mocks.userFindUnique).not.toHaveBeenCalled();
    expect(mocks.userCreate).not.toHaveBeenCalled();
  });

  it("prevents an administrator from removing their own access", async () => {
    const formData = userForm(currentAdmin.id, { role: "USER" });

    await expect(updateManagedUserRole(formData)).rejects.toThrow(
      /propre acces administrateur/,
    );
    expect(mocks.transaction).not.toHaveBeenCalled();
    expect(mocks.userUpdate).not.toHaveBeenCalled();
  });

  it("prevents removal of the last active administrator", async () => {
    mocks.userFindUnique.mockResolvedValue({
      role: "ADMIN",
      isActif: true,
    });
    mocks.userCount.mockResolvedValue(0);

    await expect(
      updateManagedUserRole(userForm("admin-last", { role: "USER" })),
    ).rejects.toThrow(/dernier administrateur actif/);
    expect(mocks.transaction).toHaveBeenCalledWith(expect.any(Function), {
      isolationLevel: "Serializable",
    });
    expect(mocks.userUpdate).not.toHaveBeenCalled();
  });

  it("allows demotion when another active administrator remains", async () => {
    mocks.userFindUnique.mockResolvedValue({
      role: "ADMIN",
      isActif: true,
    });
    mocks.userCount.mockResolvedValue(1);

    await updateManagedUserRole(userForm("admin-other", { role: "USER" }));

    expect(mocks.userUpdate).toHaveBeenCalledWith({
      where: { id: "admin-other" },
      data: { role: "USER" },
    });
    expect(mocks.transaction).toHaveBeenCalledWith(expect.any(Function), {
      isolationLevel: "Serializable",
    });
  });

  it("prevents disabling the last active administrator", async () => {
    mocks.userFindUnique.mockResolvedValue({
      role: "ADMIN",
      isActif: true,
    });
    mocks.userCount.mockResolvedValue(0);

    await expect(
      toggleManagedUserStatus(userForm("admin-last")),
    ).rejects.toThrow(/dernier administrateur actif/);

    expect(mocks.userUpdate).not.toHaveBeenCalled();
    expect(mocks.sessionDeleteMany).not.toHaveBeenCalled();
    expect(mocks.transaction).toHaveBeenCalledWith(expect.any(Function), {
      isolationLevel: "Serializable",
    });
  });

  it("revokes every session when an account is disabled", async () => {
    mocks.userFindUnique.mockResolvedValue({
      role: "USER",
      isActif: true,
    });

    await toggleManagedUserStatus(userForm("user-123"));

    expect(mocks.userUpdate).toHaveBeenCalledWith({
      where: { id: "user-123" },
      data: { isActif: false },
    });
    expect(mocks.sessionDeleteMany).toHaveBeenCalledWith({
      where: { userId: "user-123" },
    });
    expect(mocks.transaction).toHaveBeenCalledWith(expect.any(Function), {
      isolationLevel: "Serializable",
    });
  });

  it("delegates managed-user anonymization to the shared RGPD service", async () => {
    await anonymizeManagedUser(userForm("user-123"));

    expect(mocks.deleteAndAnonymizeUserAccount).toHaveBeenCalledWith(
      "user-123",
    );
    expect(mocks.userUpdate).not.toHaveBeenCalled();
    expect(mocks.sessionDeleteMany).not.toHaveBeenCalled();
  });
});
