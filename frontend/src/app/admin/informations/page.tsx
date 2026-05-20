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
      <header className="min-w-0">
        <p className="text-brand text-sm font-semibold tracking-wide uppercase">
          Informations
        </p>
        <h1 className="font-heading text-foreground mt-2 text-2xl font-bold text-balance sm:text-3xl">
          Menus et pages de contenu
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Les pages publiees alimentent la page publique de contenu. Les menus
          permettent de preparer la navigation front-office.
        </p>
      </header>

      <section className="border-border bg-card rounded-lg border p-4 sm:p-5">
        <h2 className="font-heading text-foreground text-lg font-bold text-balance sm:text-xl">
          Nouvelle page de contenu
        </h2>
        <form action={upsertPageInfo} className="mt-5 grid gap-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="text-foreground grid gap-2 text-sm font-semibold">
              Titre
              <input
                name="titre"
                required
                className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
              />
            </label>
            <label className="text-foreground grid gap-2 text-sm font-semibold">
              Slug
              <input
                name="slug"
                placeholder="comprendre-le-stress"
                className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
              />
            </label>
            <label className="text-foreground flex items-end gap-3 text-sm font-semibold">
              <input
                name="isPublie"
                type="checkbox"
                className="accent-brand h-5 w-5"
              />
              Publier
            </label>
          </div>
          <label className="text-foreground grid gap-2 text-sm font-semibold">
            Contenu
            <textarea
              name="contenu"
              required
              rows={8}
              className="border-border bg-background focus:ring-brand/30 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </label>
          <button className="bg-brand hover:bg-brand-dark w-full rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors sm:w-fit">
            Creer la page
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-foreground text-lg font-bold text-balance sm:text-xl">
          Pages existantes
        </h2>
        {pages.length === 0 ? (
          <div className="border-border bg-card text-muted-foreground rounded-lg border p-5 text-sm">
            Aucune page creee pour le moment.
          </div>
        ) : (
          pages.map((page) => (
            <article
              key={page.id}
              className="border-border bg-card rounded-lg border p-4 sm:p-5"
            >
              <form action={upsertPageInfo} className="grid gap-4">
                <input type="hidden" name="id" value={page.id} />
                <div className="grid gap-4 lg:grid-cols-3">
                  <label className="text-foreground grid gap-2 text-sm font-semibold">
                    Titre
                    <input
                      name="titre"
                      defaultValue={page.titre}
                      required
                      className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                    />
                  </label>
                  <label className="text-foreground grid gap-2 text-sm font-semibold">
                    Slug
                    <input
                      name="slug"
                      defaultValue={page.slug}
                      required
                      className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                    />
                  </label>
                  <label className="text-foreground flex items-end gap-3 text-sm font-semibold">
                    <input
                      name="isPublie"
                      type="checkbox"
                      defaultChecked={page.isPublie}
                      className="accent-brand h-5 w-5"
                    />
                    Publiee
                  </label>
                </div>
                <label className="text-foreground grid gap-2 text-sm font-semibold">
                  Contenu
                  <textarea
                    name="contenu"
                    defaultValue={page.contenu}
                    required
                    rows={7}
                    className="border-border bg-background focus:ring-brand/30 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
                  />
                </label>
                <p className="text-muted-foreground text-xs">
                  Derniere mise a jour par {page.auteur.name} (
                  {page.auteur.email})
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-brand hover:bg-brand-dark w-full rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors sm:w-auto">
                    Enregistrer
                  </button>
                </div>
              </form>
              <form action={deletePageInfo} className="mt-2">
                <input type="hidden" name="id" value={page.id} />
                <button className="bg-destructive/10 text-destructive hover:bg-destructive/20 w-full rounded-lg px-4 py-2 text-sm font-bold transition-colors sm:w-auto">
                  Supprimer
                </button>
              </form>
            </article>
          ))
        )}
      </section>

      <section className="border-border bg-card rounded-lg border p-4 sm:p-5">
        <h2 className="font-heading text-foreground text-lg font-bold text-balance sm:text-xl">
          Menus front-office
        </h2>
        <form action={upsertMenu} className="mt-5 grid gap-4 lg:grid-cols-4">
          <label className="text-foreground grid gap-2 text-sm font-semibold">
            Libelle
            <input
              name="label"
              required
              className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            />
          </label>
          <label className="text-foreground grid gap-2 text-sm font-semibold lg:col-span-2">
            URL
            <input
              name="url"
              required
              placeholder="/informations"
              className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            />
          </label>
          <label className="text-foreground grid gap-2 text-sm font-semibold">
            Ordre
            <input
              name="ordreAffichage"
              type="number"
              defaultValue={10}
              className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            />
          </label>
          <button className="bg-brand hover:bg-brand-dark h-10 w-full rounded-lg px-4 text-sm font-bold text-white transition-colors sm:w-fit lg:col-span-4">
            Ajouter le menu
          </button>
        </form>

        <div className="mt-6 grid gap-3">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="border-border grid min-w-0 gap-3 rounded-lg border p-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_90px_auto]"
            >
              <form action={upsertMenu} className="contents">
                <input type="hidden" name="id" value={menu.id} />
                <input
                  name="label"
                  defaultValue={menu.label}
                  className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                />
                <input
                  name="url"
                  defaultValue={menu.url}
                  className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                />
                <input
                  name="ordreAffichage"
                  type="number"
                  defaultValue={menu.ordreAffichage}
                  className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                />
                <button className="border-border text-foreground hover:bg-secondary h-10 rounded-lg border px-3 text-sm font-bold transition-colors">
                  Modifier
                </button>
              </form>
              <form action={deleteMenu} className="lg:col-start-4">
                <input type="hidden" name="id" value={menu.id} />
                <button className="bg-destructive/10 text-destructive hover:bg-destructive/20 h-10 w-full rounded-lg px-3 text-sm font-bold transition-colors lg:w-auto">
                  Supprimer
                </button>
              </form>
            </div>
          ))}
          {menus.length === 0 && (
            <p className="text-muted-foreground text-sm">
              Aucun menu personnalise.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
