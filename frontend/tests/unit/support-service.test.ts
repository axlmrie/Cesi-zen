import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createGlpiTicket: vi.fn(),
  getGlpiCategoryId: vi.fn(),
  getGlpiStatus: vi.fn(),
  getGlpiTickets: vi.fn(),
  isGlpiConfigured: vi.fn(),
  randomUUID: vi.fn(),
  supportTicketCount: vi.fn(),
  supportTicketCreate: vi.fn(),
  supportTicketFindMany: vi.fn(),
  supportTicketUpdateMany: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("node:crypto", () => ({ randomUUID: mocks.randomUUID }));

vi.mock("@/server/db", () => ({
  db: {
    supportTicket: {
      count: mocks.supportTicketCount,
      create: mocks.supportTicketCreate,
      findMany: mocks.supportTicketFindMany,
      updateMany: mocks.supportTicketUpdateMany,
    },
  },
}));

vi.mock("@/server/glpi/client", () => ({
  createGlpiTicket: mocks.createGlpiTicket,
  getGlpiCategoryId: mocks.getGlpiCategoryId,
  getGlpiStatus: mocks.getGlpiStatus,
  getGlpiTickets: mocks.getGlpiTickets,
  isGlpiConfigured: mocks.isGlpiConfigured,
}));

import {
  buildGlpiTicketContent,
  createSupportTicketForUser,
  listSupportTicketsForUser,
} from "../../src/server/support";

const request = {
  category: "TECHNICAL",
  subject: "Le journal ne répond plus",
  description:
    "Après avoir cliqué, un message <script>alert('x')</script> apparaît.",
} as const;

const localTicket = {
  id: "support-reference",
  glpiTicketId: 42,
  category: "TECHNICAL" as const,
  subject: request.subject,
  statusCode: 1,
  lastSyncedAt: new Date("2026-08-26T08:00:00.000Z"),
  createdAt: new Date("2026-08-26T07:00:00.000Z"),
  updatedAt: new Date("2026-08-26T08:00:00.000Z"),
  utilisateurId: "user-123",
};

