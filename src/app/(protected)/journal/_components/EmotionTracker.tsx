"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, CheckCircle2, Heart, MessageSquare } from "lucide-react";
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
    if (!selectedN2) return;

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
      <div className="bg-green-50 border border-green-200 p-8 rounded-3xl text-center animate-in zoom-in-95 duration-300">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800">C'est noté !</h3>
        <p className="text-green-600 mt-2">Votre émotion a bien été ajoutée à votre journal.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm space-y-8">
      
      {/* ÉTAPE 1 : Émotion principale */}
      <div className="space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand/10 text-brand text-xs">1</span>
          Comment vous sentez-vous globalement ?
        </h3>
        <div className="flex flex-wrap gap-3">
          {emotions.map((e1) => (
            <button
              key={e1.id}
              onClick={() => { setSelectedN1(e1); setSelectedN2(null); }}
              className={`px-5 py-3 rounded-2xl font-medium transition-all border-2 ${
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
        <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand/10 text-brand text-xs">2</span>
            Précisez cette émotion
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedN1.emotionsN2.map((e2) => (
              <button
                key={e2.id}
                onClick={() => setSelectedN2(e2)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
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
        <div className="space-y-4 animate-in slide-in-from-top-4 duration-300 pt-4 border-t border-border">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-brand" />
            Voulez-vous ajouter une note ? (Optionnel)
          </h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Qu'est-ce qui a déclenché cette émotion ? Écrivez ce qui vous passe par la tête..."
            className="w-full h-32 p-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-brand outline-none resize-none"
          />
          
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-brand text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-brand/20 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
              <>Enregistrer dans mon journal <ArrowRight className="h-5 w-5" /></>
            )}
          </button>
        </div>
      )}
    </div>
  );
}