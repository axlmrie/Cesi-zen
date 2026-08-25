import type { NextRequest } from "next/server";

import { cleanOptionalNote } from "@/lib/cesizen";
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

  const [emotions, entries] = await Promise.all([
    db.emotionNiveau1.findMany({
      include: { emotionsN2: { orderBy: { libelle: "asc" } } },
      orderBy: { libelle: "asc" },
    }),
    db.journalEmotion.findMany({
      where: { utilisateurId: session.user.id },
      include: { emotionN2: { include: { emotionN1: true } } },
      orderBy: { dateEnregistrement: "desc" },
      take: 20,
    }),
  ]);

  return jsonResponse(request, { emotions, entries });
}

export async function POST(request: NextRequest) {
  const session = await getMobileSession(request);

  if (!session?.user) {
    return unauthorizedResponse(request);
  }

  const body = (await request.json().catch(() => null)) as {
    emotionN2Id?: unknown;
    notePersonnelle?: unknown;
  } | null;

  if (typeof body?.emotionN2Id !== "string") {
    return jsonResponse(
      request,
      { error: "Sélectionnez une émotion avant d'enregistrer." },
      { status: 400 },
    );
  }

  const emotion = await db.emotionNiveau2.findUnique({
    where: { id: body.emotionN2Id },
    select: { id: true },
  });

  if (!emotion) {
    return jsonResponse(
      request,
      { error: "Émotion inconnue." },
      { status: 404 },
    );
  }

  const entry = await db.journalEmotion.create({
    data: {
      utilisateurId: session.user.id,
      emotionN2Id: body.emotionN2Id,
      notePersonnelle: cleanOptionalNote(
        typeof body.notePersonnelle === "string" ? body.notePersonnelle : "",
      ),
    },
    include: { emotionN2: { include: { emotionN1: true } } },
  });

  return jsonResponse(request, { entry }, { status: 201 });
}
