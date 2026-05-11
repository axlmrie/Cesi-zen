"use client";

import { ErrorState } from "@/components/ErrorState";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <ErrorState
      eyebrow="Erreur temporaire"
      title="Une pause technique est necessaire"
      description="La page demandee ne peut pas etre affichee pour le moment. Vous pouvez relancer le chargement ou revenir a l'accueil."
      resetLabel="Reessayer"
      onReset={reset}
      primaryAction={{ href: "/", label: "Accueil" }}
      tone="danger"
    />
  );
}
