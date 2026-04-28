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
    if (!entrees || entrees.length === 0) return [];

    const grouped = entrees.reduce((acc, entree) => {
      const dayKey = getDayKey(entree.dateEnregistrement);
      if (!acc[dayKey]) {
        acc[dayKey] = {
          date: entree.dateEnregistrement,
          entries: [],
        };
      }
      acc[dayKey].entries.push(entree);
      return acc;
    }, {} as Record<string, { date: Date; entries: JournalEntry[] }>);

    return Object.values(grouped).sort((a, b) => a.date.getTime() - b.date.getTime());
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
    if (currentPageIndex > 0) setCurrentPageIndex((prev) => prev - 1);
  };

  const nextPage = () => {
    if (currentPageIndex < totalPages - 1) setCurrentPageIndex((prev) => prev + 1);
  };

  // 4. Extraction des données pour l'affichage courant
  const startIndex = currentPageIndex * daysPerPage;
  const leftPageData = pagesData[startIndex];
  const rightPageData = isMobile ? undefined : pagesData[startIndex + 1];

  if (pagesData.length === 0) {
    return (
      <div className="bg-secondary/20 border border-border p-8 rounded-3xl text-center h-full flex flex-col items-center justify-center min-h-[500px]">
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <p className="text-muted-foreground">Votre journal intime est vide.</p>
        <p className="text-sm text-muted-foreground mt-2">Écrivez votre première émotion pour commencer votre carnet.</p>
      </div>
    );
  }

  const PageView = ({ data, isRightPage }: { data: typeof leftPageData | undefined, isRightPage?: boolean }) => {
    if (!data) return <div className="h-full flex items-center justify-center text-muted-foreground italic">Page blanche</div>;

    const sortedEntries = [...data.entries].sort((a, b) => a.dateEnregistrement.getTime() - b.dateEnregistrement.getTime());

    return (
      <div className={`h-full relative ${isRightPage ? 'pl-2' : 'pr-2'}`}>
        <div className="mb-6 pb-2 border-b-2 border-brand/20 text-center">
          <h3 className="font-serif text-xl font-bold text-foreground capitalize">
            {data.date.toLocaleDateString("fr-FR", { weekday: 'long', day: 'numeric', month: 'long' })}
          </h3>
          <p className="text-xs text-muted-foreground">{data.date.getFullYear()}</p>
        </div>

        <div className="space-y-6">
          {sortedEntries.map((entree) => (
            <article key={entree.id} className="relative">
              <span className="absolute -left-3 top-1 text-[10px] text-muted-foreground font-medium -rotate-90 origin-left opacity-60">
                {entree.dateEnregistrement.toLocaleTimeString("fr-FR", { hour: '2-digit', minute:'2-digit' })}
              </span>
              
              <div className="ml-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-background border border-border rounded-md text-[10px] font-bold text-brand uppercase tracking-wider shadow-sm">
                    {entree.emotionN2.emotionN1.libelle}
                  </span>
                  <span className="text-foreground text-sm font-bold">
                    {entree.emotionN2.libelle}
                  </span>
                </div>

                {entree.notePersonnelle ? (
                  <p className="text-sm text-foreground/90 leading-relaxed font-serif italic border-l-2 border-border pl-3 ml-1">
                    "{entree.notePersonnelle}"
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground italic ml-1 opacity-50">
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
    <div className="flex flex-col h-full min-h-[500px]">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brand" /> Mon Carnet
        </h2>
        <div className="flex items-center gap-3 bg-secondary/30 px-3 py-1 rounded-full border border-border">
          <button 
            onClick={prevPage} 
            disabled={currentPageIndex === 0}
            className="p-1.5 rounded-full hover:bg-background hover:shadow-sm text-foreground disabled:opacity-30 transition-all"
            title="Remonter dans le passé"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <span className="text-xs font-bold text-muted-foreground min-w-[60px] text-center">
            {currentPageIndex + 1} / {totalPages}
          </span>
          
          <button 
            onClick={nextPage} 
            disabled={currentPageIndex >= totalPages - 1}
            className="p-1.5 rounded-full hover:bg-background hover:shadow-sm text-foreground disabled:opacity-30 transition-all"
            title="Revenir vers aujourd'hui"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-amber-50 dark:bg-[#1c1917] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border overflow-hidden perspective-1000">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-transparent via-black/10 dark:via-black/40 to-transparent z-20 pointer-events-none shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]" />
        
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 relative z-10" key={currentPageIndex}>
          
          {/* L'affichage de la page de gauche change dynamiquement */}
          <div className="p-6 lg:p-8 animate-in slide-in-from-left-4 duration-500 fade-in">
             <div className="absolute top-0 bottom-0 left-6 lg:left-8 w-[1px] bg-red-400/30 dark:bg-red-900/30 pointer-events-none" />
             <PageView data={leftPageData} />
          </div>

          {/* La page de droite ne s'affiche que sur Desktop (!isMobile) */}
          {!isMobile && (
            <div className="p-8 border-l border-border/50 animate-in slide-in-from-left-4 duration-500 fade-in delay-75">
               <div className="absolute top-0 bottom-0 left-8 w-[1px] bg-red-400/30 dark:bg-red-900/30 pointer-events-none" />
               <PageView data={rightPageData} isRightPage />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}