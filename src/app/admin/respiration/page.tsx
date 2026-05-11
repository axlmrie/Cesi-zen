import {
  deleteRespirationExercise,
  upsertRespirationExercise,
} from "@/app/admin/actions";
import { db } from "@/server/db";

export default async function AdminRespirationPage() {
  const exercises = await db.exerciceRespiration.findMany({
    orderBy: { titre: "asc" },
  });

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Respiration
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Exercices de coherence cardiaque
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Configurez les rythmes proposes aux visiteurs et utilisateurs :
          inspiration, apnee et expiration.
        </p>
      </header>

      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Nouvel exercice
        </h2>
        <form action={upsertRespirationExercise} className="mt-5 grid gap-4 lg:grid-cols-[1fr_140px_140px_140px_auto]">
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Titre
            <input
              name="titre"
              required
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Inspiration
            <input
              name="inspirationSec"
              type="number"
              min="1"
              required
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Apnee
            <input
              name="retenueSec"
              type="number"
              min="0"
              defaultValue={0}
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Expiration
            <input
              name="expirationSec"
              type="number"
              min="1"
              required
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
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
            Exercices disponibles
          </h2>
        </div>
        <div className="divide-y divide-border">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="grid gap-3 p-4 lg:grid-cols-[1fr_120px_120px_120px_auto]"
            >
              <form action={upsertRespirationExercise} className="contents">
                <input type="hidden" name="id" value={exercise.id} />
                <input
                  name="titre"
                  defaultValue={exercise.titre}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
                <input
                  name="inspirationSec"
                  type="number"
                  min="1"
                  defaultValue={exercise.inspirationSec}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
                <input
                  name="retenueSec"
                  type="number"
                  min="0"
                  defaultValue={exercise.retenueSec}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
                <input
                  name="expirationSec"
                  type="number"
                  min="1"
                  defaultValue={exercise.expirationSec}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
                <button className="h-10 rounded-lg border border-border px-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary">
                  Enregistrer
                </button>
              </form>
              <form action={deleteRespirationExercise} className="lg:col-start-5">
                <input type="hidden" name="id" value={exercise.id} />
                <button className="h-10 rounded-lg bg-destructive/10 px-3 text-sm font-bold text-destructive transition-colors hover:bg-destructive/20">
                  Supprimer
                </button>
              </form>
            </div>
          ))}
          {exercises.length === 0 && (
            <p className="p-5 text-sm text-muted-foreground">
              Aucun exercice configure.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
