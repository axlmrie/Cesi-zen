import { UserWelcome } from "./_components/UserWelcome";
import { StatsOverview } from "./_components/StatsOverview";
import { QuickActions } from "./_components/QuickActions";

export default function DashboardPage() {
  return (
    <div className="container max-w-5xl mx-auto py-10 px-6">
      {/* En-tête de bienvenue */}
      <UserWelcome />

      {/* Résumé des indicateurs santé */}
      <StatsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Actions principales (Prend 2 colonnes sur 3) */}
        <div className="lg:col-span-2">
          <QuickActions />
        </div>

        {/* Section latérale : Conseil du jour */}
        <div className="space-y-6">
          <div className="bg-brand/5 border border-brand/20 p-6 rounded-3xl">
            <h3 className="font-bold text-brand-dark mb-2">Conseil du jour 🧘</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Saviez-vous que 5 minutes de cohérence cardiaque peuvent réduire votre taux de cortisol pendant 4 heures ? Essayez maintenant !
            </p>
          </div>
          
          <div className="bg-secondary/50 p-6 rounded-3xl border border-border">
            <h3 className="font-bold text-foreground mb-2">Historique récent</h3>
            <p className="text-xs text-muted-foreground italic">
              Aucune activité récente. Commencez par un diagnostic !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}