"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Save,
} from "lucide-react";

import { RGPDModal } from "@/components/RGPDModal";
import { authClient } from "@/server/better-auth/client";
import { saveDiagnosticScore } from "../actions";

type DiagnosticItem = {
  id: string;
  label: string;
  points: number;
};

type ResultMessage = {
  label: string;
  desc: string;
};

type ResultMessages = {
  faible: ResultMessage;
  modere: ResultMessage;
  eleve: ResultMessage;
};

export function DiagnosticClient({
  items,
  resultMessages,
}: {
  items: DiagnosticItem[];
  resultMessages: ResultMessages;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const totalScore = items
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.points, 0);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const getRiskLevel = () => {
    if (totalScore >= 300) {
      return {
        ...resultMessages.eleve,
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
      };
    }

    if (totalScore >= 150) {
      return {
        ...resultMessages.modere,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
      };
    }

    return {
      ...resultMessages.faible,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    };
  };

  const risk = getRiskLevel();

  const handleSaveScore = async () => {
    if (!session) {
      router.push("/auth/inscription");
      return;
    }

    setIsSaving(true);
    try {
      const result = await saveDiagnosticScore(totalScore, selectedIds);
      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        alert(result.error ?? "Une erreur est survenue lors de la sauvegarde.");
      }
    } catch (error) {
      console.error(error);
      alert("Impossible de sauvegarder le resultat.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-20">
      <RGPDModal />

      <main className="mx-auto max-w-3xl px-6 pt-12">
        {!isFinished ? (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <header className="mb-10 text-center">
              <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">
                Evaluez votre niveau de stress
              </h1>
              <p className="text-muted-foreground">
                Cochez les evenements survenus dans votre vie ces 12 derniers
                mois.
              </p>
            </header>

            <div className="space-y-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex w-full items-center justify-between rounded-lg border-2 p-4 transition-all ${
                    selectedIds.includes(item.id)
                      ? "border-brand bg-brand/5 ring-1 ring-brand"
                      : "border-border bg-card hover:border-brand/30"
                  }`}
                >
                  <span className="text-left font-medium text-foreground">
                    {item.label}
                  </span>
                  <span className="ml-3 shrink-0 text-sm font-semibold text-muted-foreground">
                    {item.points} pts
                  </span>
                  <div
                    className={`ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                      selectedIds.includes(item.id)
                        ? "border-brand bg-brand"
                        : "border-border"
                    }`}
                  >
                    {selectedIds.includes(item.id) && (
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="sticky bottom-6 mt-10 flex items-center justify-between rounded-lg border border-border bg-background/90 p-4 shadow-xl backdrop-blur-md">
              <div className="px-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Score actuel
                </p>
                <p className="text-2xl font-bold text-brand">
                  {totalScore}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    pts
                  </span>
                </p>
              </div>
              <button
                onClick={() => setIsFinished(true)}
                className="rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white transition-all hover:bg-brand-dark sm:px-8"
              >
                Terminer
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in zoom-in-95 text-center duration-500">
            <div className={`mb-6 inline-flex rounded-lg p-4 ${risk.bg}`}>
              <AlertTriangle className={`h-12 w-12 ${risk.color}`} />
            </div>

            <h2 className="mb-2 font-heading text-4xl font-bold text-foreground">
              {totalScore} Points
            </h2>
            <p className={`mb-6 text-xl font-bold ${risk.color}`}>
              {risk.label}
            </p>

            <div className={`mb-10 rounded-lg border-2 p-6 ${risk.bg} ${risk.border}`}>
              <p className="whitespace-pre-line leading-relaxed text-foreground">
                {risk.desc}
              </p>
            </div>

            <div className="grid gap-4">
              <button
                onClick={handleSaveScore}
                disabled={isSaving}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-4 font-bold text-white shadow-lg transition-all hover:shadow-brand/20 disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Sauvegarde...
                  </>
                ) : session ? (
                  <>
                    <Save className="h-5 w-5" /> Enregistrer dans mon profil
                  </>
                ) : (
                  "Creer un compte pour sauvegarder"
                )}
              </button>

              <button
                onClick={() => {
                  setSelectedIds([]);
                  setIsFinished(false);
                }}
                className="flex items-center justify-center gap-2 py-2 text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="h-4 w-4" /> Recommencer le test
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
