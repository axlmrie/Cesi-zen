import type { NextRequest } from "next/server";

import { db } from "@/server/db";

import { jsonResponse, optionsResponse } from "../_utils";

const fallbackExercices = [
  {
    id: "coherence-5-5",
    titre: "Cohérence cardiaque 5-5",
    inspirationSec: 5,
    retenueSec: 0,
    expirationSec: 5,
  },
  {
    id: "carre-4-4-4",
    titre: "Respiration carrée",
    inspirationSec: 4,
    retenueSec: 4,
    expirationSec: 4,
  },
];

export async function OPTIONS(request: NextRequest) {
  return optionsResponse(request);
}

export async function GET(request: NextRequest) {
  const exercices = await db.exerciceRespiration
    .findMany({
      where: { isCustom: false },
      orderBy: { titre: "asc" },
      select: {
        id: true,
        titre: true,
        inspirationSec: true,
        retenueSec: true,
        expirationSec: true,
      },
    })
    .catch(() => []);

  return jsonResponse(request, {
    exercices: exercices.length > 0 ? exercices : fallbackExercices,
  });
}
