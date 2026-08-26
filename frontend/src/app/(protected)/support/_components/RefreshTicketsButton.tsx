"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export function RefreshTicketsButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => router.refresh())}
      className="border-border bg-background text-foreground hover:border-brand/50 focus-visible:ring-brand inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors outline-none focus-visible:ring-2 disabled:opacity-60"
    >
      <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
      {isPending ? "Actualisation…" : "Actualiser"}
    </button>
  );
}
