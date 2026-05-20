import type { NextRequest } from "next/server";

import { determineStressLevel } from "@/lib/cesizen";
import { db } from "@/server/db";

import {
  getMobileSession,
  jsonResponse,
  optionsResponse,
  unauthorizedResponse,
} from "../_utils";

const fallbackItems = [
  { id: "fallback-1", label: "Décès du conjoint", points: 100 },
  { id: "fallback-2", label: "Divorce", points: 73 },
  { id: "fallback-3", label: "Séparation conjugale", points: 65 },
  { id: "fallback-4", label: "Décès d'un proche parent", points: 63 },
  { id: "fallback-5", label: "Maladie ou accident personnel", points: 53 },
  { id: "fallback-6", label: "Mariage", points: 50 },
  { id: "fallback-7", label: "Licenciement professionnel", points: 47 },
  { id: "fallback-8", label: "Retraite", points: 45 },
  { id: "fallback-9", label: "Grossesse", points: 40 },
  { id: "fallback-10", label: "Changement de situation financière", points: 38 },
  { id: "fallback-11", label: "Mort d'un ami proche", points: 37 },
  { id: "fallback-12", label: "Déménagement", points: 20 },
];

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
        : fallbackItems,
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

  const rawSelectedIds = Array.isArray(body?.selectedEventIds)
    ? body.selectedEventIds.filter((id): id is string => typeof id === "string")
    : [];

  const activeEvents =
    rawSelectedIds.length > 0
      ? await db.evenementStress.findMany({
          where: { id: { in: rawSelectedIds }, isActif: true },
          select: { id: true, points: true },
        })
      : [];

  const fallbackScore = Number(body?.score ?? 0);
  const score =
    activeEvents.length > 0
      ? activeEvents.reduce((sum, event) => sum + event.points, 0)
      : fallbackScore;

  if (!Number.isFinite(score) || score < 0) {
    return jsonResponse(request, { error: "Score invalide." }, { status: 400 });
  }

  const result = await db.resultatDiagnostic.create({
    data: {
      scoreTotal: score,
      niveauStress: determineStressLevel(score),
      utilisateurId: session.user.id,
      reponses:
        activeEvents.length > 0
          ? {
              create: activeEvents.map((event) => ({ evenementId: event.id })),
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
