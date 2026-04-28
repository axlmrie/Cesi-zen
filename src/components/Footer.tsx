import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-4">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <HeartPulse className="h-6 w-6 text-brand" />
              <span className="font-heading text-lg font-bold text-foreground">CESIZen</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Une plateforme dédiée à l'accompagnement de votre santé mentale et à la gestion du stress quotidien.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/informations" className="text-muted-foreground hover:text-brand transition-colors">Articles & Conseils</Link></li>
              <li><Link href="/diagnostic" className="text-muted-foreground hover:text-brand transition-colors">Auto-diagnostic</Link></li>
              <li><Link href="/exercices" className="text-muted-foreground hover:text-brand transition-colors">Exercices de respiration</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-foreground mb-4">Confidentialité</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/mentions-legales" className="text-muted-foreground hover:text-brand transition-colors">Mentions légales</Link></li>
              <li><Link href="/rgpd" className="text-muted-foreground hover:text-brand transition-colors">Protection des données</Link></li>
              <li><Link href="/accessibilite" className="text-muted-foreground hover:text-brand transition-colors">Accessibilité : Partielle</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-foreground mb-4">Ministère</h3>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              Projet porté dans le cadre de la politique de prévention de la santé mentale du Ministère de la Santé.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} CESIZen — Tous droits réservés.</p>
          <p>Conçu pour votre bien-être.</p>
        </div>
      </div>
    </footer>
  );
}