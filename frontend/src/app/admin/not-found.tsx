import { ErrorState } from "@/components/ErrorState";

export default function AdminNotFound() {
  return (
    <ErrorState
      eyebrow="Acces admin"
      title="Espace administrateur indisponible"
      description="Cette zone est reservee aux comptes administrateurs actifs. Si vous pensez devoir y acceder, verifiez le role du compte dans la base de donnees."
      primaryAction={{ href: "/dashboard", label: "Tableau de bord" }}
      secondaryAction={{ href: "/", label: "Site public" }}
      tone="admin"
    />
  );
}
