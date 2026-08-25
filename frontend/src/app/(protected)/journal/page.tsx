import { headers } from "next/headers";
import { auth } from "@/server/better-auth/config";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { EmotionTracker } from "./_components/EmotionTracker";
// 1. On importe le nouveau composant
import { JournalLivre } from "./_components/JournalLivre";

export default async function JournalPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/auth/connexion");
  }

  const emotionsTree = await db.emotionNiveau1.findMany({
    include: { emotionsN2: true },
  });

  // 2. On récupère TOUT l'historique (on enlève le "take: 10")
  const historique = await db.journalEmotion.findMany({
    where: { utilisateurId: session.user.id },
    include: {
      emotionN2: {
        include: { emotionN1: true },
      },
    },
    orderBy: { dateEnregistrement: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="font-heading text-foreground text-2xl font-bold sm:text-3xl">
          Mon Journal
        </h1>
        <p className="text-muted-foreground mt-1">
          Identifiez et suivez vos émotions au quotidien.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {/* GAUCHE : L'outil pour ajouter une émotion */}
        <div className="min-w-0">
          {emotionsTree.length > 0 ? (
            <EmotionTracker emotions={emotionsTree} />
          ) : (
            <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-2xl border p-6 text-center">
              La base de données des émotions est vide.
            </div>
          )}
        </div>

        {/* DROITE : Le Livre Interactif */}
        <div className="min-w-0 lg:h-full">
          <JournalLivre entrees={historique} />
        </div>
      </div>
    </div>
  );
}
