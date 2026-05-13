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
    tone === "admin"
      ? ShieldAlert
      : tone === "danger"
        ? AlertTriangle
        : HeartPulse;

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4 py-12">
      <section className="w-full max-w-2xl text-center">
        <div className="bg-brand/10 text-brand mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg">
          <Icon className="h-8 w-8" />
        </div>
        <p className="text-brand text-sm font-bold tracking-wide uppercase">
          {eyebrow}
        </p>
        <h1 className="font-heading text-foreground mt-3 text-3xl font-bold sm:text-4xl">
          {title}
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
          {description}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {onReset && resetLabel ? (
            <button
              onClick={onReset}
              className="bg-brand hover:bg-brand-dark inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold text-white transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              {resetLabel}
            </button>
          ) : null}

          {primaryAction ? (
            <Link
              href={primaryAction.href}
              className="bg-brand hover:bg-brand-dark inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold text-white transition-colors"
            >
              <Home className="h-4 w-4" />
              {primaryAction.label}
            </Link>
          ) : null}

          {secondaryAction ? (
            <Link
              href={secondaryAction.href}
              className="border-border bg-card text-foreground hover:bg-secondary inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-bold transition-colors"
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
