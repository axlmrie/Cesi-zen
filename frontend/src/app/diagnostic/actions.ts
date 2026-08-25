// src/app/diagnostic/actions.ts
"use server";

import { auth } from "@/server/better-auth/config";
import { headers } from "next/headers";
import { db } from "@/server/db";
import {
  getDatabaseDiagnosticEventIds,
  resolveDiagnostic,
  webFallbackDiagnosticItems,
} from "@/lib/diagnostic";

export async function saveDiagnosticScore(
  _scoreParams: number,
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
    const requestedEventIds = getDatabaseDiagnosticEventIds(selectedEventIds);
    const activeEvents =
      requestedEventIds.length > 0
        ? await db.evenementStress.findMany({
            where: {
              id: { in: requestedEventIds },
              isActif: true,
            },
            select: { id: true, points: true },
          })
        : [];

    const diagnostic = resolveDiagnostic(
      selectedEventIds,
      activeEvents,
      webFallbackDiagnosticItems,
    );

    await db.resultatDiagnostic.create({
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
    });
    return { success: true };
  } catch (error) {
    console.error("Erreur Prisma :", error);
    return { success: false, error: "Impossible de sauvegarder le résultat." };
  }
}
