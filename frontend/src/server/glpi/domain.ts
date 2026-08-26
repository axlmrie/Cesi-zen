import type { GlpiStatusPresentation } from "./types";

const unknownStatus = {
  label: "Statut inconnu",
  tone: "neutral",
  progress: 0,
} as const satisfies GlpiStatusPresentation;

const statusPresentations = new Map<number, GlpiStatusPresentation>([
  [1, { label: "Nouveau", tone: "info", progress: 10 }],
  [
    2,
    {
      label: "En cours (attribué)",
      tone: "info",
      progress: 35,
    },
  ],
  [
    3,
    {
      label: "En cours (planifié)",
      tone: "info",
      progress: 50,
    },
  ],
  [4, { label: "En attente", tone: "warning", progress: 60 }],
  [5, { label: "Résolu", tone: "success", progress: 90 }],
  [6, { label: "Clos", tone: "neutral", progress: 100 }],
  [
    10,
    {
      label: "En attente d’approbation",
      tone: "warning",
      progress: 20,
    },
  ],
]);

export function getGlpiStatus(code: number): GlpiStatusPresentation {
  return statusPresentations.get(code) ?? unknownStatus;
}
