import { headers } from "next/headers";
import { auth } from "@/server/better-auth/config";
import { db } from "@/server/db";

import { UserWelcome } from "./_components/UserWelcome";
import { StatsOverview } from "./_components/StatsOverview";
import { QuickActions } from "./_components/QuickActions";
import { RecentHistory, type HistoryItem } from "./_components/RecentHistory";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return null;
  }

  const diagnostics = await db.resultatDiagnostic.findMany({
    where: { utilisateurId: session.user.id },
    orderBy: { dateEvaluation: "desc" },
    take: 3,
  });

  const journals = await db.journalEmotion
    .findMany({
      where: { utilisateurId: session.user.id },
      include: { emotionN2: true },
      orderBy: { dateEnregistrement: "desc" },
      take: 3,
    })
    .catch(() => []);

  const historyItems: HistoryItem[] = [
    ...diagnostics.map((d) => ({
      id: d.id,
      type: "diagnostic" as const,
      title: "Diagnostic de stress",
      desc: `Score: ${d.scoreTotal} pts (${d.niveauStress})`,
      date: d.dateEvaluation,
    })),
    ...journals.map((j) => ({
      id: j.id,
      type: "journal" as const,
      title: "Note de journal",
      desc: j.emotionN2?.libelle ?? "Nouvelle entrée",
      date: j.dateEnregistrement,
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 4);

  return (
    <div className="animate-in fade-in mx-auto max-w-5xl px-4 py-6 duration-500 sm:px-6 sm:py-10 lg:px-8">
      <UserWelcome />

      <StatsOverview />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="min-w-0 lg:col-span-2">
          <QuickActions />
        </div>

        <div className="min-w-0 space-y-6">
          <div className="border-brand/20 bg-brand/5 rounded-3xl border p-5 shadow-sm sm:p-6">
            <h3 className="text-brand-dark mb-2 font-bold">
              Conseil du jour 🧘
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Saviez-vous que 5 minutes de cohérence cardiaque peuvent réduire
              votre taux de cortisol pendant 4 heures ? Essayez maintenant !
            </p>
          </div>
          <RecentHistory items={historyItems} />
        </div>
      </div>
    </div>
  );
}
