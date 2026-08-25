import type { NextRequest } from "next/server";

import { db } from "@/server/db";

import { jsonResponse, optionsResponse } from "../_utils";

export async function OPTIONS(request: NextRequest) {
  return optionsResponse(request);
}

export async function GET(request: NextRequest) {
  const pages = await db.pageInfo.findMany({
    where: { isPublie: true },
    orderBy: [{ dateMaj: "desc" }, { titre: "asc" }],
    select: {
      id: true,
      titre: true,
      slug: true,
      contenu: true,
      dateMaj: true,
    },
  });

  return jsonResponse(request, { pages });
}
