import Link from "next/link";
import { BookOpenText, ClipboardList, Smile, Users, Wind } from "lucide-react";

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
      <header className="min-w-0">
        <p className="text-brand text-sm font-semibold tracking-wide uppercase">
          Back-office securise
        </p>
        <h1 className="font-heading text-foreground mt-2 text-2xl font-bold text-balance sm:text-3xl">
          Pilotage de la solution CESIZen
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Cet espace couvre les modules demandes dans le sujet : comptes,
          informations, diagnostic, respiration et referentiel des emotions.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-border bg-card min-w-0 rounded-lg border p-5"
          >
            <p className="text-muted-foreground text-sm">{stat.label}</p>
            <p className="text-foreground mt-2 text-3xl font-bold">
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
              className="border-border bg-card hover:border-brand/40 hover:bg-brand/5 min-w-0 rounded-lg border p-5 transition-colors"
            >
              <div className="flex min-w-0 items-start gap-4">
                <span className="bg-brand/10 text-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="font-heading text-foreground block text-lg font-bold text-balance">
                    {module.label}
                  </span>
                  <span className="text-muted-foreground mt-1 block text-sm">
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
