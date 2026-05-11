"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/server/better-auth/client";
import { Menu, X, HeartPulse, LayoutDashboard, BookOpen, ClipboardCheck, LogOut, User, ShieldCheck } from "lucide-react";

type MenuItem = {
  label: string;
  url: string;
};

const reservedMenuUrls = new Set([
  "/dashboard",
  "/journal",
  "/diagnostic",
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
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        
        <Link 
          href="/dashboard" 
          onClick={closeMenu}
          className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-brand rounded-lg outline-none"
        >
          <HeartPulse className="h-8 w-8 text-brand" />
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            CESI<span className="text-brand">Zen</span>
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand transition-colors">
            <LayoutDashboard className="h-4 w-4" /> Tableau de bord
          </Link>
          <Link href="/journal" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand transition-colors">
            <BookOpen className="h-4 w-4" /> Mon Journal
          </Link>
          <Link href="/diagnostic" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand transition-colors">
            <ClipboardCheck className="h-4 w-4" /> Test de stress
          </Link>
          {menuLinks.map((item) => (
            <Link
              key={`${item.url}-${item.label}`}
              href={item.url}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand transition-colors">
              <ShieldCheck className="h-4 w-4" /> Admin
            </Link>
          )}
          
          <div className="h-6 w-[1px] bg-border mx-2" />

          {/* LA CORRECTION EST ICI : On utilise la variable firstName */}
          <Link href="/profil" className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-brand transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand uppercase">
              {firstName ? firstName.charAt(0) : <User className="h-4 w-4" />}
            </div>
            <span className="hidden lg:block">{firstName.length > 0 ? firstName : "Profil"}</span>
          </Link>
          
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground hover:bg-destructive hover:text-white transition-all shadow-sm"
          >
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>

        <button 
          className="md:hidden p-2 text-foreground focus-visible:ring-2 focus-visible:ring-brand rounded-lg outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-6 shadow-lg flex flex-col gap-5">
          <div className="flex items-center gap-3 mb-2 px-2">
             {/* ET ICI POUR LE MOBILE */}
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand font-bold text-lg uppercase">
                {firstName ? firstName.charAt(0) : <User className="h-5 w-5" />}
             </div>
             <div>
               <p className="font-bold text-foreground">{session?.user?.name ?? "Utilisateur"}</p>
               <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
             </div>
          </div>

          <div className="h-[1px] w-full bg-border" />

          <Link href="/dashboard" onClick={closeMenu} className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-brand">
            <LayoutDashboard className="h-5 w-5 text-brand" /> Tableau de bord
          </Link>
          <Link href="/journal" onClick={closeMenu} className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-brand">
            <BookOpen className="h-5 w-5 text-brand" /> Mon Journal
          </Link>
          <Link href="/diagnostic" onClick={closeMenu} className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-brand">
            <ClipboardCheck className="h-5 w-5 text-brand" /> Test de stress
          </Link>
          {menuLinks.map((item) => (
            <Link
              key={`${item.url}-${item.label}`}
              href={item.url}
              onClick={closeMenu}
              className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-brand"
            >
              <BookOpen className="h-5 w-5 text-brand" /> {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" onClick={closeMenu} className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-brand">
              <ShieldCheck className="h-5 w-5 text-brand" /> Administration
            </Link>
          )}
          <Link href="/profil" onClick={closeMenu} className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-brand">
            <User className="h-5 w-5 text-brand" /> Paramètres
          </Link>
          
          <div className="pt-4 border-t border-border mt-2">
            <button 
              onClick={() => { void handleSignOut(); closeMenu(); }}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-destructive/10 px-5 py-3 text-lg font-bold text-destructive hover:bg-destructive hover:text-white transition-all"
            >
              <LogOut className="h-5 w-5" /> Déconnexion
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
