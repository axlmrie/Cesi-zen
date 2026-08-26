"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

import { initialSupportActionState, supportCategories } from "@/lib/support";

import { createSupportTicketAction } from "../actions";

export function SupportForm({ enabled }: { enabled: boolean }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    createSupportTicketAction,
    initialSupportActionState,
  );

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      router.refresh();
    }
  }, [router, state.status, state.ticketNumber]);

  return (
    <section className="border-border bg-card rounded-3xl border p-5 shadow-sm sm:p-7">
      <div className="mb-6">
        <h2 className="text-foreground text-xl font-bold">Nouvelle demande</h2>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          Décrivez le problème rencontré. Votre demande sera transmise au
          service support dans GLPI.
        </p>
      </div>

      {!enabled && (
        <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Le service de ticketing est temporairement indisponible. La
          configuration GLPI doit être finalisée par un administrateur.
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-5">
        <div>
          <label
            htmlFor="support-category"
            className="text-foreground mb-2 block text-sm font-semibold"
          >
            Catégorie
          </label>
          <select
            id="support-category"
            name="category"
            required
            defaultValue=""
            disabled={!enabled || isPending}
            aria-describedby="support-category-error"
            className="border-input bg-background focus:border-brand focus:ring-brand/20 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="" disabled>
              Sélectionner une catégorie
            </option>
            {supportCategories.map((category) => (
              <option key={category.key} value={category.key}>
                {category.label} — {category.description}
              </option>
            ))}
          </select>
          <FieldError
            id="support-category-error"
            messages={state.fieldErrors?.category}
          />
        </div>

        <div>
          <label
            htmlFor="support-subject"
            className="text-foreground mb-2 block text-sm font-semibold"
          >
            Sujet
          </label>
          <input
            id="support-subject"
            name="subject"
            type="text"
            required
            minLength={5}
            maxLength={120}
            disabled={!enabled || isPending}
            aria-describedby="support-subject-help support-subject-error"
            className="border-input bg-background focus:border-brand focus:ring-brand/20 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="Ex. Impossible d’accéder à mon journal"
          />
          <p
            id="support-subject-help"
            className="text-muted-foreground mt-1 text-xs"
          >
            Entre 5 et 120 caractères.
          </p>
          <FieldError
            id="support-subject-error"
            messages={state.fieldErrors?.subject}
          />
        </div>

        <div>
          <label
            htmlFor="support-description"
            className="text-foreground mb-2 block text-sm font-semibold"
          >
            Description
          </label>
          <textarea
            id="support-description"
            name="description"
            required
            minLength={20}
            maxLength={4000}
            rows={7}
            disabled={!enabled || isPending}
            aria-describedby="support-description-help support-description-error"
            className="border-input bg-background focus:border-brand focus:ring-brand/20 w-full resize-y rounded-xl border px-4 py-3 text-sm leading-relaxed outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="Indiquez les étapes effectuées, le résultat attendu et le message d’erreur éventuel."
          />
          <p
            id="support-description-help"
            className="text-muted-foreground mt-1 text-xs leading-relaxed"
          >
            Ne communiquez jamais de mot de passe, de token ou de donnée de
            santé. Le contenu sera transmis à l’équipe support via GLPI.
          </p>
          <FieldError
            id="support-description-error"
            messages={state.fieldErrors?.description}
          />
        </div>

        {state.status !== "idle" && state.message && (
          <div
            role={state.status === "error" ? "alert" : "status"}
            className={`flex items-start gap-3 rounded-2xl border p-4 text-sm ${
              state.status === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-destructive/20 bg-destructive/5 text-destructive"
            }`}
          >
            {state.status === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            )}
            <span>{state.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!enabled || isPending}
          className="bg-brand hover:bg-brand-dark focus-visible:ring-brand flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-5 w-5" />
          {isPending ? "Envoi en cours…" : "Envoyer la demande"}
        </button>
      </form>
    </section>
  );
}

function FieldError({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages?.length) {
    return null;
  }

  return (
    <p id={id} className="text-destructive mt-1 text-xs" role="alert">
      {messages[0]}
    </p>
  );
}
