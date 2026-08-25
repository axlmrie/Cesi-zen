import { determineStressLevel, type StressLevel } from "./cesizen";

export type ActiveDiagnosticEvent = {
  id: string;
  points: number;
};

export type DiagnosticItem = ActiveDiagnosticEvent & {
  label: string;
};

export const webFallbackDiagnosticItems: DiagnosticItem[] = [
  { id: "fallback-1", label: "Décès du conjoint", points: 100 },
  { id: "fallback-2", label: "Divorce", points: 73 },
  { id: "fallback-3", label: "Séparation conjugale", points: 65 },
  { id: "fallback-4", label: "Peine de prison", points: 63 },
  { id: "fallback-5", label: "Décès d'un proche parent", points: 63 },
  { id: "fallback-6", label: "Maladie ou accident personnel", points: 53 },
  { id: "fallback-7", label: "Mariage", points: 50 },
  { id: "fallback-8", label: "Licenciement professionnel", points: 47 },
  { id: "fallback-9", label: "Retraite", points: 45 },
  { id: "fallback-10", label: "Grossesse", points: 40 },
  { id: "fallback-11", label: "Difficultés sexuelles", points: 39 },
  {
    id: "fallback-12",
    label: "Changement de situation financière",
    points: 38,
  },
  { id: "fallback-13", label: "Mort d'un ami proche", points: 37 },
  {
    id: "fallback-14",
    label: "Changement de responsabilités au travail",
    points: 29,
  },
  { id: "fallback-15", label: "Déménagement", points: 20 },
];

export const mobileFallbackDiagnosticItems: DiagnosticItem[] = [
  { id: "fallback-1", label: "Décès du conjoint", points: 100 },
  { id: "fallback-2", label: "Divorce", points: 73 },
  { id: "fallback-3", label: "Séparation conjugale", points: 65 },
  { id: "fallback-4", label: "Décès d'un proche parent", points: 63 },
  { id: "fallback-5", label: "Maladie ou accident personnel", points: 53 },
  { id: "fallback-6", label: "Mariage", points: 50 },
  { id: "fallback-7", label: "Licenciement professionnel", points: 47 },
  { id: "fallback-8", label: "Retraite", points: 45 },
  { id: "fallback-9", label: "Grossesse", points: 40 },
  {
    id: "fallback-10",
    label: "Changement de situation financière",
    points: 38,
  },
  { id: "fallback-11", label: "Mort d'un ami proche", points: 37 },
  { id: "fallback-12", label: "Déménagement", points: 20 },
];

function isFallbackEventId(id: string) {
  return id.startsWith("fallback-");
}

export type ResolvedDiagnostic = {
  scoreTotal: number;
  niveauStress: StressLevel;
  responseEventIds: string[];
  fallbackEventIds: string[];
};

/**
 * Returns the event identifiers that are safe to send to Prisma.
 *
 * Keeping this normalization server-side prevents duplicate selections from
 * increasing the score or generating duplicate response rows.
 */
export function getUniqueDiagnosticEventIds(
  selectedEventIds: readonly unknown[],
) {
  return [
    ...new Set(
      selectedEventIds
        .filter((id): id is string => typeof id === "string")
        .map((id) => id.trim())
        .filter(Boolean),
    ),
  ];
}

export function getDatabaseDiagnosticEventIds(
  selectedEventIds: readonly unknown[],
) {
  return getUniqueDiagnosticEventIds(selectedEventIds).filter(
    (id) => !isFallbackEventId(id),
  );
}

/**
 * Resolves the only diagnostic payload that may be persisted.
 *
 * Client-provided scores are never part of this calculation. Database events
 * must have been loaded with `isActif: true`; fallback events are resolved
 * against the server catalogue explicitly selected by the caller.
 */
export function resolveDiagnostic(
  selectedEventIds: readonly unknown[],
  activeEvents: readonly ActiveDiagnosticEvent[],
  fallbackCatalogue: readonly DiagnosticItem[],
): ResolvedDiagnostic {
  const requestedIds = new Set(getUniqueDiagnosticEventIds(selectedEventIds));
  const seenEventIds = new Set<string>();

  const trustedEvents = activeEvents.filter((event) => {
    if (
      isFallbackEventId(event.id) ||
      !requestedIds.has(event.id) ||
      seenEventIds.has(event.id)
    ) {
      return false;
    }

    seenEventIds.add(event.id);
    return true;
  });

  const fallbackEvents = fallbackCatalogue.filter((event) =>
    requestedIds.has(event.id),
  );

  const scoreTotal = [...trustedEvents, ...fallbackEvents].reduce(
    (sum, event) => sum + event.points,
    0,
  );

  return {
    scoreTotal,
    niveauStress: determineStressLevel(scoreTotal),
    responseEventIds: trustedEvents.map((event) => event.id),
    fallbackEventIds: fallbackEvents.map((event) => event.id),
  };
}
