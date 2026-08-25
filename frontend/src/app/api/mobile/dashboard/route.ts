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

export async function GET(request: NextRequest) {
  const session = await getMobileSession(request);

  if (!session?.user) {
    return unauthorizedResponse(request);
  }

  const [diagnostics, journals, diagnosticsCount, journalEntriesCount] =
    await Promise.all([
      db.resultatDiagnostic.findMany({
        where: { utilisateurId: session.user.id },
        orderBy: { dateEvaluation: "desc" },
        take: 5,
      }),
      db.journalEmotion.findMany({
        where: { utilisateurId: session.user.id },
        include: { emotionN2: true },
        orderBy: { dateEnregistrement: "desc" },
        take: 5,
      }),
      db.resultatDiagnostic.count({
        where: { utilisateurId: session.user.id },
      }),
      db.journalEmotion.count({
        where: { utilisateurId: session.user.id },
      }),
    ]);

  return jsonResponse(request, {
    diagnostics,
    journals,
    stats: {
      diagnosticsCount,
      journalEntriesCount,
      latestStressScore: diagnostics[0]?.scoreTotal ?? null,
      latestStressLevel: diagnostics[0]?.niveauStress ?? null,
    },
  });
}
