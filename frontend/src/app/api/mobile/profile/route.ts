import type { NextRequest } from "next/server";

import { isLastActiveAdminError } from "@/server/active-admin";
import { deleteAndAnonymizeUserAccount } from "@/server/rgpd";

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

  try {
    await deleteAndAnonymizeUserAccount(session.user.id);
  } catch (error) {
    if (isLastActiveAdminError(error)) {
      return jsonResponse(request, { error: error.message }, { status: 409 });
    }

    throw error;
  }

  return jsonResponse(request, {
    success: true,
    message:
      "Votre compte a été anonymisé et vos données personnelles ont été supprimées.",
  });
}
