import "server-only";

import type { Prisma } from "../../generated/prisma";

import { db } from "@/server/db";

export const LAST_ACTIVE_ADMIN_ERROR_MESSAGE =
  "Impossible de retirer le dernier administrateur actif.";

const MAX_SERIALIZATION_RETRIES = 2;
const SERIALIZABLE_TRANSACTION_OPTIONS = {
  isolationLevel: "Serializable" as const,
};

export class LastActiveAdminError extends Error {
  constructor() {
    super(LAST_ACTIVE_ADMIN_ERROR_MESSAGE);
    this.name = "LastActiveAdminError";
  }
}

export function isLastActiveAdminError(
  error: unknown,
): error is LastActiveAdminError {
  return error instanceof LastActiveAdminError;
}

export async function assertUserCanLoseActiveAdminAccess(
  transaction: Prisma.TransactionClient,
  userId: string,
) {
  const target = await transaction.user.findUnique({
    where: { id: userId },
    select: { role: true, isActif: true },
  });

  if (target?.role !== "ADMIN" || !target.isActif) {
    return;
  }

  const otherActiveAdmins = await transaction.user.count({
    where: {
      id: { not: userId },
      role: "ADMIN",
      isActif: true,
    },
  });

  if (otherActiveAdmins === 0) {
    throw new LastActiveAdminError();
  }
}

function isSerializationConflict(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2034"
  );
}

export async function runSerializableTransaction<T>(
  operation: (transaction: Prisma.TransactionClient) => Promise<T>,
): Promise<T> {
  let retries = 0;

  while (true) {
    try {
      return await db.$transaction(operation, SERIALIZABLE_TRANSACTION_OPTIONS);
    } catch (error) {
      if (
        !isSerializationConflict(error) ||
        retries >= MAX_SERIALIZATION_RETRIES
      ) {
        throw error;
      }

      retries += 1;
    }
  }
}
