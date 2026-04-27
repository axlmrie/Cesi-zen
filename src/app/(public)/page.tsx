import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans transition-colors duration-300">

      <main className="flex-grow">
        <section className="relative px-6 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-brand-light/10 -z-10 rounded-b-[4rem] md:rounded-b-[6rem]"></div>
          
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-brand-dark mb-6 max-w-3xl">
            L'application de votre <br />
            <span className="text-brand">santé mentale</span>
          </h1>
          
          {/* CORRECTION ICI : text-muted-foreground */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Évaluez votre niveau de stress, suivez vos émotions au quotidien et découvrez des exercices de respiration pour retrouver la sérénité.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/auth/inscription" 
              className="px-8 py-4 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-colors shadow-lg focus-visible:ring-4 focus-visible:ring-brand focus-visible:outline-none"
            >
              Créer mon compte
            </Link>
            {/* CORRECTION ICI : bg-card au lieu de bg-surface */}
            <Link 
              href="/informations" 
              className="px-8 py-4 bg-card text-foreground font-bold border-2 border-border rounded-xl hover:border-brand transition-colors focus-visible:ring-4 focus-visible:ring-brand focus-visible:outline-none"
            >
              En savoir plus
            </Link>
          </div>
        </section>

        {/* Section Modules (Cartes) */}
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Des outils pour votre bien-être
            </h2>
            {/* CORRECTION ICI : text-muted-foreground */}
            <p className="text-muted-foreground">Des méthodes reconnues pour vous accompagner chaque jour.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Carte Diagnostic */}
            {/* CORRECTION ICI : bg-card au lieu de bg-surface */}
            <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-institutional-light/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl" aria-hidden="true">📋</span>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3">Diagnostic de Stress</h3>
              {/* CORRECTION ICI : text-muted-foreground */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Évaluez votre charge mentale actuelle grâce à l'échelle de Holmes et Rahe, et obtenez des conseils personnalisés.
              </p>
              <Link href="/diagnostic" className="text-brand font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">
                Faire le test &rarr;
              </Link>
            </div>

            {/* Carte Tracker d'émotions */}
            {/* CORRECTION ICI : bg-card au lieu de bg-surface */}
            <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-zen-light/30 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl" aria-hidden="true">💛</span>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3">Journal d'Émotions</h3>
              {/* CORRECTION ICI : text-muted-foreground */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Identifiez et suivez vos émotions au fil du temps pour mieux comprendre ce qui influence votre humeur.
              </p>
              <Link href="/auth/connexion" className="text-zen-dark font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen rounded">
                Ouvrir mon journal &rarr;
              </Link>
            </div>

            {/* Carte Respiration */}
            {/* CORRECTION ICI : bg-card au lieu de bg-surface */}
            <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-brand-light/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl" aria-hidden="true">🌬️</span>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3">Cohérence Cardiaque</h3>
              {/* CORRECTION ICI : text-muted-foreground */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Des exercices de respiration guidés (méthode 5-5) pour faire baisser la pression rapidement et naturellement.
              </p>
              <Link href="/informations" className="text-brand font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">
                Découvrir l'exercice &rarr;
              </Link>
            </div>

          </div>
        </section>

        <section className="bg-institutional/10 border-y border-institutional/20 py-16 px-6 mt-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-2xl font-bold mb-4 text-foreground">
              Une initiative santé de confiance
            </h2>
            <p className="text-muted-foreground mb-8">
              CESIZen s'engage à protéger vos données personnelles. Toutes vos évaluations et journaux d'émotions sont strictement confidentiels.
            </p>
            <div className="inline-block bg-card border border-border text-foreground px-6 py-3 rounded-xl font-bold shadow-sm">
              Conforme RGPD
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}