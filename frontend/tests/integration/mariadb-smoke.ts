import { randomUUID } from "node:crypto";

import { PrismaClient } from "../../generated/prisma";

const db = new PrismaClient();
const suffix = randomUUID();
const userId = `smoke-user-${suffix}`;
const sessionId = `smoke-session-${suffix}`;
const accountId = `smoke-account-${suffix}`;
const verificationId = `smoke-verification-${suffix}`;
const supportTicketId = `smoke-support-${suffix}`;
const glpiTicketId = Number.parseInt(
  suffix.replaceAll("-", "").slice(0, 7),
  16,
);
const longValue = "m".repeat(512);

async function main() {
  try {
    await db.$transaction(
      async (transaction) => {
        await transaction.user.create({
          data: {
            id: userId,
            name: "MariaDB smoke test",
            email: `${suffix}@mariadb-smoke.invalid`,
            emailVerified: false,
            firstName: "MariaDB",
            lastName: "Smoke",
          },
        });

        await transaction.session.create({
          data: {
            id: sessionId,
            expiresAt: new Date(Date.now() + 60_000),
            token: `smoke-token-${suffix}`,
            userAgent: longValue,
            userId,
          },
        });

        await transaction.account.create({
          data: {
            id: accountId,
            accountId: `credential-${suffix}`,
            providerId: "credential",
            userId,
            accessToken: longValue,
            refreshToken: longValue,
            idToken: longValue,
            scope: longValue,
            password: longValue,
          },
        });

        await transaction.verification.create({
          data: {
            id: verificationId,
            identifier: `smoke-${suffix}`,
            value: longValue,
            expiresAt: new Date(Date.now() + 60_000),
          },
        });

        await transaction.supportTicket.create({
          data: {
            id: supportTicketId,
            glpiTicketId,
            category: "TECHNICAL",
            subject: "MariaDB support-ticket smoke test",
            utilisateurId: userId,
          },
        });
      },
      { isolationLevel: "Serializable" },
    );

    const [session, account, verification] = await Promise.all([
      db.session.findUniqueOrThrow({ where: { id: sessionId } }),
      db.account.findUniqueOrThrow({ where: { id: accountId } }),
      db.verification.findUniqueOrThrow({ where: { id: verificationId } }),
    ]);

    if (
      session.userAgent?.length !== longValue.length ||
      account.accessToken?.length !== longValue.length ||
      account.refreshToken?.length !== longValue.length ||
      account.idToken?.length !== longValue.length ||
      account.scope?.length !== longValue.length ||
      account.password?.length !== longValue.length ||
      verification.value.length !== longValue.length
    ) {
      throw new Error("MariaDB altered a Better Auth long text value.");
    }

    await db.user.delete({ where: { id: userId } });

    const [remainingSessions, remainingAccounts, remainingSupportTickets] =
      await Promise.all([
        db.session.count({ where: { userId } }),
        db.account.count({ where: { userId } }),
        db.supportTicket.count({ where: { utilisateurId: userId } }),
      ]);

    if (
      remainingSessions !== 0 ||
      remainingAccounts !== 0 ||
      remainingSupportTickets !== 0
    ) {
      throw new Error("MariaDB did not apply the expected cascade deletes.");
    }

    console.log("MariaDB Prisma smoke test passed.");
  } finally {
    await db.verification.deleteMany({ where: { id: verificationId } });
    await db.user.deleteMany({ where: { id: userId } });
    await db.$disconnect();
  }
}

await main();
