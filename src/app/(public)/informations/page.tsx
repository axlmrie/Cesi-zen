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
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-16 text-center">
          <h1 className="mb-4 font-heading text-4xl font-bold text-foreground">
            Comprendre pour mieux <span className="text-brand">agir</span>
          </h1>
          <p className="text-xl text-muted-foreground">
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
                  className="scroll-mt-20 rounded-lg border border-border bg-card p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-brand/10 p-3">
                      <Brain className="h-7 w-7 text-brand" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      {page.titre}
                    </h2>
                  </div>
                  <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
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
                    className="scroll-mt-20 rounded-lg border border-border bg-card p-6"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-brand/10 p-3">
                        <Icon className="h-7 w-7 text-brand" />
                      </div>
                      <h2 className="font-heading text-2xl font-bold text-foreground">
                        {section.title}
                      </h2>
                    </div>
                    <p className="leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  </section>
                );
              })}

          <section className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
            <div className="mb-4 flex items-center gap-3 text-destructive">
              <ShieldAlert className="h-6 w-6" />
              <h2 className="font-heading text-xl font-bold">Aide immediate</h2>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              Si vous traversez une crise ou avez des pensees sombres, CESIZen
              ne remplace pas un accompagnement professionnel.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-lg border border-border bg-white px-4 py-2 font-bold text-foreground">
                3114
              </div>
              <div className="rounded-lg border border-border bg-white px-4 py-2 font-bold text-foreground">
                15
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
