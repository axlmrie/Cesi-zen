import {
  deleteEmotionNiveau1,
  deleteEmotionNiveau2,
  upsertEmotionNiveau1,
  upsertEmotionNiveau2,
} from "@/app/admin/actions";
import { db } from "@/server/db";

export default async function AdminEmotionsPage() {
  const emotionGroups = await db.emotionNiveau1.findMany({
    include: { emotionsN2: { orderBy: { libelle: "asc" } } },
    orderBy: { libelle: "asc" },
  });

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Tracker des emotions
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Referentiel des emotions
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Configurez les emotions de base et les emotions de niveau 2
          disponibles dans le journal de bord des utilisateurs.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Nouvelle emotion de base
          </h2>
          <form action={upsertEmotionNiveau1} className="mt-5 flex gap-3">
            <input
              name="libelle"
              required
              className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
            <button className="h-10 rounded-lg bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-brand-dark">
              Ajouter
            </button>
          </form>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Nouvelle emotion niveau 2
          </h2>
          <form action={upsertEmotionNiveau2} className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input
              name="libelle"
              required
              placeholder="Ex. Serenite"
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
            <select
              name="emotionN1Id"
              required
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            >
              <option value="">Emotion de base</option>
              {emotionGroups.map((emotion) => (
                <option key={emotion.id} value={emotion.id}>
                  {emotion.libelle}
                </option>
              ))}
            </select>
            <button className="h-10 rounded-lg bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-brand-dark">
              Ajouter
            </button>
          </form>
        </div>
      </section>

      <section className="space-y-4">
        {emotionGroups.map((emotion) => (
          <article
            key={emotion.id}
            className="rounded-lg border border-border bg-card p-5"
          >
            <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
              <form action={upsertEmotionNiveau1} className="flex gap-3">
                <input type="hidden" name="id" value={emotion.id} />
                <input
                  name="libelle"
                  defaultValue={emotion.libelle}
                  className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-brand/30"
                />
                <button className="h-10 rounded-lg border border-border px-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary">
                  Renommer
                </button>
              </form>
              <form action={deleteEmotionNiveau1}>
                <input type="hidden" name="id" value={emotion.id} />
                <button className="h-10 rounded-lg bg-destructive/10 px-3 text-sm font-bold text-destructive transition-colors hover:bg-destructive/20">
                  Supprimer
                </button>
              </form>
            </div>

            <div className="mt-4 grid gap-3">
              {emotion.emotionsN2.map((subEmotion) => (
                <div
                  key={subEmotion.id}
                  className="grid gap-3 rounded-lg border border-border p-3 lg:grid-cols-[1fr_220px_auto]"
                >
                  <form action={upsertEmotionNiveau2} className="contents">
                    <input type="hidden" name="id" value={subEmotion.id} />
                    <input
                      name="libelle"
                      defaultValue={subEmotion.libelle}
                      className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                    />
                    <select
                      name="emotionN1Id"
                      defaultValue={emotion.id}
                      className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                    >
                      {emotionGroups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.libelle}
                        </option>
                      ))}
                    </select>
                    <button className="h-10 rounded-lg border border-border px-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary">
                      Enregistrer
                    </button>
                  </form>
                  <form action={deleteEmotionNiveau2} className="lg:col-start-3">
                    <input type="hidden" name="id" value={subEmotion.id} />
                    <button className="h-10 rounded-lg bg-destructive/10 px-3 text-sm font-bold text-destructive transition-colors hover:bg-destructive/20">
                      Supprimer
                    </button>
                  </form>
                </div>
              ))}
              {emotion.emotionsN2.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Aucune emotion niveau 2 associee.
                </p>
              )}
            </div>
          </article>
        ))}
        {emotionGroups.length === 0 && (
          <div className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
            Aucune emotion configuree.
          </div>
        )}
      </section>
    </div>
  );
}
