"use client";

import { ErrorState } from "@/components/ErrorState";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <ErrorState
      eyebrow="Back-office"
      title="Le panneau admin a rencontre une erreur"
      description="L'action ou la page demandee n'a pas pu aboutir. Les donnees sensibles restent protegees, vous pouvez reessayer le chargement."
      resetLabel="Reessayer"
      onReset={reset}
      secondaryAction={{ href: "/admin", label: "Retour admin" }}
      tone="admin"
    />
  );
}
