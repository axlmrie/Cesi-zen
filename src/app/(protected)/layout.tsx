import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/server/better-auth/config"; 
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

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-brand/20 selection:text-brand-dark">
      <NavbarPrivate />
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}