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
      <header className="min-w-0">
        <p className="text-brand text-sm font-semibold tracking-wide uppercase">
          Respiration
        </p>
        <h1 className="font-heading text-foreground mt-2 text-2xl font-bold text-balance sm:text-3xl">
          Exercices de coherence cardiaque
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Configurez les rythmes proposes aux visiteurs et utilisateurs :
          inspiration, apnee et expiration.
        </p>
      </header>

      <section className="border-border bg-card rounded-lg border p-4 sm:p-5">
        <h2 className="font-heading text-foreground text-lg font-bold text-balance sm:text-xl">
          Nouvel exercice
        </h2>
        <form
          action={upsertRespirationExercise}
          className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_140px_140px_140px_auto]"
        >
          <label className="text-foreground grid gap-2 text-sm font-semibold">
            Titre
            <input
              name="titre"
              required
              className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            />
          </label>
          <label className="text-foreground grid gap-2 text-sm font-semibold">
            Inspiration
            <input
              name="inspirationSec"
              type="number"
              min="1"
              required
              className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            />
          </label>
          <label className="text-foreground grid gap-2 text-sm font-semibold">
            Apnee
            <input
              name="retenueSec"
              type="number"
              min="0"
              defaultValue={0}
              className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            />
          </label>
          <label className="text-foreground grid gap-2 text-sm font-semibold">
            Expiration
            <input
              name="expirationSec"
              type="number"
              min="1"
              required
              className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
            />
          </label>
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
            Exercices disponibles
          </h2>
        </div>
        <div className="divide-border divide-y">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="grid min-w-0 gap-3 p-4 lg:grid-cols-[minmax(0,1fr)_120px_120px_120px_auto]"
            >
              <form action={upsertRespirationExercise} className="contents">
                <input type="hidden" name="id" value={exercise.id} />
                <input
                  name="titre"
                  defaultValue={exercise.titre}
                  className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                />
                <input
                  name="inspirationSec"
                  type="number"
                  min="1"
                  defaultValue={exercise.inspirationSec}
                  className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                />
                <input
                  name="retenueSec"
                  type="number"
                  min="0"
                  defaultValue={exercise.retenueSec}
                  className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                />
                <input
                  name="expirationSec"
                  type="number"
                  min="1"
                  defaultValue={exercise.expirationSec}
                  className="border-border bg-background focus:ring-brand/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
                />
                <button className="border-border text-foreground hover:bg-secondary h-10 rounded-lg border px-3 text-sm font-bold transition-colors">
                  Enregistrer
                </button>
              </form>
              <form
                action={deleteRespirationExercise}
                className="lg:col-start-5"
              >
                <input type="hidden" name="id" value={exercise.id} />
                <button className="bg-destructive/10 text-destructive hover:bg-destructive/20 h-10 w-full rounded-lg px-3 text-sm font-bold transition-colors lg:w-auto">
                  Supprimer
                </button>
              </form>
            </div>
          ))}
          {exercises.length === 0 && (
            <p className="text-muted-foreground p-5 text-sm">
              Aucun exercice configure.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
