import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createSupportTicketForUser: vi.fn(),
  getSession: vi.fn(),
  headers: vi.fn(),
  revalidatePath: vi.fn(),
  userFindUnique: vi.fn(),
}));

vi.mock("next/headers", () => ({ headers: mocks.headers }));
vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));
vi.mock("@/server/better-auth/config", () => ({
  auth: { api: { getSession: mocks.getSession } },
}));
vi.mock("@/server/db", () => ({
  db: { user: { findUnique: mocks.userFindUnique } },
}));
vi.mock("@/server/support", () => {
  class SupportServiceError extends Error {
    readonly code: string;
    readonly ticketNumber?: number;

    constructor(code: string, message: string, ticketNumber?: number) {
      super(message);
      this.code = code;
      this.ticketNumber = ticketNumber;
    }
  }

  return {
    createSupportTicketForUser: mocks.createSupportTicketForUser,
    SupportServiceError,
  };
});

import { createSupportTicketAction } from "../../src/app/(protected)/support/actions";
import { initialSupportActionState } from "../../src/lib/support";
import { SupportServiceError } from "../../src/server/support";

function validFormData(): FormData {
  const formData = new FormData();
  formData.set("category", "ACCOUNT");
  formData.set("subject", " Accès impossible à mon compte ");
  formData.set(
    "description",
    " Depuis ce matin, la page de connexion refuse mes identifiants. ",
  );
  return formData;
}

describe("support ticket server action", () => {
  beforeEach(() => {
    mocks.headers.mockResolvedValue(new Headers({ cookie: "session=test" }));
    mocks.getSession.mockResolvedValue({ user: { id: "user-123" } });
    mocks.userFindUnique.mockResolvedValue({ isActif: true });
    mocks.createSupportTicketForUser.mockResolvedValue({ ticketNumber: 42 });
  });

  it("rejects an anonymous request before database or GLPI access", async () => {
    mocks.getSession.mockResolvedValue(null);

    await expect(
      createSupportTicketAction(initialSupportActionState, validFormData()),
    ).resolves.toEqual({
      status: "error",
      message: "Votre session a expiré. Veuillez vous reconnecter.",
    });
    expect(mocks.userFindUnique).not.toHaveBeenCalled();
    expect(mocks.createSupportTicketForUser).not.toHaveBeenCalled();
  });

  it("rejects an inactive account before GLPI access", async () => {
    mocks.userFindUnique.mockResolvedValue({ isActif: false });

    await createSupportTicketAction(initialSupportActionState, validFormData());

    expect(mocks.userFindUnique).toHaveBeenCalledWith({
      where: { id: "user-123" },
      select: { isActif: true },
    });
    expect(mocks.createSupportTicketForUser).not.toHaveBeenCalled();
  });

  it("rejects arbitrary categories and ignores client-supplied user or GLPI IDs", async () => {
    const formData = validFormData();
    formData.set("category", "999");
    formData.set("userId", "another-user");
    formData.set("glpiTicketId", "456");

    const result = await createSupportTicketAction(
      initialSupportActionState,
      formData,
    );

    expect(result).toMatchObject({
      status: "error",
      fieldErrors: { category: expect.any(Array) as string[] },
    });
    expect(mocks.createSupportTicketForUser).not.toHaveBeenCalled();
  });

  it("creates the normalized request for the authenticated user and refreshes the list", async () => {
    await expect(
      createSupportTicketAction(initialSupportActionState, validFormData()),
    ).resolves.toEqual({
      status: "success",
      ticketNumber: 42,
      message: "Votre demande GLPI #42 a bien été créée.",
    });
    expect(mocks.createSupportTicketForUser).toHaveBeenCalledWith("user-123", {
      category: "ACCOUNT",
      subject: "Accès impossible à mon compte",
      description:
        "Depuis ce matin, la page de connexion refuse mes identifiants.",
    });
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/support");
  });

  it("preserves an actionable service error without exposing internals", async () => {
    mocks.createSupportTicketForUser.mockRejectedValue(
      new SupportServiceError(
        "PARTIAL_CREATION",
        "Le ticket GLPI #73 a été créé. Ne renvoyez pas la demande.",
        73,
      ),
    );

    await expect(
      createSupportTicketAction(initialSupportActionState, validFormData()),
    ).resolves.toEqual({
      status: "error",
      message: "Le ticket GLPI #73 a été créé. Ne renvoyez pas la demande.",
      ticketNumber: 73,
    });
    expect(mocks.revalidatePath).not.toHaveBeenCalled();
  });

  it("returns a stable public error for unexpected failures", async () => {
    mocks.createSupportTicketForUser.mockRejectedValue(
      new Error("GLPI URL and private token details"),
    );

    const result = await createSupportTicketAction(
      initialSupportActionState,
      validFormData(),
    );

    expect(result).toEqual({
      status: "error",
      message:
        "Le service de support est temporairement indisponible. Réessayez plus tard.",
    });
    expect(JSON.stringify(result)).not.toContain("private token");
  });
});
