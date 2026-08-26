"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/server/better-auth/client";
import {
  Menu,
  X,
  HeartPulse,
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  LogOut,
  User,
  ShieldCheck,
  LifeBuoy,
} from "lucide-react";

type MenuItem = {
  label: string;
  url: string;
};

const reservedMenuUrls = new Set([
  "/dashboard",
  "/journal",
  "/diagnostic",
  "/respiration",
  "/support",
  "/profil",
  "/admin",
]);

export function NavbarPrivate({
  isAdmin = false,
  menus = [],
}: {
  isAdmin?: boolean;
  menus?: MenuItem[];
}) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();

  // Extraction propre du prénom à partir du champ 'name'
  const firstName = session?.user?.name?.split(" ")[0] ?? "";
  const menuLinks = menus.filter((item) => !reservedMenuUrls.has(item.url));

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/connexion");
        },
      },
    });
  };

  return (
    <nav className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          onClick={closeMenu}
          className="focus-visible:ring-brand flex min-w-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-2"
        >
          <HeartPulse className="text-brand h-8 w-8 shrink-0" />
          <span className="font-heading text-foreground truncate text-xl font-bold tracking-tight">
            CESI<span className="text-brand">Zen</span>
          </span>
        </Link>

        <div className="hidden xl:flex xl:items-center xl:gap-5">
          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-brand flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" /> Tableau de bord
          </Link>
          <Link
            href="/journal"
            className="text-muted-foreground hover:text-brand flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors"
          >
            <BookOpen className="h-4 w-4" /> Mon Journal
          </Link>
          <Link
            href="/diagnostic"
            className="text-muted-foreground hover:text-brand flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors"
          >
            <ClipboardCheck className="h-4 w-4" /> Test de stress
          </Link>
          <Link
            href="/support"
            className="text-muted-foreground hover:text-brand flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors"
          >
            <LifeBuoy className="h-4 w-4" /> Support
          </Link>
          {menuLinks.map((item) => (
            <Link
              key={`${item.url}-${item.label}`}
              href={item.url}
              className="text-muted-foreground hover:text-brand text-sm font-medium whitespace-nowrap transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-brand flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors"
            >
              <ShieldCheck className="h-4 w-4" /> Admin
            </Link>
          )}

          <div className="bg-border mx-1 h-6 w-[1px]" />

          {/* LA CORRECTION EST ICI : On utilise la variable firstName */}
          <Link
            href="/profil"
            className="text-foreground hover:text-brand flex items-center gap-2 text-sm font-bold whitespace-nowrap transition-colors"
          >
            <div className="bg-brand/10 text-brand flex h-8 w-8 shrink-0 items-center justify-center rounded-full uppercase">
              {firstName ? firstName.charAt(0) : <User className="h-4 w-4" />}
            </div>
            <span className="hidden lg:block">
              {firstName.length > 0 ? firstName : "Profil"}
            </span>
          </Link>

          <button
            onClick={handleSignOut}
            className="bg-secondary text-secondary-foreground hover:bg-destructive flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold whitespace-nowrap shadow-sm transition-all hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>

        <button
          className="text-foreground focus-visible:ring-brand rounded-lg p-2 outline-none focus-visible:ring-2 xl:hidden"
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
        <div className="border-border bg-background flex max-h-[calc(100dvh-4rem)] flex-col gap-5 overflow-y-auto border-t px-4 py-6 shadow-lg sm:px-6 xl:hidden">
          <div className="mb-2 flex min-w-0 items-center gap-3 px-2">
            {/* ET ICI POUR LE MOBILE */}
            <div className="bg-brand/10 text-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold uppercase">
              {firstName ? firstName.charAt(0) : <User className="h-5 w-5" />}
            </div>
            <div className="min-w-0">
              <p className="text-foreground truncate font-bold">
                {session?.user?.name ?? "Utilisateur"}
              </p>
              <p className="text-muted-foreground truncate text-xs">
                {session?.user?.email}
              </p>
            </div>
          </div>

          <div className="bg-border h-[1px] w-full" />

          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="text-muted-foreground hover:text-brand flex items-center gap-3 text-lg font-medium"
          >
            <LayoutDashboard className="text-brand h-5 w-5" /> Tableau de bord
          </Link>
          <Link
            href="/journal"
            onClick={closeMenu}
            className="text-muted-foreground hover:text-brand flex items-center gap-3 text-lg font-medium"
          >
            <BookOpen className="text-brand h-5 w-5" /> Mon Journal
          </Link>
          <Link
            href="/diagnostic"
            onClick={closeMenu}
            className="text-muted-foreground hover:text-brand flex items-center gap-3 text-lg font-medium"
          >
            <ClipboardCheck className="text-brand h-5 w-5" /> Test de stress
          </Link>
          <Link
            href="/support"
            onClick={closeMenu}
            className="text-muted-foreground hover:text-brand flex items-center gap-3 text-lg font-medium"
          >
            <LifeBuoy className="text-brand h-5 w-5" /> Support
          </Link>
          {menuLinks.map((item) => (
            <Link
              key={`${item.url}-${item.label}`}
              href={item.url}
              onClick={closeMenu}
              className="text-muted-foreground hover:text-brand flex items-center gap-3 text-lg font-medium"
            >
              <BookOpen className="text-brand h-5 w-5" /> {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={closeMenu}
              className="text-muted-foreground hover:text-brand flex items-center gap-3 text-lg font-medium"
            >
              <ShieldCheck className="text-brand h-5 w-5" /> Administration
            </Link>
          )}
          <Link
            href="/profil"
            onClick={closeMenu}
            className="text-muted-foreground hover:text-brand flex items-center gap-3 text-lg font-medium"
          >
            <User className="text-brand h-5 w-5" /> Paramètres
          </Link>

          <div className="border-border mt-2 border-t pt-4">
            <button
              onClick={() => {
                void handleSignOut();
                closeMenu();
              }}
              className="bg-destructive/10 text-destructive hover:bg-destructive flex w-full items-center justify-center gap-3 rounded-xl px-5 py-3 text-lg font-bold transition-all hover:text-white"
            >
              <LogOut className="h-5 w-5" /> Déconnexion
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
