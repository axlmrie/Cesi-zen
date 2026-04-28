"use client";

import { useState, useEffect } from "react";
import { Wind, Play, Square, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// Le type correspondant à ton modèle Prisma
type Exercice = {
  id: string;
  titre: string;
  inspirationSec: number;
  expirationSec: number;
  retenueSec: number;
};

export function RespirationExercice({ exercices }: { exercices: Exercice[] }) {
  const [selectedExercice, setSelectedExercice] = useState<Exercice>(exercices[0]!);

  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [durationInMinutes, setDurationInMinutes] = useState(3);
  const [timeLeft, setTimeLeft] = useState(durationInMinutes * 60);
  const [phase, setPhase] = useState<"Prêt" | "Inspirer" | "Retenir" | "Expirer">("Prêt");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      setPhase("Prêt");
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  useEffect(() => {
    let phaseTimer: NodeJS.Timeout;

    if (isActive) {
      const runCycle = () => {
        setPhase("Inspirer");
        
        phaseTimer = setTimeout(() => {
          if (selectedExercice.retenueSec > 0) {
            setPhase("Retenir");
            phaseTimer = setTimeout(() => {
              setPhase("Expirer");
              phaseTimer = setTimeout(runCycle, selectedExercice.expirationSec * 1000);
            }, selectedExercice.retenueSec * 1000);
          } else {
            setPhase("Expirer");
            phaseTimer = setTimeout(runCycle, selectedExercice.expirationSec * 1000);
          }
        }, selectedExercice.inspirationSec * 1000);
      };

      runCycle();
    } else if (!isFinished) {
      setPhase("Prêt");
    }

    return () => clearTimeout(phaseTimer);
  }, [isActive, isFinished, selectedExercice]);

  const toggleExercise = () => {
    if (!isActive && isFinished) {
      setIsFinished(false);
      setTimeLeft(durationInMinutes * 60);
    }
    setIsActive(!isActive);
  };

  const changeDuration = (minutes: number) => {
    if (isActive) return;
    setDurationInMinutes(minutes);
    setTimeLeft(minutes * 60);
    setIsFinished(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getTransitionDuration = () => {
    if (phase === "Inspirer") return `${selectedExercice.inspirationSec}s`;
    if (phase === "Expirer") return `${selectedExercice.expirationSec}s`;
    if (phase === "Retenir") return `${selectedExercice.retenueSec}s`;
    return "1s";
  };

  if (!exercices || exercices.length === 0) {
    return (
      <div className="bg-destructive/10 text-destructive p-6 rounded-2xl text-center max-w-md mx-auto mt-20">
        Aucun exercice de respiration n'a été trouvé dans la base de données. L'administrateur doit en créer un.
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-10 px-6 min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center animate-in fade-in duration-500">
      
      <div className="text-center mb-10 w-full">
        <h1 className="text-3xl font-heading font-bold text-foreground flex items-center justify-center gap-3">
          <Wind className="h-8 w-8 text-teal-500" /> Respiration Guidée
        </h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Choisissez un exercice et synchronisez votre souffle avec l'animation.
        </p>
      </div>

      {isFinished ? (
        <div className="bg-teal-50 border border-teal-200 p-10 rounded-3xl text-center max-w-md w-full animate-in zoom-in-95 duration-500 shadow-sm">
          <CheckCircle2 className="h-20 w-20 text-teal-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-teal-900 mb-2">Séance terminée</h2>
          <p className="text-teal-700 mb-8">Bravo ! Vous avez pris {durationInMinutes} minutes pour vous recentrer.</p>
          
          <div className="flex flex-col gap-3">
            <button onClick={toggleExercise} className="w-full bg-teal-500 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition-all shadow-md">
              Refaire une séance
            </button>
            <Link href="/dashboard" className="w-full bg-background border border-border text-foreground py-3 rounded-xl font-bold hover:bg-secondary transition-all">
              Retour au tableau de bord
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-md bg-card border border-border p-8 rounded-3xl shadow-sm">
          
          <div className="w-full mb-8">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block text-center">Type d'exercice</label>
            <select 
              disabled={isActive}
              value={selectedExercice.id}
              onChange={(e) => setSelectedExercice(exercices.find(ex => ex.id === e.target.value)!)}
              className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-teal-500 outline-none text-center font-bold"
            >
              {exercices.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.titre} ({ex.inspirationSec}s - {ex.retenueSec > 0 ? `${ex.retenueSec}s - ` : ''}{ex.expirationSec}s)
                </option>
              ))}
            </select>
          </div>

          <div className="flex bg-secondary/50 p-1 rounded-xl mb-12">
            {[1, 3, 5].map((min) => (
              <button
                key={min}
                onClick={() => changeDuration(min)}
                disabled={isActive}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  durationInMinutes === min 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground disabled:opacity-50"
                }`}
              >
                {min} min
              </button>
            ))}
          </div>

          <div className="relative flex items-center justify-center w-64 h-64 mb-12">
            {/* Animation CSS dynamique basée sur les secondes de la BDD */}
            <div 
              className={`absolute rounded-full bg-teal-500/20 border-4 border-teal-500/50 shadow-[0_0_40px_rgba(20,184,166,0.3)]`}
              style={{
                width: "100%",
                height: "100%",
                transition: `transform ${getTransitionDuration()} ease-in-out, opacity ${getTransitionDuration()} ease-in-out`,
                transform: phase === "Inspirer" ? "scale(1.2)" : phase === "Retenir" ? "scale(1.2)" : phase === "Expirer" ? "scale(0.6)" : "scale(0.9)",
                opacity: phase === "Inspirer" ? 1 : phase === "Retenir" ? 0.8 : 0.5
              }}
            />
            
            <div className="z-10 text-center">
              <h3 className={`text-2xl font-bold transition-colors duration-500 ${phase === "Inspirer" ? "text-teal-600" : phase === "Retenir" ? "text-amber-500" : phase === "Expirer" ? "text-teal-800" : "text-foreground"}`}>
                {phase}
              </h3>
              <p className="text-3xl font-heading font-bold text-foreground mt-2 tabular-nums">
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          <button 
            onClick={toggleExercise}
            className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${
              isActive ? "bg-red-500 hover:bg-red-600 shadow-red-500/20" : "bg-teal-500 hover:bg-teal-600 shadow-teal-500/20"
            }`}
          >
            {isActive ? (
              <><Square className="h-5 w-5 fill-current" /> Arrêter</>
            ) : (
              <><Play className="h-5 w-5 fill-current" /> Commencer</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}