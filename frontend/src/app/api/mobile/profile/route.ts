import type { NextRequest } from "next/server";

import { db } from "@/server/db";

import {
  getMobileSession,
  jsonResponse,
  optionsResponse,
  unauthorizedResponse,
} from "../_utils";

export async function OPTIONS(request: NextRequest) {
  return optionsResponse(request);
}

export async function DELETE(request: NextRequest) {
  const session = await getMobileSession(request);

  if (!session?.user) {
    return unauthorizedResponse(request);
  }

  const anonymizedEmail = `deleted-${session.user.id}@deleted.local`;

  await db.$transaction([
    db.journalEmotion.deleteMany({
      where: { utilisateurId: session.user.id },
    }),
    db.reponseDiagnostic.deleteMany({
      where: { resultat: { utilisateurId: session.user.id } },
    }),
    db.resultatDiagnostic.deleteMany({
      where: { utilisateurId: session.user.id },
    }),
    db.session.deleteMany({
      where: { userId: session.user.id },
    }),
    db.account.deleteMany({
      where: { userId: session.user.id },
    }),
    db.user.update({
      where: { id: session.user.id },
      data: {
        name: "Compte supprimé",
        email: anonymizedEmail,
        emailVerified: false,
        image: null,
        firstName: "Compte",
        lastName: "Supprimé",
        age: null,
        isActif: false,
        dateConsentement: null,
      },
    }),
  ]);

  return jsonResponse(request, {
    success: true,
    message: "Votre compte a été anonymisé et vos données personnelles ont été supprimées.",
  });
}
