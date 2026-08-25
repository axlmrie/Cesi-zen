"use server";

import { auth } from "@/server/better-auth/config";
import { headers } from "next/headers";
import { db } from "@/server/db";
import { cleanOptionalNote } from "@/lib/cesizen";

export async function saveJournalEntry(
  emotionN2Id: string,
  notePersonnelle: string,
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Action non autorisée.");
  }

  try {
    await db.journalEmotion.create({
      data: {
        utilisateurId: session.user.id,
        emotionN2Id,
        notePersonnelle: cleanOptionalNote(notePersonnelle),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur Prisma (Journal) :", error);
    return { success: false, error: "Impossible de sauvegarder votre entrée." };
  }
}
