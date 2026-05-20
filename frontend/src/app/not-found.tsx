import { ErrorState } from "@/components/ErrorState";

export default function NotFound() {
  return (
    <ErrorState
      eyebrow="Page introuvable"
      title="Cette page reste hors de portee"
      description="Le lien utilise ne correspond a aucune page disponible sur CESIZen. Vous pouvez revenir a l'accueil ou reprendre votre parcours depuis votre tableau de bord."
      primaryAction={{ href: "/", label: "Accueil" }}
      secondaryAction={{ href: "/dashboard", label: "Tableau de bord" }}
    />
  );
}
