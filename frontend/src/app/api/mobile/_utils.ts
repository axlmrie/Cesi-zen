import { NextResponse, type NextRequest } from "next/server";

import { auth } from "@/server/better-auth/config";

export function corsHeaders(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "*";

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Cookie, Authorization",
    Vary: "Origin",
  };
}

export function jsonResponse<T>(
  request: NextRequest,
  body: T,
  init?: ResponseInit,
) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      ...corsHeaders(request),
      ...init?.headers,
    },
  });
}

export function optionsResponse(request: NextRequest) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}

export async function getMobileSession(request: NextRequest) {
  return auth.api.getSession({ headers: request.headers });
}

export function unauthorizedResponse(request: NextRequest) {
  return jsonResponse(
    request,
    { error: "Vous devez être connecté pour accéder à cette ressource." },
    { status: 401 },
  );
}
