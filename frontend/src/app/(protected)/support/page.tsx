import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LifeBuoy, ShieldCheck } from "lucide-react";

import { auth } from "@/server/better-auth/config";
import { isGlpiConfigured } from "@/server/glpi/client";
import { listSupportTicketsForUser } from "@/server/support";

import { SupportForm } from "./_components/SupportForm";
import { SupportTicketList } from "./_components/SupportTicketList";

export default async function SupportPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/auth/connexion");
  }

  const [tickets, configured] = await Promise.all([
    listSupportTicketsForUser(session.user.id),
    Promise.resolve(isGlpiConfigured()),
  ]);

  return (
    <div className="animate-in fade-in mx-auto max-w-6xl px-4 py-6 duration-500 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <div className="bg-brand/10 text-brand rounded-2xl p-3">
            <LifeBuoy className="h-7 w-7" />
          </div>
          <div>
            <p className="text-brand text-sm font-bold tracking-wide uppercase">
              Centre d’aide
            </p>
            <h1 className="text-foreground text-3xl font-bold sm:text-4xl">
              Support CESIZen
            </h1>
          </div>
        </div>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Envoyez une demande au service support et suivez ici son avancement,
          de sa prise en compte jusqu’à sa clôture.
        </p>
      </header>

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-5">
          <SupportForm enabled={configured} />
          <aside className="border-brand/20 bg-brand/5 rounded-2xl border p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-brand mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <h2 className="text-foreground text-sm font-bold">
                  Données et confidentialité
                </h2>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  Le sujet, la description et une référence technique sont
                  transmis à GLPI. Les tokens GLPI restent exclusivement côté
                  serveur et chaque utilisateur ne voit que ses propres tickets.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <SupportTicketList tickets={tickets} />
      </div>
    </div>
  );
}
