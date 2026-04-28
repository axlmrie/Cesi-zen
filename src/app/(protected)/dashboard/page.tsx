import { headers } from "next/headers";
import { auth } from "@/server/better-auth/config";
import { db } from "@/server/db"; 

import { UserWelcome } from "./_components/UserWelcome";
import { StatsOverview } from "./_components/StatsOverview";
import { QuickActions } from "./_components/QuickActions";
import { RecentHistory, type HistoryItem } from "./_components/RecentHistory";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user) return null; 

  const diagnostics = await db.resultatDiagnostic.findMany({
    where: { utilisateurId: session.user.id },
    orderBy: { dateEvaluation: 'desc' },
    take: 3,
  });

  const journals = await db.journalEmotion.findMany({
    where: { utilisateurId: session.user.id },
    include: { emotionN2: true }, 
    orderBy: { dateEnregistrement: 'desc' },
    take: 3,
  }).catch(() => []); 

  const historyItems: HistoryItem[] = [
    ...diagnostics.map(d => ({
      id: d.id,
      type: "diagnostic" as const,
      title: "Diagnostic de stress",
      desc: `Score: ${d.scoreTotal} pts (${d.niveauStress})`,
      date: d.dateEvaluation,
    })),
    ...journals.map(j => ({
      id: j.id,
      type: "journal" as const,
      title: "Note de journal",
      desc: j.emotionN2?.libelle || "Nouvelle entrée",
      date: j.dateEnregistrement,
    }))
  ]
  .sort((a, b) => b.date.getTime() - a.date.getTime())
  .slice(0, 4);

  return (
    <div className="container max-w-5xl mx-auto py-10 px-6 animate-in fade-in duration-500">
      <UserWelcome />

      <StatsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>

        <div className="space-y-6">
          <div className="bg-brand/5 border border-brand/20 p-6 rounded-3xl shadow-sm">
            <h3 className="font-bold text-brand-dark mb-2">Conseil du jour 🧘</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Saviez-vous que 5 minutes de cohérence cardiaque peuvent réduire votre taux de cortisol pendant 4 heures ? Essayez maintenant !
            </p>
          </div>
          <RecentHistory items={historyItems} />
          
        </div>
      </div>
    </div>
  );
}