import Link from "next/link";
import {
  BookOpenText,
  ClipboardList,
  Smile,
  Users,
  Wind,
} from "lucide-react";

import { db } from "@/server/db";

const modules = [
  {
    href: "/admin/utilisateurs",
    label: "Comptes utilisateurs",
    description: "Creer, activer, anonymiser et promouvoir les comptes.",
    icon: Users,
  },
  {
    href: "/admin/informations",
    label: "Informations",
    description: "Administrer les menus et les pages publiques.",
    icon: BookOpenText,
  },
  {
    href: "/admin/diagnostic",
    label: "Diagnostic de stress",
    description: "Configurer les evenements et leurs points associes.",
    icon: ClipboardList,
  },
  {
    href: "/admin/respiration",
    label: "Respiration",
    description: "Gerer les exercices de coherence cardiaque.",
    icon: Wind,
  },
  {
    href: "/admin/emotions",
    label: "Tracker des emotions",
    description: "Maintenir le referentiel niveau 1 et niveau 2.",
    icon: Smile,
  },
];

export default async function AdminDashboardPage() {
  const [
    usersCount,
    activeAdminsCount,
    pagesCount,
    diagnosticEventsCount,
    exercisesCount,
    emotionsCount,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { role: "ADMIN", isActif: true } }),
    db.pageInfo.count(),
    db.evenementStress.count(),
    db.exerciceRespiration.count(),
    db.emotionNiveau2.count(),
  ]);

  const stats = [
    { label: "Comptes", value: usersCount },
    { label: "Admins actifs", value: activeAdminsCount },
    { label: "Pages info", value: pagesCount },
    { label: "Evenements stress", value: diagnosticEventsCount },
    { label: "Exercices", value: exercisesCount },
    { label: "Emotions N2", value: emotionsCount },
  ];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Back-office securise
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Pilotage de la solution CESIZen
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Cet espace couvre les modules demandes dans le sujet : comptes,
          informations, diagnostic, respiration et referentiel des emotions.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-card p-5"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {modules.map((module) => {
          const Icon = module.icon;

          return (
            <Link
              key={module.href}
              href={module.href}
              className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand/40 hover:bg-brand/5"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-heading text-lg font-bold text-foreground">
                    {module.label}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {module.description}
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
