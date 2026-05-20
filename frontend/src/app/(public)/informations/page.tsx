import { Brain, Heart, ShieldAlert, Wind } from "lucide-react";

import { db } from "@/server/db";

const fallbackSections = [
  {
    id: "stress",
    title: "Le mecanisme du stress",
    icon: Brain,
    content:
      "Le stress est une reaction biologique d'adaptation. CESIZen utilise l'echelle de Holmes et Rahe pour quantifier l'impact des changements de vie sur votre sante.",
  },
  {
    id: "respiration",
    title: "La coherence cardiaque",
    icon: Wind,
    content:
      "La coherence cardiaque est une pratique respiratoire simple qui aide a reguler le systeme nerveux autonome grace a un rythme d'inspiration et d'expiration.",
  },
  {
    id: "emotions",
    title: "Le journal d'emotions",
    icon: Heart,
    content:
      "Identifier ses emotions est une premiere etape de regulation. Le tracker CESIZen classe les ressentis en familles pour aider a mieux comprendre son quotidien.",
  },
];

export default async function InformationPage() {
  const pages = await db.pageInfo.findMany({
    where: { isPublie: true },
    orderBy: { dateMaj: "desc" },
  });

  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <header className="mb-10 text-center sm:mb-14 md:mb-16">
          <h1 className="font-heading text-foreground mb-4 text-3xl font-bold text-balance sm:text-4xl">
            Comprendre pour mieux <span className="text-brand">agir</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-xl">
            Informations et prevention autour de la sante mentale et de la
            gestion du stress.
          </p>
        </header>

        <div className="space-y-10">
          {pages.length > 0
            ? pages.map((page) => (
                <section
                  key={page.id}
                  id={page.slug}
                  className="border-border bg-card scroll-mt-20 rounded-lg border p-5 sm:p-6"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div className="bg-brand/10 shrink-0 rounded-lg p-3">
                      <Brain className="text-brand h-7 w-7" />
                    </div>
                    <h2 className="font-heading text-foreground min-w-0 text-xl font-bold text-balance sm:text-2xl">
                      {page.titre}
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {page.contenu}
                  </p>
                </section>
              ))
            : fallbackSections.map((section) => {
                const Icon = section.icon;

                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className="border-border bg-card scroll-mt-20 rounded-lg border p-5 sm:p-6"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <div className="bg-brand/10 shrink-0 rounded-lg p-3">
                        <Icon className="text-brand h-7 w-7" />
                      </div>
                      <h2 className="font-heading text-foreground min-w-0 text-xl font-bold text-balance sm:text-2xl">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </section>
                );
              })}

          <section className="border-destructive/20 bg-destructive/5 rounded-lg border p-5 sm:p-6">
            <div className="text-destructive mb-4 flex items-center gap-3">
              <ShieldAlert className="h-6 w-6 shrink-0" />
              <h2 className="font-heading text-xl font-bold">Aide immediate</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              Si vous traversez une crise ou avez des pensees sombres, CESIZen
              ne remplace pas un accompagnement professionnel.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border text-foreground rounded-lg border bg-white px-4 py-2 font-bold">
                3114
              </div>
              <div className="border-border text-foreground rounded-lg border bg-white px-4 py-2 font-bold">
                15
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
