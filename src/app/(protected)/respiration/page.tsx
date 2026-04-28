import { headers } from "next/headers";
import { auth } from "@/server/better-auth/config";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { RespirationExercice } from "./_components/RespirationExercice";

export default async function RespirationPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/connexion");


  const exercicesFromDB = await db.exerciceRespiration.findMany({
    where: {
      OR: [
        { isCustom: false },
        { createurId: session.user.id }
      ]
    },
    orderBy: { titre: 'asc' }
  });

  return (
    <main>
      <RespirationExercice exercices={exercicesFromDB} />
    </main>
  );
}