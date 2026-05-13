import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/server/better-auth/config";
import { db } from "@/server/db";
import { NavbarPrivate } from "@/components/NavbarPrivate";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(), // Requis par Better Auth avec le App Router
  });

  if (!session) {
    redirect("/auth/connexion");
  }

  const [user, menus] = await Promise.all([
    db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, isActif: true },
    }),
    db.menu.findMany({
      orderBy: { ordreAffichage: "asc" },
      select: { label: true, url: true },
    }),
  ]);

  if (!user?.isActif) {
    redirect("/auth/connexion");
  }

  return (
    <div className="bg-background selection:bg-brand/20 selection:text-brand-dark flex min-h-screen flex-col">
      <NavbarPrivate isAdmin={user.role === "ADMIN"} menus={menus} />

      <main className="flex-1">{children}</main>
    </div>
  );
}
