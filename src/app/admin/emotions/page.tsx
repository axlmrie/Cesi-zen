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
      <header className="min-w-0">
        <p className="text-brand text-sm font-semibold tracking-wide uppercase">
          Tracker des emotions
        </p>
        <h1 className="font-heading text-foreground mt-2 text-2xl font-bold text-balance sm:text-3xl">
          Referentiel des emotions
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Configurez les emotions de base et les emotions de niveau 2
          disponibles dans le journal de bord des utilisateurs.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="border-border bg-card rounded-lg border p-4 sm:p-5">
          <h2 className="font-heading text-foreground text-lg font-bold text-balance sm:text-xl">
            Nouvelle emotion de base
          </h2>
          <form
            action={upsertEmotionNiveau1}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input
              name="libelle"
              required
              className="border-border bg-background focus:ring-brand/30 h-10 min-w-0 flex-1 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            />
            <button className="bg-brand hover:bg-brand-dark h-10 rounded-lg px-4 text-sm font-bold text-white transition-colors">
              Ajouter
            </button>
          </form>
        </div>

        <div className="border-border bg-card rounded-lg border p-4 sm:p-5">
          <h2 className="font-heading text-foreground text-lg font-bold text-balance sm:text-xl">
            Nouvelle emotion niveau 2
          </h2>
          <form
            action={upsertEmotionNiveau2}
            className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
          >
            <input
              name="libelle"
              required
              placeholder="Ex. Serenite"
              className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            />
            <select
              name="emotionN1Id"
              required
              className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            >
              <option value="">Emotion de base</option>
              {emotionGroups.map((emotion) => (
                <option key={emotion.id} value={emotion.id}>
                  {emotion.libelle}
                </option>
              ))}
            </select>
            <button className="bg-brand hover:bg-brand-dark h-10 rounded-lg px-4 text-sm font-bold text-white transition-colors">
              Ajouter
            </button>
          </form>
        </div>
      </section>

      <section className="space-y-4">
        {emotionGroups.map((emotion) => (
          <article
            key={emotion.id}
            className="border-border bg-card rounded-lg border p-4 sm:p-5"
          >
            <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
              <form
                action={upsertEmotionNiveau1}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input type="hidden" name="id" value={emotion.id} />
                <input
                  name="libelle"
                  defaultValue={emotion.libelle}
                  className="border-border bg-background focus:ring-brand/30 h-10 min-w-0 flex-1 rounded-lg border px-3 text-sm font-semibold outline-none focus:ring-2"
                />
                <button className="border-border text-foreground hover:bg-secondary h-10 rounded-lg border px-3 text-sm font-bold transition-colors">
                  Renommer
                </button>
              </form>
              <form action={deleteEmotionNiveau1}>
                <input type="hidden" name="id" value={emotion.id} />
                <button className="bg-destructive/10 text-destructive hover:bg-destructive/20 h-10 rounded-lg px-3 text-sm font-bold transition-colors">
                  Supprimer
                </button>
              </form>
            </div>

            <div className="mt-4 grid gap-3">
              {emotion.emotionsN2.map((subEmotion) => (
                <div
                  key={subEmotion.id}
                  className="border-border grid min-w-0 gap-3 rounded-lg border p-3 lg:grid-cols-[minmax(0,1fr)_220px_auto]"
                >
                  <form action={upsertEmotionNiveau2} className="contents">
                    <input type="hidden" name="id" value={subEmotion.id} />
                    <input
                      name="libelle"
                      defaultValue={subEmotion.libelle}
                      className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                    />
                    <select
                      name="emotionN1Id"
                      defaultValue={emotion.id}
                      className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                    >
                      {emotionGroups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.libelle}
                        </option>
                      ))}
                    </select>
                    <button className="border-border text-foreground hover:bg-secondary h-10 rounded-lg border px-3 text-sm font-bold transition-colors">
                      Enregistrer
                    </button>
                  </form>
                  <form
                    action={deleteEmotionNiveau2}
                    className="lg:col-start-3"
                  >
                    <input type="hidden" name="id" value={subEmotion.id} />
                    <button className="bg-destructive/10 text-destructive hover:bg-destructive/20 h-10 w-full rounded-lg px-3 text-sm font-bold transition-colors lg:w-auto">
                      Supprimer
                    </button>
                  </form>
                </div>
              ))}
              {emotion.emotionsN2.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  Aucune emotion niveau 2 associee.
                </p>
              )}
            </div>
          </article>
        ))}
        {emotionGroups.length === 0 && (
          <div className="border-border bg-card text-muted-foreground rounded-lg border p-5 text-sm">
            Aucune emotion configuree.
          </div>
        )}
      </section>
    </div>
  );
}
