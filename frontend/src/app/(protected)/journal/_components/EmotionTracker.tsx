"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";
import { saveJournalEntry } from "../actions";

// Types basés sur ton schéma Prisma
type EmotionN2 = { id: string; libelle: string };
type EmotionN1 = { id: string; libelle: string; emotionsN2: EmotionN2[] };

export function EmotionTracker({ emotions }: { emotions: EmotionN1[] }) {
  const router = useRouter();
  const [selectedN1, setSelectedN1] = useState<EmotionN1 | null>(null);
  const [selectedN2, setSelectedN2] = useState<EmotionN2 | null>(null);
  const [note, setNote] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!selectedN2) {
      return;
    }

    setIsLoading(true);
    const result = await saveJournalEntry(selectedN2.id, note);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        // Reset complet après succès
        setSelectedN1(null);
        setSelectedN2(null);
        setNote("");
        setIsSuccess(false);
        router.refresh(); // Met à jour l'historique sur la page
      }, 2000);
    }
    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="animate-in zoom-in-95 rounded-3xl border border-green-200 bg-green-50 p-8 text-center duration-300">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h3 className="text-xl font-bold text-green-800">C'est noté !</h3>
        <p className="mt-2 text-green-600">
          Votre émotion a bien été ajoutée à votre journal.
        </p>
      </div>
    );
  }

  return (
    <div className="border-border bg-card space-y-8 rounded-3xl border p-5 shadow-sm sm:p-8">
      {/* ÉTAPE 1 : Émotion principale */}
      <div className="space-y-4">
        <h3 className="text-foreground flex items-center gap-2 font-bold text-balance">
          <span className="bg-brand/10 text-brand flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs">
            1
          </span>
          Comment vous sentez-vous globalement ?
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {emotions.map((e1) => (
            <button
              key={e1.id}
              onClick={() => {
                setSelectedN1(e1);
                setSelectedN2(null);
              }}
              className={`max-w-full rounded-2xl border-2 px-4 py-3 text-left font-medium transition-all sm:px-5 ${
                selectedN1?.id === e1.id
                  ? "border-brand bg-brand/10 text-brand scale-105"
                  : "border-border bg-background hover:border-brand/30 text-foreground"
              }`}
            >
              {e1.libelle}
            </button>
          ))}
        </div>
      </div>

      {/* ÉTAPE 2 : Émotion spécifique (S'affiche uniquement si N1 est choisi) */}
      {selectedN1 && (
        <div className="animate-in slide-in-from-top-4 space-y-4 duration-300">
          <h3 className="text-foreground flex items-center gap-2 font-bold text-balance">
            <span className="bg-brand/10 text-brand flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs">
              2
            </span>
            Précisez cette émotion
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedN1.emotionsN2.map((e2) => (
              <button
                key={e2.id}
                onClick={() => setSelectedN2(e2)}
                className={`max-w-full rounded-xl border px-4 py-2 text-left text-sm font-medium transition-all ${
                  selectedN2?.id === e2.id
                    ? "border-brand bg-brand text-white shadow-md"
                    : "border-border bg-secondary/50 hover:bg-secondary text-foreground"
                }`}
              >
                {e2.libelle}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ÉTAPE 3 : Note et Validation (S'affiche uniquement si N2 est choisi) */}
      {selectedN2 && (
        <div className="animate-in slide-in-from-top-4 border-border space-y-4 border-t pt-4 duration-300">
          <h3 className="text-foreground flex items-center gap-2 font-bold text-balance">
            <MessageSquare className="text-brand h-5 w-5 shrink-0" />
            Voulez-vous ajouter une note ? (Optionnel)
          </h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Qu'est-ce qui a déclenché cette émotion ? Écrivez ce qui vous passe par la tête..."
            className="border-border bg-background focus:ring-brand h-32 w-full resize-none rounded-2xl border p-4 outline-none focus:ring-2"
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-brand hover:shadow-brand/20 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white shadow-lg transition-all"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Enregistrer dans mon journal <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
