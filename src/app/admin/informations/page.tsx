import {
  deleteMenu,
  deletePageInfo,
  upsertMenu,
  upsertPageInfo,
} from "@/app/admin/actions";
import { db } from "@/server/db";

export default async function AdminInformationsPage() {
  const [pages, menus] = await Promise.all([
    db.pageInfo.findMany({
      include: { auteur: { select: { name: true, email: true } } },
      orderBy: { dateMaj: "desc" },
    }),
    db.menu.findMany({
      orderBy: { ordreAffichage: "asc" },
    }),
  ]);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Informations
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Menus et pages de contenu
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Les pages publiees alimentent la page publique de contenu. Les
          menus permettent de preparer la navigation front-office.
        </p>
      </header>

      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Nouvelle page de contenu
        </h2>
        <form action={upsertPageInfo} className="mt-5 grid gap-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="grid gap-2 text-sm font-semibold text-foreground">
              Titre
              <input
                name="titre"
                required
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-foreground">
              Slug
              <input
                name="slug"
                placeholder="comprendre-le-stress"
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
              />
            </label>
            <label className="flex items-end gap-3 text-sm font-semibold text-foreground">
              <input
                name="isPublie"
                type="checkbox"
                className="h-5 w-5 accent-brand"
              />
              Publier
            </label>
          </div>
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Contenu
            <textarea
              name="contenu"
              required
              rows={8}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
          <button className="w-fit rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dark">
            Creer la page
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Pages existantes
        </h2>
        {pages.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
            Aucune page creee pour le moment.
          </div>
        ) : (
          pages.map((page) => (
            <article
              key={page.id}
              className="rounded-lg border border-border bg-card p-5"
            >
              <form action={upsertPageInfo} className="grid gap-4">
                <input type="hidden" name="id" value={page.id} />
                <div className="grid gap-4 lg:grid-cols-3">
                  <label className="grid gap-2 text-sm font-semibold text-foreground">
                    Titre
                    <input
                      name="titre"
                      defaultValue={page.titre}
                      required
                      className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-foreground">
                    Slug
                    <input
                      name="slug"
                      defaultValue={page.slug}
                      required
                      className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                    />
                  </label>
                  <label className="flex items-end gap-3 text-sm font-semibold text-foreground">
                    <input
                      name="isPublie"
                      type="checkbox"
                      defaultChecked={page.isPublie}
                      className="h-5 w-5 accent-brand"
                    />
                    Publiee
                  </label>
                </div>
                <label className="grid gap-2 text-sm font-semibold text-foreground">
                  Contenu
                  <textarea
                    name="contenu"
                    defaultValue={page.contenu}
                    required
                    rows={7}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </label>
                <p className="text-xs text-muted-foreground">
                  Derniere mise a jour par {page.auteur.name} ({page.auteur.email})
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dark">
                    Enregistrer
                  </button>
                </div>
              </form>
              <form action={deletePageInfo} className="mt-2">
                <input type="hidden" name="id" value={page.id} />
                <button className="rounded-lg bg-destructive/10 px-4 py-2 text-sm font-bold text-destructive transition-colors hover:bg-destructive/20">
                  Supprimer
                </button>
              </form>
            </article>
          ))
        )}
      </section>

      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Menus front-office
        </h2>
        <form action={upsertMenu} className="mt-5 grid gap-4 lg:grid-cols-4">
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Libelle
            <input
              name="label"
              required
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-foreground lg:col-span-2">
            URL
            <input
              name="url"
              required
              placeholder="/informations"
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Ordre
            <input
              name="ordreAffichage"
              type="number"
              defaultValue={10}
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
          <button className="h-10 w-fit rounded-lg bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-brand-dark lg:col-span-4">
            Ajouter le menu
          </button>
        </form>

        <div className="mt-6 grid gap-3">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="grid gap-3 rounded-lg border border-border p-3 lg:grid-cols-[1fr_2fr_90px_auto]"
            >
              <form action={upsertMenu} className="contents">
                <input type="hidden" name="id" value={menu.id} />
                <input
                  name="label"
                  defaultValue={menu.label}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
                <input
                  name="url"
                  defaultValue={menu.url}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
                <input
                  name="ordreAffichage"
                  type="number"
                  defaultValue={menu.ordreAffichage}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
                <button className="h-10 rounded-lg border border-border px-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary">
                  Modifier
                </button>
              </form>
              <form action={deleteMenu} className="lg:col-start-4">
                <input type="hidden" name="id" value={menu.id} />
                <button className="h-10 rounded-lg bg-destructive/10 px-3 text-sm font-bold text-destructive transition-colors hover:bg-destructive/20">
                  Supprimer
                </button>
              </form>
            </div>
          ))}
          {menus.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Aucun menu personnalise.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
