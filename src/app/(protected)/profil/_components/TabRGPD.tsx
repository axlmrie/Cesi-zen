"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Trash2, AlertCircle, FileLock2, ShieldCheck, Loader2 } from "lucide-react";
import { exportUserData, deleteUserAccount } from "../actions";

export function TabRGPD() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Fonction pour télécharger le JSON
  const handleExport = async () => {
    setIsLoading(true);
    const result = await exportUserData();
    if (result.success && result.data) {
      const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mes-donnees-cesizen.json`;
      a.click();
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await deleteUserAccount();
    if (result.success) {
      // On redirige vers l'accueil après suppression
      router.push("/");
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-brand/10 rounded-lg">
            <FileLock2 className="h-6 w-6 text-brand" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Confidentialité & Données</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          CESIZen applique les directives du RGPD pour protéger votre santé mentale et vos données privées. 
          Vous disposez d'un droit d'accès, de portabilité et d'effacement.
        </p>
      </div>

      {/* SECTION : EXPORT */}
      <div className="p-6 border border-border rounded-2xl bg-secondary/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="font-bold text-foreground flex items-center gap-2">
            <Download className="h-4 w-4 text-brand" /> Portabilité des données
          </h4>
          <p className="text-xs text-muted-foreground">Téléchargez l'intégralité de vos diagnostics et notes de journal au format JSON.</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isLoading}
          className="bg-background border border-border hover:border-brand hover:text-brand px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Exporter mes données
        </button>
      </div>

      {/* SECTION : SUPPRESSION */}
      <div className="p-6 border border-destructive/20 rounded-2xl bg-destructive/5 space-y-4">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-destructive shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-destructive">Droit à l'oubli</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              La suppression est définitive. Toutes vos données seront anonymisées et votre accès sera révoqué immédiatement. 
              Cette action est irréversible.
            </p>
          </div>
        </div>

        {!showConfirmDelete ? (
          <button 
            onClick={() => setShowConfirmDelete(true)}
            className="text-destructive text-sm font-bold hover:underline"
          >
            Je souhaite supprimer mon compte
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 animate-in fade-in zoom-in-95">
            <button 
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-all flex items-center gap-2"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Confirmer la suppression
            </button>
            <button 
              onClick={() => setShowConfirmDelete(false)}
              className="text-muted-foreground text-sm font-medium hover:text-foreground"
            >
              Annuler
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-[11px] text-muted-foreground bg-secondary/10 p-3 rounded-lg">
        <ShieldCheck className="h-3 w-3" />
        Données hébergées en France sur des serveurs sécurisés.
      </div>
    </div>
  );
}