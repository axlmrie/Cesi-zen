"use server";

import { auth } from "@/server/better-auth/config";
import { headers } from "next/headers";
import { db } from "@/server/db";

export async function saveJournalEntry(emotionN2Id: string, notePersonnelle: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user) {
    throw new Error("Action non autorisée.");
  }

  try {
    await db.journalEmotion.create({
      data: {
        utilisateurId: session.user.id,
        emotionN2Id: emotionN2Id,
        // On n'enregistre la note que si elle n'est pas vide
        notePersonnelle: notePersonnelle.trim() !== "" ? notePersonnelle : null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur Prisma (Journal) :", error);
    return { success: false, error: "Impossible de sauvegarder votre entrée." };
  }
}