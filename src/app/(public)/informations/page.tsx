import { Brain, Wind, Heart, ShieldAlert } from "lucide-react";

export default function InformationPage() {
  return (
    <div className="min-h-screen bg-background">      
      <main className="max-w-4xl mx-auto py-16 px-6">
        <header className="text-center mb-16">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
            Comprendre pour mieux <span className="text-brand">agir</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Découvrez les fondements scientifiques de CESIZen et apprenez à maîtriser votre équilibre mental.
          </p>
        </header>

        <div className="space-y-16">
          
          <section className="scroll-mt-20" id="stress">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-brand/10 rounded-2xl">
                <Brain className="h-8 w-8 text-brand" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground">Le mécanisme du stress</h2>
            </div>
            <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
              <p>
                Le stress est une réaction biologique d'adaptation. Notre application utilise l'<b>Échelle de Holmes et Rahe</b>, un outil reconnu qui permet de quantifier l'impact des changements de vie sur votre santé.
              </p>
              <div className="bg-card border border-border p-6 rounded-2xl">
                <h4 className="font-bold text-foreground mb-2 italic">Le saviez-vous ?</h4>
                <p className="text-sm">Un score élevé sur cette échelle indique une probabilité statistiquement plus forte de développer des troubles de santé dans les deux ans. Le diagnostic CESIZen vous aide à anticiper cette vulnérabilité.</p>
              </div>
            </div>
          </section>

          <section className="scroll-mt-20" id="respiration">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-brand/10 rounded-2xl">
                <Wind className="h-8 w-8 text-brand" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground">La Cohérence Cardiaque</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-muted-foreground space-y-4">
                <p>
                  C'est une pratique respiratoire simple qui permet de réguler le système nerveux autonome. La méthode phare est le <b>3-6-5</b>.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">✅ <strong>3 fois par jour :</strong> Pour une couverture hormonale totale.</li>
                  <li className="flex gap-2">✅ <strong>6 respirations/min :</strong> Le rythme de résonance du cœur.</li>
                  <li className="flex gap-2">✅ <strong>5 minutes :</strong> Pour faire chuter le cortisol durablement.</li>
                </ul>
              </div>
              <div className="bg-brand text-white p-8 rounded-3xl text-center shadow-xl shadow-brand/20">
                <span className="text-5xl font-bold">5 / 5</span>
                <p className="mt-2 font-medium">5 secondes d'inspiration<br/>5 secondes d'expiration</p>
              </div>
            </div>
          </section>

          <section className="scroll-mt-20" id="emotions">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-brand/10 rounded-2xl">
                <Heart className="h-8 w-8 text-brand" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground">Le Journal d'Émotions</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Identifier ses émotions est la première étape de la régulation. Notre tracker s'appuie sur la <b>roue des émotions de Plutchik</b>, classant les ressentis en familles pour vous aider à développer votre "granularité émotionnelle".
            </p>
          </section>

          <section className="bg-destructive/5 border border-destructive/20 p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-4 text-destructive">
              <ShieldAlert className="h-6 w-6" />
              <h2 className="font-heading text-xl font-bold">Aide immédiate</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Si vous traversez une crise ou avez des pensées sombres, CESIZen n'est pas suffisant. Contactez des professionnels immédiatement.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white px-4 py-2 rounded-lg border border-border font-bold text-foreground">3114 (Numéro National)</div>
              <div className="bg-white px-4 py-2 rounded-lg border border-border font-bold text-foreground">15 (Urgences)</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}