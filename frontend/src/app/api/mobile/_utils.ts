import { NextResponse, type NextRequest } from "next/server";

import { auth } from "@/server/better-auth/config";
import { db } from "@/server/db";
import {
  getAllowedMobileBrowserOrigin,
  isMobileRequestOriginAllowed,
} from "@/server/mobile-origins";

const allowedMethods = "GET,POST,DELETE,OPTIONS";
const allowedHeaders = "Content-Type, Cookie, Authorization";

export function corsHeaders(request: NextRequest): Record<string, string> {
  const origin = getAllowedMobileBrowserOrigin(request.headers.get("origin"));

  return origin
    ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": allowedMethods,
        "Access-Control-Allow-Headers": allowedHeaders,
        Vary: "Origin",
      }
    : { Vary: "Origin" };
}

export function jsonResponse<T>(
  request: NextRequest,
  body: T,
  init?: ResponseInit,
) {
  const responseHeaders = new Headers(corsHeaders(request));

  new Headers(init?.headers).forEach((value, key) => {
    responseHeaders.set(key, value);
  });

  return NextResponse.json(body, {
    ...init,
    headers: responseHeaders,
  });
}

export function optionsResponse(request: NextRequest) {
  if (!isMobileRequestOriginAllowed(request.headers.get("origin"))) {
    return new Response(null, {
      status: 403,
      headers: { Vary: "Origin" },
    });
  }

  return new Response(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}

export async function getMobileSession(request: NextRequest) {
  if (!isMobileRequestOriginAllowed(request.headers.get("origin"))) {
    return null;
  }

  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { isActif: true },
  });

  return user?.isActif ? session : null;
}

export function unauthorizedResponse(request: NextRequest) {
  return jsonResponse(
    request,
    { error: "Vous devez être connecté pour accéder à cette ressource." },
    { status: 401 },
  );
}
