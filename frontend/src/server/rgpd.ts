import "server-only";

import { buildRgpdAnonymizedUserData } from "@/lib/cesizen";
import {
  assertUserCanLoseActiveAdminAccess,
  runSerializableTransaction,
} from "@/server/active-admin";

export function deleteAndAnonymizeUserAccount(userId: string) {
  const anonymizedUserData = buildRgpdAnonymizedUserData(userId);

  return runSerializableTransaction(async (transaction) => {
    await assertUserCanLoseActiveAdminAccess(transaction, userId);

    await transaction.journalEmotion.deleteMany({
      where: { utilisateurId: userId },
    });
    await transaction.reponseDiagnostic.deleteMany({
      where: { resultat: { utilisateurId: userId } },
    });
    await transaction.resultatDiagnostic.deleteMany({
      where: { utilisateurId: userId },
    });
    await transaction.session.deleteMany({ where: { userId } });
    await transaction.account.deleteMany({ where: { userId } });

    return transaction.user.update({
      where: { id: userId },
      data: anonymizedUserData,
    });
  });
}