describe("support service", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-26T10:00:00.000Z"));
    mocks.randomUUID.mockReturnValue("support-reference");
    mocks.isGlpiConfigured.mockReturnValue(true);
    mocks.getGlpiCategoryId.mockReturnValue(102);
    mocks.getGlpiStatus.mockImplementation((statusCode: number) => ({
      label: statusCode === 5 ? "Résolu" : "Nouveau",
      progress: statusCode === 5 ? 90 : 10,
      tone: statusCode === 5 ? "success" : "info",
    }));
    mocks.supportTicketCount.mockResolvedValue(0);
    mocks.createGlpiTicket.mockResolvedValue({ id: 42, status: 1 });
    mocks.supportTicketCreate.mockResolvedValue(localTicket);
    mocks.supportTicketFindMany.mockResolvedValue([]);
    mocks.supportTicketUpdateMany.mockResolvedValue({ count: 1 });
    mocks.getGlpiTickets.mockResolvedValue(new Map());
  });

  it("rejects an unavailable configuration before touching the database or GLPI", async () => {
    mocks.isGlpiConfigured.mockReturnValue(false);

    await expect(
      createSupportTicketForUser("user-123", request),
    ).rejects.toMatchObject({
      code: "UNAVAILABLE",
    });
    expect(mocks.supportTicketCount).not.toHaveBeenCalled();
    expect(mocks.createGlpiTicket).not.toHaveBeenCalled();
  });

  it("limits one user to three creations per rolling hour", async () => {
    mocks.supportTicketCount.mockResolvedValue(3);

    await expect(
      createSupportTicketForUser("user-123", request),
    ).rejects.toMatchObject({
      code: "RATE_LIMIT",
    });
    expect(mocks.supportTicketCount).toHaveBeenCalledWith({
      where: {
        utilisateurId: "user-123",
        createdAt: { gte: new Date("2026-08-26T09:00:00.000Z") },
      },
    });
    expect(mocks.createGlpiTicket).not.toHaveBeenCalled();
  });

  it("creates an allowlisted GLPI request and stores its ownership locally", async () => {
    await expect(
      createSupportTicketForUser(" user-123 ", request),
    ).resolves.toEqual({
      ticketNumber: 42,
    });

    expect(mocks.getGlpiCategoryId).toHaveBeenCalledWith("technical");
    expect(mocks.createGlpiTicket).toHaveBeenCalledWith({
      subject: "[CESIZen · Problème technique] Le journal ne répond plus",
      categoryId: 102,
      content: expect.stringContaining(
        "&lt;script&gt;alert(&#039;x&#039;)&lt;/script&gt;",
      ) as string,
    });
    expect(mocks.supportTicketCreate).toHaveBeenCalledWith({
      data: {
        id: "support-reference",
        glpiTicketId: 42,
        category: "TECHNICAL",
        subject: request.subject,
        statusCode: 1,
        lastSyncedAt: new Date("2026-08-26T10:00:00.000Z"),
        utilisateurId: "user-123",
      },
    });
  });

  it("never persists a mapping when GLPI creation fails", async () => {
    mocks.createGlpiTicket.mockRejectedValue(
      new Error("private upstream error"),
    );

    await expect(
      createSupportTicketForUser("user-123", request),
    ).rejects.toThrow();
    expect(mocks.supportTicketCreate).not.toHaveBeenCalled();
  });

  it("reports a remote ticket created without a local mapping without duplicating it", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    mocks.supportTicketCreate.mockRejectedValue(
      new Error("MariaDB unavailable"),
    );

    await expect(
      createSupportTicketForUser("user-123", request),
    ).rejects.toMatchObject({
      code: "PARTIAL_CREATION",
      ticketNumber: 42,
    });
  });

  it("loads only the authenticated user's local IDs before synchronizing GLPI", async () => {
    mocks.supportTicketFindMany.mockResolvedValue([localTicket]);
    mocks.getGlpiTickets.mockResolvedValue(
      new Map([
        [42, { id: 42, status: 5, dateModified: "2026-08-26 12:00:00" }],
      ]),
    );

    const tickets = await listSupportTicketsForUser("user-123");

    expect(mocks.supportTicketFindMany).toHaveBeenCalledWith({
      where: { utilisateurId: "user-123" },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    expect(mocks.getGlpiTickets).toHaveBeenCalledWith([42]);
    expect(mocks.supportTicketUpdateMany).toHaveBeenCalledWith({
      where: { id: "support-reference", utilisateurId: "user-123" },
      data: {
        statusCode: 5,
        lastSyncedAt: new Date("2026-08-26T10:00:00.000Z"),
      },
    });
    expect(tickets).toEqual([
      expect.objectContaining({
        id: "support-reference",
        ticketNumber: 42,
        statusCode: 5,
        statusLabel: "Résolu",
        statusProgress: 90,
        syncFailed: false,
      }),
    ]);
  });

  it("falls back to the last locally known status when GLPI is unavailable", async () => {
    mocks.supportTicketFindMany.mockResolvedValue([localTicket]);
    mocks.getGlpiTickets.mockRejectedValue(new Error("GLPI unavailable"));

    await expect(listSupportTicketsForUser("user-123")).resolves.toEqual([
      expect.objectContaining({
        ticketNumber: 42,
        statusCode: 1,
        syncFailed: true,
      }),
    ]);
    expect(mocks.supportTicketUpdateMany).not.toHaveBeenCalled();
  });

  it("escapes every user-controlled HTML fragment sent to GLPI", () => {
    const content = buildGlpiTicketContent("ref<&", request);

    expect(content).toContain("ref&lt;&amp;");
    expect(content).not.toContain("<script>");
    expect(content).not.toContain("alert('x')");
  });
});
