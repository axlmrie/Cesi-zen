import {
  deleteDiagnosticEvent,
  upsertDiagnosticEvent,
  upsertPageInfo,
} from "@/app/admin/actions";
import { db } from "@/server/db";

const resultPages = [
  {
    slug: "resultat-stress-faible",
    fallbackTitle: "Risque faible",
    fallbackContent:
      "Votre niveau de stress actuel est considere comme gerable par votre organisme.",
  },
  {
    slug: "resultat-stress-modere",
    fallbackTitle: "Risque modere",
    fallbackContent:
      "Prudence : votre niveau de changement de vie suggere une vulnerabilite face au stress.",
  },
  {
    slug: "resultat-stress-eleve",
    fallbackTitle: "Risque eleve",
    fallbackContent:
      "Attention : votre score indique un niveau de stress important. Prenez le temps de demander de l'aide si besoin.",
  },
];

export default async function AdminDiagnosticPage() {
  const [events, existingResultPages] = await Promise.all([
    db.evenementStress.findMany({
      orderBy: [
        { isActif: "desc" },
        { points: "desc" },
        { description: "asc" },
      ],
    }),
    db.pageInfo.findMany({
      where: { slug: { in: resultPages.map((page) => page.slug) } },
    }),
  ]);

  return (
    <div className="space-y-8">
      <header className="min-w-0">
        <p className="text-brand text-sm font-semibold tracking-wide uppercase">
          Diagnostic
        </p>
        <h1 className="font-heading text-foreground mt-2 text-2xl font-bold text-balance sm:text-3xl">
          Questionnaire de stress Holmes et Rahe
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Configurez les evenements proposes au public et les messages affiches
          sur la page de resultat.
        </p>
      </header>

      <section className="border-border bg-card rounded-lg border p-4 sm:p-5">
        <h2 className="font-heading text-foreground text-lg font-bold text-balance sm:text-xl">
          Ajouter un evenement
        </h2>
        <form
          action={upsertDiagnosticEvent}
          className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_120px_auto]"
        >
          <label className="text-foreground grid gap-2 text-sm font-semibold">
            Description
            <input
              name="description"
              required
              className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            />
          </label>
          <label className="text-foreground grid gap-2 text-sm font-semibold">
            Points
            <input
              name="points"
              type="number"
              min="0"
              required
              className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            />
          </label>
          <input type="hidden" name="isActif" value="true" />
          <div className="flex items-end">
            <button className="bg-brand hover:bg-brand-dark h-10 w-full rounded-lg px-4 text-sm font-bold text-white transition-colors lg:w-auto">
              Ajouter
            </button>
          </div>
        </form>
      </section>

      <section className="border-border bg-card rounded-lg border">
        <div className="border-border border-b p-5">
          <h2 className="font-heading text-foreground text-lg font-bold text-balance sm:text-xl">
            Evenements du questionnaire
          </h2>
        </div>
        <div className="divide-border divide-y">
          {events.map((event) => (
            <div
              key={event.id}
              className="grid min-w-0 gap-3 p-4 lg:grid-cols-[minmax(0,1fr)_110px_120px_auto]"
            >
              <form action={upsertDiagnosticEvent} className="contents">
                <input type="hidden" name="id" value={event.id} />
                <input
                  name="description"
                  defaultValue={event.description}
                  className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                />
                <input
                  name="points"
                  type="number"
                  min="0"
                  defaultValue={event.points}
                  className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                />
                <label className="text-foreground flex h-10 items-center gap-2 text-sm font-semibold">
                  <input
                    name="isActif"
                    type="checkbox"
                    defaultChecked={event.isActif}
                    className="accent-brand h-5 w-5"
                  />
                  Actif
                </label>
                <button className="border-border text-foreground hover:bg-secondary h-10 rounded-lg border px-3 text-sm font-bold transition-colors">
                  Enregistrer
                </button>
              </form>
              <form action={deleteDiagnosticEvent} className="lg:col-start-4">
                <input type="hidden" name="id" value={event.id} />
                <button className="bg-destructive/10 text-destructive hover:bg-destructive/20 h-10 w-full rounded-lg px-3 text-sm font-bold transition-colors lg:w-auto">
                  Supprimer
                </button>
              </form>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-muted-foreground p-5 text-sm">
              Aucun evenement configure. Le diagnostic utilisera le jeu de
              secours integre tant que la base est vide.
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-foreground text-lg font-bold text-balance sm:text-xl">
          Messages de resultat
        </h2>
        <div className="grid gap-4">
          {resultPages.map((resultPage) => {
            const existing = existingResultPages.find(
              (page) => page.slug === resultPage.slug,
            );

            return (
              <form
                key={resultPage.slug}
                action={upsertPageInfo}
                className="border-border bg-card rounded-lg border p-4 sm:p-5"
              >
                {existing ? (
                  <input type="hidden" name="id" value={existing.id} />
                ) : null}
                <input type="hidden" name="slug" value={resultPage.slug} />
                <input type="hidden" name="isPublie" value="true" />
                <label className="text-foreground grid gap-2 text-sm font-semibold">
                  Libelle affiche
                  <input
                    name="titre"
                    defaultValue={existing?.titre ?? resultPage.fallbackTitle}
                    required
                    className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                  />
                </label>
                <label className="text-foreground mt-4 grid gap-2 text-sm font-semibold">
                  Message
                  <textarea
                    name="contenu"
                    rows={4}
                    defaultValue={
                      existing?.contenu ?? resultPage.fallbackContent
                    }
                    required
                    className="border-border bg-background focus:ring-brand/30 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
                  />
                </label>
                <button className="bg-brand hover:bg-brand-dark mt-4 w-full rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors sm:w-auto">
                  Enregistrer le message
                </button>
              </form>
            );
          })}
        </div>
      </section>
    </div>
  );
}
