import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col font-sans transition-colors duration-300">
      <main className="flex-grow">
        <section className="relative flex flex-col items-center overflow-hidden px-4 py-16 text-center sm:px-6 sm:py-20 md:py-28">
          <div className="bg-brand-light/10 absolute inset-0 -z-10 rounded-b-[4rem] md:rounded-b-[6rem]"></div>

          <h1 className="font-heading text-brand-dark mb-6 max-w-3xl text-3xl font-bold text-balance sm:text-4xl md:text-6xl">
            L'application de votre Test Ajout<br />
            <span className="text-brand">santé mentale</span>
          </h1>

          {/* CORRECTION ICI : text-muted-foreground */}
          <p className="text-muted-foreground mb-8 max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl">
            Évaluez votre niveau de stress, suivez vos émotions au quotidien et
            découvrez des exercices de respiration pour retrouver la sérénité.
          </p>

          <div className="flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/auth/inscription"
              className="bg-brand hover:bg-brand-dark focus-visible:ring-brand rounded-xl px-8 py-4 text-center font-bold text-white shadow-lg transition-colors focus-visible:ring-4 focus-visible:outline-none"
            >
              Créer mon compte
            </Link>
            {/* CORRECTION ICI : bg-card au lieu de bg-surface */}
            <Link
              href="/informations"
              className="border-border bg-card text-foreground hover:border-brand focus-visible:ring-brand rounded-xl border-2 px-8 py-4 text-center font-bold transition-colors focus-visible:ring-4 focus-visible:outline-none"
            >
              En savoir plus
            </Link>
          </div>
        </section>

        {/* Section Modules (Cartes) */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 text-center sm:mb-14 md:mb-16">
            <h2 className="font-heading text-foreground mb-4 text-2xl font-bold text-balance sm:text-3xl md:text-4xl">
              Des outils pour votre bien-être
            </h2>
            {/* CORRECTION ICI : text-muted-foreground */}
            <p className="text-muted-foreground text-sm sm:text-base">
              Des méthodes reconnues pour vous accompagner chaque jour.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {/* Carte Diagnostic */}
            {/* CORRECTION ICI : bg-card au lieu de bg-surface */}
            <div className="border-border bg-card rounded-3xl border p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
              <div className="bg-institutional-light/20 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
                <span className="text-2xl" aria-hidden="true">
                  📋
                </span>
              </div>
              <h3 className="font-heading mb-3 text-2xl font-bold">
                Diagnostic de Stress
              </h3>
              {/* CORRECTION ICI : text-muted-foreground */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Évaluez votre charge mentale actuelle grâce à l'échelle de
                Holmes et Rahe, et obtenez des conseils personnalisés.
              </p>
              <Link
                href="/diagnostic"
                className="text-brand focus-visible:ring-brand rounded font-bold hover:underline focus-visible:ring-2 focus-visible:outline-none"
              >
                Faire le test &rarr;
              </Link>
            </div>

            {/* Carte Tracker d'émotions */}
            {/* CORRECTION ICI : bg-card au lieu de bg-surface */}
            <div className="border-border bg-card rounded-3xl border p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
              <div className="bg-zen-light/30 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
                <span className="text-2xl" aria-hidden="true">
                  💛
                </span>
              </div>
              <h3 className="font-heading mb-3 text-2xl font-bold">
                Journal d'Émotions
              </h3>
              {/* CORRECTION ICI : text-muted-foreground */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Identifiez et suivez vos émotions au fil du temps pour mieux
                comprendre ce qui influence votre humeur.
              </p>
              <Link
                href="/auth/connexion"
                className="text-zen-dark focus-visible:ring-zen rounded font-bold hover:underline focus-visible:ring-2 focus-visible:outline-none"
              >
                Ouvrir mon journal &rarr;
              </Link>
            </div>

            {/* Carte Respiration */}
            {/* CORRECTION ICI : bg-card au lieu de bg-surface */}
            <div className="border-border bg-card rounded-3xl border p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
              <div className="bg-brand-light/20 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
                <span className="text-2xl" aria-hidden="true">
                  🌬️
                </span>
              </div>
              <h3 className="font-heading mb-3 text-2xl font-bold">
                Cohérence Cardiaque
              </h3>
              {/* CORRECTION ICI : text-muted-foreground */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Des exercices de respiration guidés (méthode 5-5) pour faire
                baisser la pression rapidement et naturellement.
              </p>
              <Link
                href="/respiration"
                className="text-brand focus-visible:ring-brand rounded font-bold hover:underline focus-visible:ring-2 focus-visible:outline-none"
              >
                Découvrir l'exercice &rarr;
              </Link>
            </div>
          </div>
        </section>

        <section className="border-institutional/20 bg-institutional/10 mt-6 border-y px-4 py-12 sm:px-6 md:mt-10 md:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-foreground mb-4 text-xl font-bold text-balance sm:text-2xl">
              Une initiative santé de confiance
            </h2>
            <p className="text-muted-foreground mb-8">
              CESIZen s'engage à protéger vos données personnelles. Toutes vos
              évaluations et journaux d'émotions sont strictement confidentiels.
            </p>
            <div className="border-border bg-card text-foreground inline-block rounded-xl border px-6 py-3 font-bold shadow-sm">
              Conforme RGPD
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
