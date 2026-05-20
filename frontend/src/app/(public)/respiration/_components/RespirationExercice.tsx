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
  const [selectedExercice, setSelectedExercice] = useState<Exercice>(
    exercices[0]!,
  );

  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [durationInMinutes, setDurationInMinutes] = useState(3);
  const [timeLeft, setTimeLeft] = useState(durationInMinutes * 60);
  const [phase, setPhase] = useState<
    "Prêt" | "Inspirer" | "Retenir" | "Expirer"
  >("Prêt");

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
              phaseTimer = setTimeout(
                runCycle,
                selectedExercice.expirationSec * 1000,
              );
            }, selectedExercice.retenueSec * 1000);
          } else {
            setPhase("Expirer");
            phaseTimer = setTimeout(
              runCycle,
              selectedExercice.expirationSec * 1000,
            );
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
    if (isActive) {
      return;
    }
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
    if (phase === "Inspirer") {
      return `${selectedExercice.inspirationSec}s`;
    }
    if (phase === "Expirer") {
      return `${selectedExercice.expirationSec}s`;
    }
    if (phase === "Retenir") {
      return `${selectedExercice.retenueSec}s`;
    }
    return "1s";
  };

  if (!exercices || exercices.length === 0) {
    return (
      <div className="bg-destructive/10 text-destructive mx-auto mt-10 max-w-md rounded-2xl p-5 text-center sm:mt-20 sm:p-6">
        Aucun exercice de respiration n'a été trouvé dans la base de données.
        L'administrateur doit en créer un.
      </div>
    );
  }

  return (
    <div className="animate-in fade-in mx-auto flex min-h-[calc(100dvh-5rem)] max-w-4xl flex-col items-center justify-center px-4 py-6 duration-500 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8 w-full text-center sm:mb-10">
        <h1 className="font-heading text-foreground flex items-center justify-center gap-3 text-2xl font-bold text-balance sm:text-3xl">
          <Wind className="h-7 w-7 shrink-0 text-teal-500 sm:h-8 sm:w-8" />{" "}
          Respiration Guidée
        </h1>
        <p className="text-muted-foreground mx-auto mt-2 max-w-lg">
          Choisissez un exercice et synchronisez votre souffle avec l'animation.
        </p>
      </div>

      {isFinished ? (
        <div className="animate-in zoom-in-95 w-full max-w-md rounded-3xl border border-teal-200 bg-teal-50 p-6 text-center shadow-sm duration-500 sm:p-10">
          <CheckCircle2 className="mx-auto mb-6 h-20 w-20 text-teal-500" />
          <h2 className="mb-2 text-2xl font-bold text-teal-900">
            Séance terminée
          </h2>
          <p className="mb-8 text-teal-700">
            Bravo ! Vous avez pris {durationInMinutes} minutes pour vous
            recentrer.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={toggleExercise}
              className="w-full rounded-xl bg-teal-500 py-3 font-bold text-white shadow-md transition-all hover:bg-teal-600"
            >
              Refaire une séance
            </button>
            <Link
              href="/"
              className="bg-background border-border text-foreground hover:bg-secondary w-full rounded-xl border py-3 font-bold transition-all"
            >
              Retour a l'accueil
            </Link>
          </div>
        </div>
      ) : (
        <div className="border-border bg-card flex w-full max-w-md flex-col items-center rounded-3xl border p-5 shadow-sm sm:p-8">
          <div className="mb-8 w-full">
            <label className="text-muted-foreground mb-2 block text-center text-xs font-bold tracking-wider uppercase">
              Type d'exercice
            </label>
            <select
              disabled={isActive}
              value={selectedExercice.id}
              onChange={(e) =>
                setSelectedExercice(
                  exercices.find((ex) => ex.id === e.target.value)!,
                )
              }
              className="border-border bg-background w-full rounded-xl border p-3 text-center font-bold outline-none focus:ring-2 focus:ring-teal-500"
            >
              {exercices.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.titre} ({ex.inspirationSec}s -{" "}
                  {ex.retenueSec > 0 ? `${ex.retenueSec}s - ` : ""}
                  {ex.expirationSec}s)
                </option>
              ))}
            </select>
          </div>

          <div className="bg-secondary/50 mb-8 flex rounded-xl p-1 sm:mb-12">
            {[1, 3, 5].map((min) => (
              <button
                key={min}
                onClick={() => changeDuration(min)}
                disabled={isActive}
                className={`rounded-lg px-6 py-2 text-sm font-bold transition-all ${
                  durationInMinutes === min
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground disabled:opacity-50"
                }`}
              >
                {min} min
              </button>
            ))}
          </div>

          <div className="relative mb-8 flex h-48 w-48 items-center justify-center sm:mb-12 sm:h-64 sm:w-64">
            {/* Animation CSS dynamique basée sur les secondes de la BDD */}
            <div
              className={`absolute rounded-full border-4 border-teal-500/50 bg-teal-500/20 shadow-[0_0_40px_rgba(20,184,166,0.3)]`}
              style={{
                width: "100%",
                height: "100%",
                transition: `transform ${getTransitionDuration()} ease-in-out, opacity ${getTransitionDuration()} ease-in-out`,
                transform:
                  phase === "Inspirer"
                    ? "scale(1.2)"
                    : phase === "Retenir"
                      ? "scale(1.2)"
                      : phase === "Expirer"
                        ? "scale(0.6)"
                        : "scale(0.9)",
                opacity:
                  phase === "Inspirer" ? 1 : phase === "Retenir" ? 0.8 : 0.5,
              }}
            />

            <div className="z-10 text-center">
              <h3
                className={`text-xl font-bold transition-colors duration-500 sm:text-2xl ${phase === "Inspirer" ? "text-teal-600" : phase === "Retenir" ? "text-amber-500" : phase === "Expirer" ? "text-teal-800" : "text-foreground"}`}
              >
                {phase}
              </h3>
              <p className="font-heading text-foreground mt-2 text-2xl font-bold tabular-nums sm:text-3xl">
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          <button
            onClick={toggleExercise}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white shadow-lg transition-all ${
              isActive
                ? "bg-red-500 shadow-red-500/20 hover:bg-red-600"
                : "bg-teal-500 shadow-teal-500/20 hover:bg-teal-600"
            }`}
          >
            {isActive ? (
              <>
                <Square className="h-5 w-5 fill-current" /> Arrêter
              </>
            ) : (
              <>
                <Play className="h-5 w-5 fill-current" /> Commencer
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
