import "server-only";

import { randomUUID } from "node:crypto";

import {
  getSupportCategory,
  type SupportCategoryKey,
  type SupportRequest,
  type SupportTicketView,
} from "@/lib/support";
import {
  createGlpiTicket,
  getGlpiCategoryId,
  getGlpiStatus,
  getGlpiTickets,
  isGlpiConfigured,
  type GlpiCategoryKey,
} from "@/server/glpi/client";
import { db } from "@/server/db";

const SUPPORT_RATE_LIMIT = 3;
const SUPPORT_RATE_WINDOW_MS = 60 * 60 * 1000;
const MAX_VISIBLE_TICKETS = 50;

const glpiCategoryKeys: Record<SupportCategoryKey, GlpiCategoryKey> = {
  ACCOUNT: "account",
  TECHNICAL: "technical",
  USAGE: "usage",
  PRIVACY: "privacy",
  OTHER: "other",
};

export class SupportServiceError extends Error {
  readonly code: "RATE_LIMIT" | "UNAVAILABLE" | "PARTIAL_CREATION";
  readonly ticketNumber?: number;

  constructor(
    code: "RATE_LIMIT" | "UNAVAILABLE" | "PARTIAL_CREATION",
    message: string,
    ticketNumber?: number,
  ) {
    super(message);
    this.name = "SupportServiceError";
    this.code = code;
    this.ticketNumber = ticketNumber;
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function buildGlpiTicketContent(
  reference: string,
  request: SupportRequest,
): string {
  const category = getSupportCategory(request.category);
  const description = escapeHtml(request.description).replaceAll("\n", "<br>");

  return [
    "<p><strong>Origine :</strong> portail CESIZen</p>",
    `<p><strong>Référence CESIZen :</strong> ${escapeHtml(reference)}</p>`,
    `<p><strong>Catégorie :</strong> ${escapeHtml(category.label)}</p>`,
    `<hr><p>${description}</p>`,
  ].join("");
}

export async function createSupportTicketForUser(
  userId: string,
  request: SupportRequest,
): Promise<{ ticketNumber: number }> {
  const normalizedUserId = userId.trim();

  if (!normalizedUserId || !isGlpiConfigured()) {
    throw new SupportServiceError(
      "UNAVAILABLE",
      "Le service de support est temporairement indisponible.",
    );
  }

  const rateLimitStart = new Date(Date.now() - SUPPORT_RATE_WINDOW_MS);
  const recentTickets = await db.supportTicket.count({
    where: {
      utilisateurId: normalizedUserId,
      createdAt: { gte: rateLimitStart },
    },
  });

  if (recentTickets >= SUPPORT_RATE_LIMIT) {
    throw new SupportServiceError(
      "RATE_LIMIT",
      "Vous avez envoyé plusieurs demandes récemment. Réessayez dans une heure.",
    );
  }

  const reference = randomUUID();
  const category = getSupportCategory(request.category);
  const glpiTicket = await createGlpiTicket({
    subject: `[CESIZen · ${category.label}] ${request.subject}`,
    content: buildGlpiTicketContent(reference, request),
    categoryId: getGlpiCategoryId(glpiCategoryKeys[request.category]),
  });

  try {
    await db.supportTicket.create({
      data: {
        id: reference,
        glpiTicketId: glpiTicket.id,
        category: request.category,
        subject: request.subject,
        statusCode: glpiTicket.status,
        lastSyncedAt: new Date(),
        utilisateurId: normalizedUserId,
      },
    });
  } catch {
    console.error("Support ticket mapping failed", {
      glpiTicketId: glpiTicket.id,
      reference,
      userId: normalizedUserId,
    });
    throw new SupportServiceError(
      "PARTIAL_CREATION",
      `Le ticket GLPI #${glpiTicket.id} a été créé, mais son suivi CESIZen doit être rétabli par le support. Ne renvoyez pas la demande.`,
      glpiTicket.id,
    );
  }

  return { ticketNumber: glpiTicket.id };
}

export async function listSupportTicketsForUser(
  userId: string,
): Promise<SupportTicketView[]> {
  const localTickets = await db.supportTicket.findMany({
    where: { utilisateurId: userId },
    orderBy: { createdAt: "desc" },
    take: MAX_VISIBLE_TICKETS,
  });

  if (localTickets.length === 0) {
    return [];
  }

  if (!isGlpiConfigured()) {
    return localTickets.map((ticket) => toTicketView(ticket, true));
  }

  try {
    const remoteTickets = await getGlpiTickets(
      localTickets.map((ticket) => ticket.glpiTicketId),
    );
    const synchronizedAt = new Date();

    const synchronizedTickets = localTickets.map((ticket) => {
      const remoteTicket = remoteTickets.get(ticket.glpiTicketId);

      return remoteTicket
        ? {
            ...ticket,
            statusCode: remoteTicket.status,
            lastSyncedAt: synchronizedAt,
          }
        : ticket;
    });

    const updates = synchronizedTickets.filter((ticket, index) => {
      const previous = localTickets[index];
      return (
        previous !== undefined &&
        (ticket.statusCode !== previous.statusCode ||
          ticket.lastSyncedAt !== previous.lastSyncedAt)
      );
    });

    if (updates.length > 0) {
      await Promise.all(
        updates.map((ticket) =>
          db.supportTicket.updateMany({
            where: { id: ticket.id, utilisateurId: userId },
            data: {
              statusCode: ticket.statusCode,
              lastSyncedAt: ticket.lastSyncedAt,
            },
          }),
        ),
      ).catch(() => undefined);
    }

    return synchronizedTickets.map((ticket) => toTicketView(ticket, false));
  } catch {
    return localTickets.map((ticket) => toTicketView(ticket, true));
  }
}

type StoredSupportTicket = {
  id: string;
  glpiTicketId: number;
  category: SupportCategoryKey;
  subject: string;
  statusCode: number;
  lastSyncedAt: Date | null;
  createdAt: Date;
};

function toTicketView(
  ticket: StoredSupportTicket,
  syncFailed: boolean,
): SupportTicketView {
  const status = getGlpiStatus(ticket.statusCode);

  return {
    id: ticket.id,
    ticketNumber: ticket.glpiTicketId,
    subject: ticket.subject,
    category: ticket.category,
    statusCode: ticket.statusCode,
    statusLabel: status.label,
    statusDescription: getStatusDescription(ticket.statusCode),
    statusProgress: status.progress,
    statusTone: status.tone,
    createdAt: ticket.createdAt,
    lastSyncedAt: ticket.lastSyncedAt,
    syncFailed,
  };
}

function getStatusDescription(statusCode: number): string {
  switch (statusCode) {
    case 1:
      return "La demande a été reçue par le support.";
    case 10:
      return "La demande attend une approbation.";
    case 2:
      return "Un membre du support traite la demande.";
    case 3:
      return "Une intervention est planifiée.";
    case 4:
      return "Le traitement est temporairement en attente.";
    case 5:
      return "Une solution a été apportée.";
    case 6:
      return "La demande est terminée et clôturée.";
    default:
      return "Le statut sera précisé par le support.";
  }
}
