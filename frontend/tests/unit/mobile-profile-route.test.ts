import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  accountDeleteMany: vi.fn(),
  getSession: vi.fn(),
  journalDeleteMany: vi.fn(),
  resultDeleteMany: vi.fn(),
  responseDeleteMany: vi.fn(),
  sessionDeleteMany: vi.fn(),
  supportTicketDeleteMany: vi.fn(),
  transaction: vi.fn(),
  userCount: vi.fn(),
  userFindUnique: vi.fn(),
  userUpdate: vi.fn(),
}));

vi.mock("server-only", () => ({}));

vi.mock("@/server/better-auth/config", () => ({
  auth: {
    api: {
      getSession: mocks.getSession,
    },
  },
}));

vi.mock("@/server/db", () => ({
  db: {
    $transaction: mocks.transaction,
    account: { deleteMany: mocks.accountDeleteMany },
    journalEmotion: { deleteMany: mocks.journalDeleteMany },
    reponseDiagnostic: { deleteMany: mocks.responseDeleteMany },
    resultatDiagnostic: { deleteMany: mocks.resultDeleteMany },
    session: { deleteMany: mocks.sessionDeleteMany },
    supportTicket: { deleteMany: mocks.supportTicketDeleteMany },
    user: {
      count: mocks.userCount,
      findUnique: mocks.userFindUnique,
      update: mocks.userUpdate,
    },
  },
}));

import { DELETE, OPTIONS } from "../../src/app/api/mobile/profile/route";
import { LAST_ACTIVE_ADMIN_ERROR_MESSAGE } from "../../src/server/active-admin";
import { buildMobileBrowserTrustedOrigins } from "../../src/server/mobile-origins";

const endpoint = "http://localhost:3000/api/mobile/profile";

function createRequest(
  method: "DELETE" | "OPTIONS",
  origin: string | null = "http://localhost:8081",
) {
  return new NextRequest(endpoint, {
    method,
    headers: origin ? { origin } : undefined,
  });
}

