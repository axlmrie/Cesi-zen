import Link from "next/link";
import {
  Activity,
  BookOpenText,
  ClipboardList,
  HeartPulse,
  Home,
  ShieldCheck,
  Smile,
  Users,
  Wind,
} from "lucide-react";

import { requireAdminPage } from "@/server/admin";

const adminLinks = [
  { href: "/admin", label: "Vue generale", icon: Activity },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: Users },
  { href: "/admin/informations", label: "Informations", icon: BookOpenText },
  { href: "/admin/diagnostic", label: "Diagnostic", icon: ClipboardList },
  { href: "/admin/respiration", label: "Respiration", icon: Wind },
  { href: "/admin/emotions", label: "Emotions", icon: Smile },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdminPage();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 py-4 sm:px-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/admin" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-heading text-xl font-bold text-foreground">
                Administration CESIZen
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                Connecte en tant que {admin.email}
              </span>
            </span>
          </Link>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-brand"
            >
              <Home className="h-4 w-4" />
              Espace utilisateur
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              <HeartPulse className="h-4 w-4" />
              Site public
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 px-3 py-5 sm:px-4 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6 lg:py-6">
        <aside className="-mx-3 overflow-x-auto px-3 sm:-mx-4 sm:px-4 lg:sticky lg:top-6 lg:mx-0 lg:self-start lg:overflow-visible lg:px-0">
          <nav className="flex min-w-max gap-2 rounded-lg border border-border bg-card p-2 lg:grid lg:min-w-0">
            {adminLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:shrink"
                >
                  <Icon className="h-4 w-4 text-brand" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
