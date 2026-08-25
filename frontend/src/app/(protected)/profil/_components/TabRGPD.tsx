"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  AlertCircle,
  FileLock2,
  ShieldCheck,
  Loader2,
} from "lucide-react";
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
      const blob = new Blob([JSON.stringify(result.data, null, 2)], {
        type: "application/json",
      });
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
    <div className="animate-in slide-in-from-right-4 space-y-8 duration-300">
      <div>
        <div className="mb-2 flex items-center gap-3">
          <div className="bg-brand/10 shrink-0 rounded-lg p-2">
            <FileLock2 className="text-brand h-6 w-6" />
          </div>
          <h2 className="text-foreground text-xl font-bold text-balance">
            Confidentialité & Données
          </h2>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          CESIZen applique les directives du RGPD pour protéger votre santé
          mentale et vos données privées. Vous disposez d'un droit d'accès, de
          portabilité et d'effacement.
        </p>
      </div>

      {/* SECTION : EXPORT */}
      <div className="border-border bg-secondary/20 flex flex-col justify-between gap-5 rounded-2xl border p-5 sm:p-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <h4 className="text-foreground flex items-center gap-2 font-bold">
            <Download className="text-brand h-4 w-4" /> Portabilité des données
          </h4>
          <p className="text-muted-foreground text-xs">
            Téléchargez l'intégralité de vos diagnostics et notes de journal au
            format JSON.
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={isLoading}
          className="border-border bg-background hover:border-brand hover:text-brand flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold transition-all"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Exporter mes données
        </button>
      </div>

      {/* SECTION : SUPPRESSION */}
      <div className="border-destructive/20 bg-destructive/5 space-y-4 rounded-2xl border p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="text-destructive mt-1 h-6 w-6 shrink-0" />
          <div>
            <h4 className="text-destructive font-bold">Droit à l'oubli</h4>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              La suppression est définitive. Toutes vos données seront
              anonymisées et votre accès sera révoqué immédiatement. Cette
              action est irréversible.
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
          <div className="animate-in fade-in zoom-in-95 flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-700"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Confirmer la suppression
            </button>
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="text-muted-foreground hover:text-foreground text-sm font-medium"
            >
              Annuler
            </button>
          </div>
        )}
      </div>

      <div className="text-muted-foreground bg-secondary/10 flex items-center gap-2 rounded-lg p-3 text-[11px]">
        <ShieldCheck className="h-3 w-3" />
        Données hébergées en France sur des serveurs sécurisés.
      </div>
    </div>
  );
}
