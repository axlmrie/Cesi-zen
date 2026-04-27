"use client"; // Indispensable pour utiliser useState et onClick

import { useState } from "react";
import Link from "next/link";
import { Menu, X, HeartPulse } from "lucide-react"; 

export function NavbarPublic() {
  // Ce state permet de savoir si le menu mobile est ouvert ou fermé
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour fermer le menu quand on clique sur un lien
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        
        {/* Logo */}
        <Link 
          href="/" 
          onClick={closeMenu}
          className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-brand rounded-lg outline-none"
        >
          <HeartPulse className="h-8 w-8 text-brand" />
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            CESI<span className="text-brand">Zen</span>
          </span>
        </Link>

        {/* Navigation Desktop (Cachée sur mobile) */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link href="/informations" className="text-sm font-medium text-muted-foreground hover:text-brand transition-colors">
            Informations
          </Link>
          <Link href="/diagnostic" className="text-sm font-medium text-muted-foreground hover:text-brand transition-colors">
            Test de stress
          </Link>
          <Link 
            href="/auth/connexion" 
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark transition-all shadow-sm"
          >
            Se connecter
          </Link>
        </div>

        {/* Bouton Burger Mobile (Caché sur desktop) */}
        <button 
          className="md:hidden p-2 text-foreground focus-visible:ring-2 focus-visible:ring-brand rounded-lg outline-none" 
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Change l'icône selon l'état du menu */}
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu Déroulant Mobile 
        Il ne s'affiche que si isMenuOpen est true ET qu'on est sur un petit écran
      */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-6 shadow-lg flex flex-col gap-4">
          <Link 
            href="/informations" 
            onClick={closeMenu}
            className="block text-lg font-medium text-muted-foreground hover:text-brand transition-colors"
          >
            Informations
          </Link>
          <Link 
            href="/diagnostic" 
            onClick={closeMenu}
            className="block text-lg font-medium text-muted-foreground hover:text-brand transition-colors"
          >
            Test de stress
          </Link>
          <div className="pt-4 border-t border-border mt-2">
            <Link 
              href="/auth/connexion" 
              onClick={closeMenu}
              className="block w-full text-center rounded-xl bg-brand px-5 py-3 text-lg font-bold text-white hover:bg-brand-dark transition-all shadow-sm"
            >
              Se connecter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}