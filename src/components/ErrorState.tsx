"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  HeartPulse,
  Home,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";

type ErrorAction = {
  href: string;
  label: string;
};

type ErrorStateProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction?: ErrorAction;
  secondaryAction?: ErrorAction;
  resetLabel?: string;
  onReset?: () => void;
  tone?: "public" | "admin" | "danger";
};

export function ErrorState({
  eyebrow = "CESIZen",
  title,
  description,
  primaryAction,
  secondaryAction,
  resetLabel,
  onReset,
  tone = "public",
}: ErrorStateProps) {
  const Icon =
    tone === "admin" ? ShieldAlert : tone === "danger" ? AlertTriangle : HeartPulse;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <section className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <Icon className="h-8 w-8" />
        </div>
        <p className="text-sm font-bold uppercase tracking-wide text-brand">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {onReset && resetLabel ? (
            <button
              onClick={onReset}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
            >
              <RefreshCw className="h-4 w-4" />
              {resetLabel}
            </button>
          ) : null}

          {primaryAction ? (
            <Link
              href={primaryAction.href}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
            >
              <Home className="h-4 w-4" />
              {primaryAction.label}
            </Link>
          ) : null}

          {secondaryAction ? (
            <Link
              href={secondaryAction.href}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              {secondaryAction.label}
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}
