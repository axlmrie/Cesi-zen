// src/app/diagnostic/layout.tsx

import { headers } from "next/headers";
import { auth } from "@/server/better-auth/config";
import { db } from "@/server/db";

import { NavbarPrivate } from "@/components/NavbarPrivate"; 
import { NavbarPublic } from "@/components/NavbarPublic"; 

export default async function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const [user, menus] = await Promise.all([
    session?.user
      ? db.user.findUnique({
          where: { id: session.user.id },
          select: { role: true, isActif: true },
        })
      : null,
    db.menu.findMany({
      orderBy: { ordreAffichage: "asc" },
      select: { label: true, url: true },
    }),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {session && user?.isActif ? (
        <NavbarPrivate isAdmin={user.role === "ADMIN"} menus={menus} />
      ) : (
        <NavbarPublic menus={menus} />
      )}
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
