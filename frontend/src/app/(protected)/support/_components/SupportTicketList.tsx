import { Clock3, Inbox, TicketCheck } from "lucide-react";

import {
  getSupportCategory,
  type SupportStatusTone,
  type SupportTicketView,
} from "@/lib/support";

import { RefreshTicketsButton } from "./RefreshTicketsButton";

const toneClasses: Record<SupportStatusTone, string> = {
  neutral: "border-slate-200 bg-slate-100 text-slate-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  success: "border-green-200 bg-green-50 text-green-700",
};

const progressClasses: Record<SupportStatusTone, string> = {
  neutral: "bg-slate-400",
  info: "bg-blue-500",
  warning: "bg-amber-500",
  success: "bg-green-500",
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function SupportTicketList({
  tickets,
}: {
  tickets: SupportTicketView[];
}) {
  return (
    <section className="border-border bg-card rounded-3xl border p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-foreground text-xl font-bold">Mes demandes</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Les statuts sont synchronisés avec le service support GLPI.
          </p>
        </div>
        <RefreshTicketsButton />
      </div>

      {tickets.length === 0 ? (
        <div className="border-border bg-muted/30 flex flex-col items-center rounded-2xl border border-dashed px-4 py-10 text-center">
          <Inbox className="text-muted-foreground mb-3 h-9 w-9" />
          <p className="text-foreground font-semibold">Aucune demande</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Vos tickets apparaîtront ici après leur création.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => {
            const category = getSupportCategory(ticket.category);

            return (
              <article
                key={ticket.id}
                className="border-border bg-background rounded-2xl border p-4 sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-muted-foreground mb-1 flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono font-semibold">
                        Ticket GLPI #{ticket.ticketNumber}
                      </span>
                      <span aria-hidden="true">•</span>
                      <span>{category.label}</span>
                    </div>
                    <h3 className="text-foreground font-bold break-words">
                      {ticket.subject}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${toneClasses[ticket.statusTone]}`}
                  >
                    <TicketCheck className="h-3.5 w-3.5" />
                    {ticket.statusLabel}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                    <span className="text-muted-foreground">
                      {ticket.statusDescription}
                    </span>
                    <span className="text-foreground font-semibold">
                      {ticket.statusProgress} %
                    </span>
                  </div>
                  <div
                    className="bg-muted h-2 overflow-hidden rounded-full"
                    role="progressbar"
                    aria-label={`Avancement du ticket ${ticket.ticketNumber}`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={ticket.statusProgress}
                  >
                    <div
                      className={`h-full rounded-full transition-all ${progressClasses[ticket.statusTone]}`}
                      style={{ width: `${ticket.statusProgress}%` }}
                    />
                  </div>
                </div>

                <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    Créé le {dateFormatter.format(ticket.createdAt)}
                  </span>
                  {ticket.lastSyncedAt && (
                    <span>
                      Synchronisé le {dateFormatter.format(ticket.lastSyncedAt)}
                    </span>
                  )}
                  {ticket.syncFailed && (
                    <span className="font-medium text-amber-700">
                      Dernier statut connu — GLPI momentanément inaccessible
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
