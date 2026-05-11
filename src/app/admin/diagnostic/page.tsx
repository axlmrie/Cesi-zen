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
      orderBy: [{ isActif: "desc" }, { points: "desc" }, { description: "asc" }],
    }),
    db.pageInfo.findMany({
      where: { slug: { in: resultPages.map((page) => page.slug) } },
    }),
  ]);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Diagnostic
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Questionnaire de stress Holmes et Rahe
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Configurez les evenements proposes au public et les messages affiches
          sur la page de resultat.
        </p>
      </header>

      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Ajouter un evenement
        </h2>
        <form action={upsertDiagnosticEvent} className="mt-5 grid gap-4 lg:grid-cols-[1fr_120px_auto]">
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Description
            <input
              name="description"
              required
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Points
            <input
              name="points"
              type="number"
              min="0"
              required
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
          <input type="hidden" name="isActif" value="true" />
          <div className="flex items-end">
            <button className="h-10 rounded-lg bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-brand-dark">
              Ajouter
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-lg border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Evenements du questionnaire
          </h2>
        </div>
        <div className="divide-y divide-border">
          {events.map((event) => (
            <div key={event.id} className="grid gap-3 p-4 lg:grid-cols-[1fr_110px_120px_auto]">
              <form action={upsertDiagnosticEvent} className="contents">
                <input type="hidden" name="id" value={event.id} />
                <input
                  name="description"
                  defaultValue={event.description}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
                <input
                  name="points"
                  type="number"
                  min="0"
                  defaultValue={event.points}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
                <label className="flex h-10 items-center gap-2 text-sm font-semibold text-foreground">
                  <input
                    name="isActif"
                    type="checkbox"
                    defaultChecked={event.isActif}
                    className="h-5 w-5 accent-brand"
                  />
                  Actif
                </label>
                <button className="h-10 rounded-lg border border-border px-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary">
                  Enregistrer
                </button>
              </form>
              <form action={deleteDiagnosticEvent} className="lg:col-start-4">
                <input type="hidden" name="id" value={event.id} />
                <button className="h-10 rounded-lg bg-destructive/10 px-3 text-sm font-bold text-destructive transition-colors hover:bg-destructive/20">
                  Supprimer
                </button>
              </form>
            </div>
          ))}
          {events.length === 0 && (
            <p className="p-5 text-sm text-muted-foreground">
              Aucun evenement configure. Le diagnostic utilisera le jeu de
              secours integre tant que la base est vide.
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-bold text-foreground">
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
                className="rounded-lg border border-border bg-card p-5"
              >
                {existing ? (
                  <input type="hidden" name="id" value={existing.id} />
                ) : null}
                <input type="hidden" name="slug" value={resultPage.slug} />
                <input type="hidden" name="isPublie" value="true" />
                <label className="grid gap-2 text-sm font-semibold text-foreground">
                  Libelle affiche
                  <input
                    name="titre"
                    defaultValue={existing?.titre ?? resultPage.fallbackTitle}
                    required
                    className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </label>
                <label className="mt-4 grid gap-2 text-sm font-semibold text-foreground">
                  Message
                  <textarea
                    name="contenu"
                    rows={4}
                    defaultValue={existing?.contenu ?? resultPage.fallbackContent}
                    required
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </label>
                <button className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dark">
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
