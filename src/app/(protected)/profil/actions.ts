"use server";

import { auth } from "@/server/better-auth/config"; // Ajuste le chemin
import { headers } from "next/headers";
import { db } from "@/server/db"; // Ajuste le chemin vers Prisma

// 1. Mise à jour des informations
export async function updateUserProfile(data: { firstName: string; lastName: string; age: number }) {
  // SÉCURITÉ 1 : On récupère l'identité réelle depuis le cookie crypté du serveur
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user) {
    throw new Error("Action non autorisée. Veuillez vous connecter.");
  }

  try {
    // SÉCURITÉ 2 : La clause "where" utilise l'ID de la session, JAMAIS un ID envoyé par le front.
    // Impossible de modifier le compte d'un autre.
    await db.user.update({
      where: { id: session.user.id }, 
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        name: `${data.firstName} ${data.lastName}`, // On maintient le champ Better Auth à jour
        age: data.age,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur de mise à jour du profil :", error);
    return { success: false, error: "Impossible de mettre à jour le profil." };
  }
}

// 2. Suppression de compte (Soft Delete / RGPD)
export async function softDeleteAccount() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Action non autorisée.");

  try {
    // On passe le compte en "inactif" pour respecter le schéma (Soft-delete)
    await db.user.update({
      where: { id: session.user.id },
      data: { isActif: false },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Impossible de supprimer le compte." };
  }
}