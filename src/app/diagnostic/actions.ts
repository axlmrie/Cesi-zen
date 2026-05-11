// src/app/diagnostic/actions.ts
"use server";

import { auth } from "@/server/better-auth/config";
import { headers } from "next/headers";
import { db } from "@/server/db";

function determineNiveauStress(score: number): string {
  if (score >= 300) return "Élevé";
  if (score >= 150) return "Modéré";
  return "Faible";
}

export async function saveDiagnosticScore(
  scoreParams: number,
  selectedEventIds: string[] = [],
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Vous devez être connecté pour sauvegarder un résultat.");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { isActif: true },
  });

  if (!user?.isActif) {
    throw new Error("Votre compte est desactive.");
  }

  try {
    const activeEvents =
      selectedEventIds.length > 0
        ? await db.evenementStress.findMany({
            where: {
              id: { in: selectedEventIds },
              isActif: true,
            },
            select: { id: true, points: true },
          })
        : [];

    const score =
      activeEvents.length > 0
        ? activeEvents.reduce((sum, event) => sum + event.points, 0)
        : scoreParams;

    await db.resultatDiagnostic.create({
      data: {
        scoreTotal: score, 
        niveauStress: determineNiveauStress(score),
        utilisateurId: session.user.id,
        reponses:
          activeEvents.length > 0
            ? {
                create: activeEvents.map((event) => ({
                  evenementId: event.id,
                })),
              }
            : undefined,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Erreur Prisma :", error);
    return { success: false, error: "Impossible de sauvegarder le résultat." };
  }
}
