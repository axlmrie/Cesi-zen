import { headers } from "next/headers";
import { auth } from "@/server/better-auth/config";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { EmotionTracker } from "./_components/EmotionTracker";
// 1. On importe le nouveau composant
import { JournalLivre } from "./_components/JournalLivre"; 

export default async function JournalPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/connexion");

  const emotionsTree = await db.emotionNiveau1.findMany({
    include: { emotionsN2: true },
  });

  // 2. On récupère TOUT l'historique (on enlève le "take: 10")
  const historique = await db.journalEmotion.findMany({
    where: { utilisateurId: session.user.id },
    include: {
      emotionN2: {
        include: { emotionN1: true }
      }
    },
    orderBy: { dateEnregistrement: "desc" },
  });

  return (
    <div className="container max-w-6xl mx-auto py-10 px-6">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-heading font-bold text-foreground">Mon Journal</h1>
        <p className="text-muted-foreground mt-1">Identifiez et suivez vos émotions au quotidien.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* GAUCHE : L'outil pour ajouter une émotion */}
        <div>
          {emotionsTree.length > 0 ? (
            <EmotionTracker emotions={emotionsTree} />
          ) : (
            <div className="bg-destructive/10 text-destructive p-6 rounded-2xl border border-destructive/20 text-center">
              La base de données des émotions est vide.
            </div>
          )}
        </div>

        {/* DROITE : Le Livre Interactif */}
        <div className="h-full">
           <JournalLivre entrees={historique} />
        </div>
        
      </div>
    </div>
  );
}