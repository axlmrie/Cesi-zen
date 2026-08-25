"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

type JournalEntry = {
  id: string;
  notePersonnelle: string | null;
  dateEnregistrement: Date;
  emotionN2: {
    libelle: string;
    emotionN1: {
      libelle: string;
    };
  };
};

const getDayKey = (date: Date) => date.toLocaleDateString("fr-FR");

export function JournalLivre({ entrees }: { entrees: JournalEntry[] }) {
  // 1. Détection de la taille de l'écran (Mobile vs Desktop)
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Vérifie si on est sur un écran large au chargement
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1024);

    // On appelle la fonction tout de suite
    checkScreenSize();

    // On écoute les redimensionnements
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 2. Grouper et trier les données (Du plus ancien au plus récent)
  const pagesData = useMemo(() => {
    if (!entrees || entrees.length === 0) {
      return [];
    }

    const grouped = entrees.reduce(
      (acc, entree) => {
        const dayKey = getDayKey(entree.dateEnregistrement);
        acc[dayKey] ??= {
          date: entree.dateEnregistrement,
          entries: [],
        };
        acc[dayKey].entries.push(entree);
        return acc;
      },
      {} as Record<string, { date: Date; entries: JournalEntry[] }>,
    );

    return Object.values(grouped).sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
    );
  }, [entrees]);

  // 3. Calcul de la pagination dynamique
  // Si mobile: 1 jour par page. Si desktop: 2 jours par page.
  const daysPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(pagesData.length / daysPerPage);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Forcer l'affichage de la dernière page (la plus récente) au chargement
  useEffect(() => {
    if (totalPages > 0) {
      setCurrentPageIndex(totalPages - 1);
    }
  }, [totalPages]);

  // Navigation
  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  // 4. Extraction des données pour l'affichage courant
  const startIndex = currentPageIndex * daysPerPage;
  const leftPageData = pagesData[startIndex];
  const rightPageData = isMobile ? undefined : pagesData[startIndex + 1];

  if (pagesData.length === 0) {
    return (
      <div className="border-border bg-secondary/20 flex min-h-[360px] flex-col items-center justify-center rounded-3xl border p-6 text-center sm:min-h-[500px] sm:p-8">
        <BookOpen className="text-muted-foreground mb-4 h-12 w-12 opacity-50" />
        <p className="text-muted-foreground">Votre journal intime est vide.</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Écrivez votre première émotion pour commencer votre carnet.
        </p>
      </div>
    );
  }

  const PageView = ({
    data,
    isRightPage,
  }: {
    data: typeof leftPageData | undefined;
    isRightPage?: boolean;
  }) => {
    if (!data) {
      return (
        <div className="text-muted-foreground flex h-full items-center justify-center italic">
          Page blanche
        </div>
      );
    }

    const sortedEntries = [...data.entries].sort(
      (a, b) => a.dateEnregistrement.getTime() - b.dateEnregistrement.getTime(),
    );

    return (
      <div className={`relative h-full ${isRightPage ? "pl-2" : "pr-2"}`}>
        <div className="border-brand/20 mb-6 border-b-2 pb-2 text-center">
          <h3 className="text-foreground font-serif text-lg font-bold text-balance capitalize sm:text-xl">
            {data.date.toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h3>
          <p className="text-muted-foreground text-xs">
            {data.date.getFullYear()}
          </p>
        </div>

        <div className="space-y-6">
          {sortedEntries.map((entree) => (
            <article key={entree.id} className="relative">
              <span className="text-muted-foreground absolute top-1 -left-3 origin-left -rotate-90 text-[10px] font-medium opacity-60">
                {entree.dateEnregistrement.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

              <div className="ml-4">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="border-border bg-background text-brand rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-sm">
                    {entree.emotionN2.emotionN1.libelle}
                  </span>
                  <span className="text-foreground min-w-0 text-sm font-bold break-words">
                    {entree.emotionN2.libelle}
                  </span>
                </div>

                {entree.notePersonnelle ? (
                  <p className="border-border text-foreground/90 ml-1 border-l-2 pl-3 font-serif text-sm leading-relaxed break-words italic">
                    "{entree.notePersonnelle}"
                  </p>
                ) : (
                  <p className="text-muted-foreground ml-1 text-xs italic opacity-50">
                    Sans commentaire
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-[420px] flex-col sm:min-h-[500px] lg:h-full">
      <div className="mb-4 flex items-center justify-between gap-3 px-1 sm:px-2">
        <h2 className="text-foreground flex min-w-0 items-center gap-2 font-bold">
          <BookOpen className="text-brand h-5 w-5" /> Mon Carnet
        </h2>
        <div className="border-border bg-secondary/30 flex shrink-0 items-center gap-2 rounded-full border px-2 py-1 sm:gap-3 sm:px-3">
          <button
            onClick={prevPage}
            disabled={currentPageIndex === 0}
            className="hover:bg-background text-foreground rounded-full p-1.5 transition-all hover:shadow-sm disabled:opacity-30"
            title="Remonter dans le passé"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="text-muted-foreground min-w-[60px] text-center text-xs font-bold">
            {currentPageIndex + 1} / {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPageIndex >= totalPages - 1}
            className="hover:bg-background text-foreground rounded-full p-1.5 transition-all hover:shadow-sm disabled:opacity-30"
            title="Revenir vers aujourd'hui"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="perspective-1000 border-border relative flex-1 overflow-hidden rounded-xl border bg-amber-50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:bg-[#1c1917]">
        <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-20 -ml-4 hidden w-8 bg-gradient-to-r from-transparent via-black/10 to-transparent shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] lg:block dark:via-black/40" />

        <div
          className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-2"
          key={currentPageIndex}
        >
          {/* L'affichage de la page de gauche change dynamiquement */}
          <div className="animate-in fade-in slide-in-from-left-4 p-5 duration-500 sm:p-6 lg:p-8">
            <div className="pointer-events-none absolute top-0 bottom-0 left-6 w-[1px] bg-red-400/30 lg:left-8 dark:bg-red-900/30" />
            <PageView data={leftPageData} />
          </div>

          {/* La page de droite ne s'affiche que sur Desktop (!isMobile) */}
          {!isMobile && (
            <div className="border-border/50 animate-in slide-in-from-left-4 fade-in border-l p-8 delay-75 duration-500">
              <div className="pointer-events-none absolute top-0 bottom-0 left-8 w-[1px] bg-red-400/30 dark:bg-red-900/30" />
              <PageView data={rightPageData} isRightPage />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
