import type { NextRequest } from "next/server";

import {
  getDatabaseDiagnosticEventIds,
  mobileFallbackDiagnosticItems,
  resolveDiagnostic,
} from "@/lib/diagnostic";
import { db } from "@/server/db";

import {
  getMobileSession,
  jsonResponse,
  optionsResponse,
  unauthorizedResponse,
} from "../_utils";

const resultFallbacks = {
  faible: {
    slug: "resultat-stress-faible",
    label: "Risque faible",
    desc: "Votre niveau de stress actuel est considéré comme gérable par votre organisme.",
  },
  modere: {
    slug: "resultat-stress-modere",
    label: "Risque modéré",
    desc: "Prudence : votre niveau de changement de vie suggère une vulnérabilité face au stress.",
  },
  eleve: {
    slug: "resultat-stress-eleve",
    label: "Risque élevé",
    desc: "Votre score indique un niveau de stress important. Prenez le temps de demander de l'aide si besoin.",
  },
};

export async function OPTIONS(request: NextRequest) {
  return optionsResponse(request);
}

export async function GET(request: NextRequest) {
  const [events, resultPages] = await Promise.all([
    db.evenementStress
      .findMany({
        where: { isActif: true },
        orderBy: [{ points: "desc" }, { description: "asc" }],
        select: { id: true, description: true, points: true },
      })
      .catch(() => []),
    db.pageInfo
      .findMany({
        where: {
          isPublie: true,
          slug: { in: Object.values(resultFallbacks).map((item) => item.slug) },
        },
        select: { slug: true, titre: true, contenu: true },
      })
      .catch(() => []),
  ]);

  const findResultPage = (slug: string) =>
    resultPages.find((page) => page.slug === slug);

  return jsonResponse(request, {
    items:
      events.length > 0
        ? events.map((event) => ({
            id: event.id,
            label: event.description,
            points: event.points,
          }))
        : mobileFallbackDiagnosticItems,
    resultMessages: {
      faible: {
        label:
          findResultPage(resultFallbacks.faible.slug)?.titre ??
          resultFallbacks.faible.label,
        desc:
          findResultPage(resultFallbacks.faible.slug)?.contenu ??
          resultFallbacks.faible.desc,
      },
      modere: {
        label:
          findResultPage(resultFallbacks.modere.slug)?.titre ??
          resultFallbacks.modere.label,
        desc:
          findResultPage(resultFallbacks.modere.slug)?.contenu ??
          resultFallbacks.modere.desc,
      },
      eleve: {
        label:
          findResultPage(resultFallbacks.eleve.slug)?.titre ??
          resultFallbacks.eleve.label,
        desc:
          findResultPage(resultFallbacks.eleve.slug)?.contenu ??
          resultFallbacks.eleve.desc,
      },
    },
  });
}

export async function POST(request: NextRequest) {
  const session = await getMobileSession(request);

  if (!session?.user) {
    return unauthorizedResponse(request);
  }

  const body = (await request.json().catch(() => null)) as {
    score?: unknown;
    selectedEventIds?: unknown;
  } | null;

  if (!body || !Array.isArray(body.selectedEventIds)) {
    return jsonResponse(
      request,
      { error: "La liste des événements sélectionnés est invalide." },
      { status: 400 },
    );
  }

  const selectedEventIds = body.selectedEventIds;
  const requestedEventIds = getDatabaseDiagnosticEventIds(selectedEventIds);

  const activeEvents =
    requestedEventIds.length > 0
      ? await db.evenementStress.findMany({
          where: { id: { in: requestedEventIds }, isActif: true },
          select: { id: true, points: true },
        })
      : [];

  const diagnostic = resolveDiagnostic(
    selectedEventIds,
    activeEvents,
    mobileFallbackDiagnosticItems,
  );

  const result = await db.resultatDiagnostic.create({
    data: {
      scoreTotal: diagnostic.scoreTotal,
      niveauStress: diagnostic.niveauStress,
      utilisateurId: session.user.id,
      reponses:
        diagnostic.responseEventIds.length > 0
          ? {
              create: diagnostic.responseEventIds.map((eventId) => ({
                evenementId: eventId,
              })),
            }
          : undefined,
    },
    select: {
      id: true,
      scoreTotal: true,
      niveauStress: true,
      dateEvaluation: true,
    },
  });

  return jsonResponse(request, { result }, { status: 201 });
}
