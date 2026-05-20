import { db } from "@/server/db";
import { RespirationExercice } from "./_components/RespirationExercice";

export default async function RespirationPage() {
  const exercicesFromDB = await db.exerciceRespiration.findMany({
    where: { isCustom: false },
    orderBy: { titre: "asc" },
  });

  return (
    <main>
      <RespirationExercice exercices={exercicesFromDB} />
    </main>
  );
}
