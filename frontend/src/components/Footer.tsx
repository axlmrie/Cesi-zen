import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-card border-t py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <HeartPulse className="text-brand h-6 w-6" />
              <span className="font-heading text-foreground text-lg font-bold">
                CESIZen
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Une plateforme dédiée à l'accompagnement de votre santé mentale et
              à la gestion du stress quotidien.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-foreground mb-4 font-bold">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/informations"
                  className="text-muted-foreground hover:text-brand transition-colors"
                >
                  Articles & Conseils
                </Link>
              </li>
              <li>
                <Link
                  href="/diagnostic"
                  className="text-muted-foreground hover:text-brand transition-colors"
                >
                  Auto-diagnostic
                </Link>
              </li>
              <li>
                <Link
                  href="/respiration"
                  className="text-muted-foreground hover:text-brand transition-colors"
                >
                  Exercices de respiration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-foreground mb-4 font-bold">
              Confidentialité
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-muted-foreground hover:text-brand transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/rgpd"
                  className="text-muted-foreground hover:text-brand transition-colors"
                >
                  Protection des données
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibilite"
                  className="text-muted-foreground hover:text-brand transition-colors"
                >
                  Accessibilité : Partielle
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-foreground mb-4 font-bold">
              Ministère
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed italic">
              Projet porté dans le cadre de la politique de prévention de la
              santé mentale du Ministère de la Santé.
            </p>
          </div>
        </div>

        <div className="border-border text-muted-foreground mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center text-xs md:flex-row md:text-left">
          <p>© {currentYear} CESIZen — Tous droits réservés.</p>
          <p>Conçu pour votre bien-être.</p>
        </div>
      </div>
    </footer>
  );
}
