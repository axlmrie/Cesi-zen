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

export async function saveDiagnosticScore(scoreParams: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Vous devez être connecté pour sauvegarder un résultat.");
  }

  try {
    await db.resultatDiagnostic.create({
      data: {
        scoreTotal: scoreParams, 
        niveauStress: determineNiveauStress(scoreParams),
        utilisateurId: session.user.id,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Erreur Prisma :", error);
    return { success: false, error: "Impossible de sauvegarder le résultat." };
  }
}