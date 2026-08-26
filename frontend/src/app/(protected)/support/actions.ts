"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

import {
  parseSupportRequest,
  type SupportActionState,
  type SupportRequest,
} from "@/lib/support";
import { auth } from "@/server/better-auth/config";
import { db } from "@/server/db";
import {
  createSupportTicketForUser,
  SupportServiceError,
} from "@/server/support";

export async function createSupportTicketAction(
  _previousState: SupportActionState,
  formData: FormData,
): Promise<SupportActionState> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return {
      status: "error",
      message: "Votre session a expiré. Veuillez vous reconnecter.",
    };
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { isActif: true },
  });

  if (!user?.isActif) {
    return {
      status: "error",
      message: "Votre compte ne permet pas d’envoyer une demande.",
    };
  }

  let request: SupportRequest;

  try {
    request = parseSupportRequest(formData);
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = error.flatten().fieldErrors;

      return {
        status: "error",
        message: "Vérifiez les informations saisies.",
        fieldErrors: {
          category: fieldErrors.category,
          subject: fieldErrors.subject,
          description: fieldErrors.description,
        },
      };
    }

    return {
      status: "error",
      message: "La demande n’a pas pu être validée.",
    };
  }

  try {
    const result = await createSupportTicketForUser(session.user.id, request);

    revalidatePath("/support");

    return {
      status: "success",
      ticketNumber: result.ticketNumber,
      message: `Votre demande GLPI #${result.ticketNumber} a bien été créée.`,
    };
  } catch (error) {
    if (error instanceof SupportServiceError) {
      return {
        status: "error",
        message: error.message,
        ticketNumber: error.ticketNumber,
      };
    }

    return {
      status: "error",
      message:
        "Le service de support est temporairement indisponible. Réessayez plus tard.",
    };
  }
}
