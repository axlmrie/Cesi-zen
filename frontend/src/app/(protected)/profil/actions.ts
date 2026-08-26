"use server";

import { auth } from "@/server/better-auth/config"; // Ajuste le chemin
import { headers } from "next/headers";
import { db } from "@/server/db"; // Ajuste le chemin vers Prisma
import { getErrorMessage, validateProfileUpdate } from "@/lib/cesizen";
import { deleteAndAnonymizeUserAccount } from "@/server/rgpd";

// 1. Mise à jour des informations
export async function updateUserProfile(data: {
  firstName: string;
  lastName: string;
  age: number;
}) {
  // SÉCURITÉ 1 : On récupère l'identité réelle depuis le cookie crypté du serveur
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Action non autorisée. Veuillez vous connecter.");
  }

  try {
    const profile = validateProfileUpdate(data);

    // SÉCURITÉ 2 : La clause "where" utilise l'ID de la session, JAMAIS un ID envoyé par le front.
    // Impossible de modifier le compte d'un autre.
    await db.user.update({
      where: { id: session.user.id },
      data: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        name: profile.name, // On maintient le champ Better Auth à jour
        age: profile.age,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur de mise à jour du profil :", error);
    return {
      success: false,
      error: getErrorMessage(error, "Impossible de mettre à jour le profil."),
    };
  }
}

// 2. Suppression de compte (Soft Delete / RGPD)
export async function softDeleteAccount() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Action non autorisée.");
  }

  try {
    await deleteAndAnonymizeUserAccount(session.user.id);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Impossible de supprimer le compte."),
    };
  }
}
// Ajoute ceci à ton fichier actions.ts existant
export async function changeUserPassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Action non autorisée.");
  }

  try {
    // On utilise l'API interne de Better Auth pour changer le mot de passe
    // Cela vérifie automatiquement l'ancien mot de passe avant de mettre le nouveau
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: true, // Sécurité : déconnecte les autres appareils
      },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(
        error,
        "Erreur lors du changement de mot de passe.",
      ),
    };
  }
}

export async function exportUserData() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Non autorisé");
  }

  // On récupère TOUTES les données liées à l'utilisateur
  const data = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      resultatsDiagnostic: true,
      journalEmotions: true,
      supportTickets: true,
    },
  });

  return { success: true, data };
}

// 2. Suppression du compte (Droit à l'effacement)
export async function deleteUserAccount() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Non autorisé");
  }

  try {
    await deleteAndAnonymizeUserAccount(session.user.id);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Erreur lors de la suppression."),
    };
  }
}
