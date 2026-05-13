"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartPulse, Menu, X } from "lucide-react";

type MenuItem = {
  label: string;
  url: string;
};

const fallbackMenuItems: MenuItem[] = [
  { label: "Informations", url: "/informations" },
  { label: "Test de stress", url: "/diagnostic" },
  { label: "Respiration", url: "/respiration" },
];

export function NavbarPublic({ menus = [] }: { menus?: MenuItem[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = menus.length > 0 ? menus : fallbackMenuItems;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          className="focus-visible:ring-brand flex min-w-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-2"
        >
          <HeartPulse className="text-brand h-8 w-8 shrink-0" />
          <span className="font-heading text-foreground truncate text-xl font-bold tracking-tight">
            CESI<span className="text-brand">Zen</span>
          </span>
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-8">
          {menuItems.map((item) => (
            <Link
              key={`${item.url}-${item.label}`}
              href={item.url}
              className="text-muted-foreground hover:text-brand text-sm font-medium whitespace-nowrap transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/auth/connexion"
            className="bg-brand hover:bg-brand-dark rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all"
          >
            Se connecter
          </Link>
        </div>

        <button
          className="text-foreground focus-visible:ring-brand rounded-lg p-2 outline-none focus-visible:ring-2 lg:hidden"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-border bg-background flex max-h-[calc(100dvh-4rem)] flex-col gap-4 overflow-y-auto border-t px-4 py-6 shadow-lg sm:px-6 lg:hidden">
          {menuItems.map((item) => (
            <Link
              key={`${item.url}-${item.label}`}
              href={item.url}
              onClick={closeMenu}
              className="text-muted-foreground hover:text-brand block text-lg font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-border mt-2 border-t pt-4">
            <Link
              href="/auth/connexion"
              onClick={closeMenu}
              className="bg-brand hover:bg-brand-dark block w-full rounded-lg px-5 py-3 text-center text-lg font-bold text-white shadow-sm transition-all"
            >
              Se connecter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
