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
];

export function NavbarPublic({ menus = [] }: { menus?: MenuItem[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = menus.length > 0 ? menus : fallbackMenuItems;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <HeartPulse className="h-8 w-8 text-brand" />
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            CESI<span className="text-brand">Zen</span>
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          {menuItems.map((item) => (
            <Link
              key={`${item.url}-${item.label}`}
              href={item.url}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/auth/connexion"
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-dark"
          >
            Se connecter
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col gap-4 border-t border-border bg-background px-4 py-6 shadow-lg md:hidden">
          {menuItems.map((item) => (
            <Link
              key={`${item.url}-${item.label}`}
              href={item.url}
              onClick={closeMenu}
              className="block text-lg font-medium text-muted-foreground transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-border pt-4">
            <Link
              href="/auth/connexion"
              onClick={closeMenu}
              className="block w-full rounded-lg bg-brand px-5 py-3 text-center text-lg font-bold text-white shadow-sm transition-all hover:bg-brand-dark"
            >
              Se connecter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
