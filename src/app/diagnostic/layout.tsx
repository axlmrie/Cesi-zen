// src/app/diagnostic/layout.tsx

import { headers } from "next/headers";
import { auth } from "@/server/better-auth/config";

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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {session ? <NavbarPrivate /> : <NavbarPublic />}
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}