import { beforeEach, describe, expect, it, vi } from "vitest";

type UserWithRole = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  isActif: boolean;
};

type TestSession = { user: { id: string } } | null;

const mocks = vi.hoisted(() => ({
  findUnique: vi.fn<() => Promise<UserWithRole | null>>(),
  getSession: vi.fn<() => Promise<TestSession>>(),
  headers: vi.fn<() => Promise<Headers>>(),
  notFound: vi.fn<() => never>(),
  redirect: vi.fn<(path: string) => never>(),
}));

vi.mock("server-only", () => ({}));

vi.mock("next/headers", () => ({
  headers: mocks.headers,
}));

vi.mock("next/navigation", () => ({
  notFound: mocks.notFound,
  redirect: mocks.redirect,
}));

vi.mock("@/server/better-auth/config", () => ({
  auth: {
    api: {
      getSession: mocks.getSession,
    },
  },
}));

vi.mock("@/server/db", () => ({
  db: {
    user: {
      findUnique: mocks.findUnique,
    },
  },
}));

import {
  getCurrentUserWithRole,
  requireAdminAction,
  requireAdminPage,
} from "../../src/server/admin";

const activeAdmin: UserWithRole = {
  id: "admin-1",
  name: "Alice Admin",
  email: "alice@example.com",
  role: "ADMIN",
  isActif: true,
};

const redirectError = new Error("NEXT_REDIRECT");
const notFoundError = new Error("NEXT_NOT_FOUND");

function authenticateAs(user: UserWithRole) {
  mocks.getSession.mockResolvedValue({ user: { id: user.id } });
  mocks.findUnique.mockResolvedValue(user);
}

describe("admin access guards", () => {
  beforeEach(() => {
    mocks.headers.mockResolvedValue(new Headers({ "x-test-request": "admin" }));
    mocks.getSession.mockResolvedValue(null);
    mocks.findUnique.mockResolvedValue(null);
    mocks.redirect.mockImplementation(() => {
      throw redirectError;
    });
    mocks.notFound.mockImplementation(() => {
      throw notFoundError;
    });
  });

  describe("getCurrentUserWithRole", () => {
    it("returns null without an authenticated session", async () => {
      await expect(getCurrentUserWithRole()).resolves.toBeNull();

      expect(mocks.getSession).toHaveBeenCalledWith({
        headers: expect.any(Headers) as Headers,
      });
      expect(mocks.findUnique).not.toHaveBeenCalled();
    });

    it("loads the authenticated user's role and active state", async () => {
      authenticateAs(activeAdmin);

      await expect(getCurrentUserWithRole()).resolves.toEqual(activeAdmin);
      expect(mocks.findUnique).toHaveBeenCalledWith({
        where: { id: activeAdmin.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActif: true,
        },
      });
    });
  });

  describe("requireAdminAction", () => {
    it("allows an active administrator", async () => {
      authenticateAs(activeAdmin);

      await expect(requireAdminAction()).resolves.toEqual(activeAdmin);
    });

    it.each([
      {
        label: "a regular user",
        user: { ...activeAdmin, id: "user-1", role: "USER" as const },
      },
      {
        label: "an inactive administrator",
        user: { ...activeAdmin, id: "admin-2", isActif: false },
      },
    ])("rejects $label", async ({ user }) => {
      authenticateAs(user);

      await expect(requireAdminAction()).rejects.toThrow(
        "Action non autorisee.",
      );
    });

    it("rejects an anonymous request", async () => {
      await expect(requireAdminAction()).rejects.toThrow(
        "Action non autorisee.",
      );
      expect(mocks.findUnique).not.toHaveBeenCalled();
    });
  });

  describe("requireAdminPage", () => {
    it("redirects an anonymous visitor to the sign-in page", async () => {
      await expect(requireAdminPage()).rejects.toBe(redirectError);

      expect(mocks.redirect).toHaveBeenCalledWith("/auth/connexion");
      expect(mocks.notFound).not.toHaveBeenCalled();
    });

    it.each([
      {
        label: "a regular user",
        user: { ...activeAdmin, id: "user-1", role: "USER" as const },
      },
      {
        label: "an inactive administrator",
        user: { ...activeAdmin, id: "admin-2", isActif: false },
      },
    ])("returns not found for $label", async ({ user }) => {
      authenticateAs(user);

      await expect(requireAdminPage()).rejects.toBe(notFoundError);
      expect(mocks.notFound).toHaveBeenCalledOnce();
      expect(mocks.redirect).not.toHaveBeenCalled();
    });
  });
});