describe("mobile profile route", () => {
  beforeEach(() => {
    mocks.getSession.mockResolvedValue(null);
    mocks.userCount.mockResolvedValue(1);
    mocks.userFindUnique.mockResolvedValue({
      isActif: true,
      role: "USER",
    });

    for (const operation of [
      mocks.accountDeleteMany,
      mocks.journalDeleteMany,
      mocks.resultDeleteMany,
      mocks.responseDeleteMany,
      mocks.sessionDeleteMany,
      mocks.supportTicketDeleteMany,
      mocks.userUpdate,
    ]) {
      operation.mockResolvedValue({ count: 1 });
    }

    mocks.transaction.mockImplementation((operation: unknown) => {
      const transactionClient = {
        account: { deleteMany: mocks.accountDeleteMany },
        journalEmotion: { deleteMany: mocks.journalDeleteMany },
        reponseDiagnostic: { deleteMany: mocks.responseDeleteMany },
        resultatDiagnostic: { deleteMany: mocks.resultDeleteMany },
        session: { deleteMany: mocks.sessionDeleteMany },
        supportTicket: { deleteMany: mocks.supportTicketDeleteMany },
        user: {
          count: mocks.userCount,
          findUnique: mocks.userFindUnique,
          update: mocks.userUpdate,
        },
      };
      const runTransaction = operation as (
        transaction: typeof transactionClient,
      ) => Promise<unknown>;

      return runTransaction(transactionClient);
    });
  });

  it("advertises DELETE during the CORS preflight", async () => {
    const response = await OPTIONS(createRequest("OPTIONS"));

    expect(response.status).toBe(204);
    expect(response.headers.get("access-control-allow-origin")).toBe(
      "http://localhost:8081",
    );
    expect(response.headers.get("access-control-allow-methods")).toContain(
      "DELETE",
    );
  });

  it("rejects an unknown CORS preflight without reflecting its origin", async () => {
    const response = await OPTIONS(
      createRequest("OPTIONS", "https://attacker.example"),
    );

    expect(response.status).toBe(403);
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
    expect(response.headers.get("access-control-allow-credentials")).toBeNull();
  });

  it("accepts native requests without adding wildcard CORS credentials", async () => {
    mocks.getSession.mockResolvedValue({ user: { id: "user-123" } });

    const response = await DELETE(createRequest("DELETE", null));

    expect(response.status).toBe(200);
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
    expect(response.headers.get("access-control-allow-credentials")).toBeNull();
    expect(mocks.userFindUnique).toHaveBeenCalledWith({
      where: { id: "user-123" },
      select: { isActif: true },
    });
  });

  it("rejects an unknown request origin before reading its session", async () => {
    mocks.getSession.mockResolvedValue({ user: { id: "user-123" } });

    const response = await DELETE(
      createRequest("DELETE", "https://attacker.example"),
    );

    expect(response.status).toBe(401);
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
    expect(mocks.getSession).not.toHaveBeenCalled();
    expect(mocks.userFindUnique).not.toHaveBeenCalled();
    expect(mocks.transaction).not.toHaveBeenCalled();
  });

  it("rejects an anonymous deletion without touching the database", async () => {
    const response = await DELETE(createRequest("DELETE"));

    expect(response.status).toBe(401);
    expect(mocks.userFindUnique).not.toHaveBeenCalled();
    expect(mocks.transaction).not.toHaveBeenCalled();
    expect(mocks.userUpdate).not.toHaveBeenCalled();
  });

  it("rejects a valid session belonging to an inactive account", async () => {
    mocks.getSession.mockResolvedValue({ user: { id: "inactive-user" } });
    mocks.userFindUnique.mockResolvedValue({ isActif: false });

    const response = await DELETE(createRequest("DELETE"));

    expect(response.status).toBe(401);
    expect(mocks.userFindUnique).toHaveBeenCalledWith({
      where: { id: "inactive-user" },
      select: { isActif: true },
    });
    expect(mocks.transaction).not.toHaveBeenCalled();
  });

  it("deletes and anonymizes only the authenticated user's data atomically", async () => {
    mocks.getSession.mockResolvedValue({ user: { id: "user-123" } });

    const response = await DELETE(createRequest("DELETE"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });

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
    expect(mocks.supportTicketDeleteMany).toHaveBeenCalledWith({
      where: { utilisateurId: "user-123" },
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
    expect(mocks.transaction).toHaveBeenCalledOnce();
    expect(mocks.transaction).toHaveBeenCalledWith(expect.any(Function), {
      isolationLevel: "Serializable",
    });
  });

  it("preserves the last active administrator account", async () => {
    mocks.getSession.mockResolvedValue({ user: { id: "last-admin" } });
    mocks.userFindUnique
      .mockResolvedValueOnce({ isActif: true })
      .mockResolvedValueOnce({ isActif: true, role: "ADMIN" });
    mocks.userCount.mockResolvedValue(0);

    const response = await DELETE(createRequest("DELETE"));

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      error: LAST_ACTIVE_ADMIN_ERROR_MESSAGE,
    });
    expect(mocks.userCount).toHaveBeenCalledWith({
      where: {
        id: { not: "last-admin" },
        role: "ADMIN",
        isActif: true,
      },
    });
    expect(mocks.transaction).toHaveBeenCalledWith(expect.any(Function), {
      isolationLevel: "Serializable",
    });
    expect(mocks.journalDeleteMany).not.toHaveBeenCalled();
    expect(mocks.userUpdate).not.toHaveBeenCalled();
  });

  it("builds the browser allowlist from application, development and CSV origins", () => {
    expect(
      buildMobileBrowserTrustedOrigins({
        BETTER_AUTH_URL: "https://api.example.com/auth",
        MOBILE_ALLOWED_ORIGINS:
          " https://mobile.example.com/app,https://admin.example.com ",
        MOBILE_DEV_HOST: "192.168.1.20",
        NODE_ENV: "development",
      }),
    ).toEqual([
      "https://api.example.com",
      "http://localhost:3000",
      "http://localhost:8081",
      "http://192.168.1.20:3000",
      "http://192.168.1.20:8081",
      "https://mobile.example.com",
      "https://admin.example.com",
    ]);
  });

  it("does not enable development origins by default in production", () => {
    expect(
      buildMobileBrowserTrustedOrigins({
        BETTER_AUTH_URL: "https://api.example.com",
        NODE_ENV: "production",
      }),
    ).toEqual(["https://api.example.com"]);

    expect(
      buildMobileBrowserTrustedOrigins({ NODE_ENV: "production" }),
    ).toEqual([]);
  });
});
