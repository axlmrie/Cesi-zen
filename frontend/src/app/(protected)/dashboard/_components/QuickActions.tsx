import Link from "next/link";
import { ClipboardCheck, BookOpen, Wind, ArrowRight } from "lucide-react";

const actions = [
  {
    title: "Diagnostic de stress",
    desc: "Refaire le test de Holmes & Rahe",
    href: "/diagnostic",
    icon: ClipboardCheck,
    color: "bg-brand",
  },
  {
    title: "Journal d'émotions",
    desc: "Noter ce que je ressens",
    href: "/journal",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    title: "Respiration",
    desc: "5 min de cohérence cardiaque",
    href: "/respiration",
    icon: Wind,
    color: "bg-teal-500",
  },
];

export function QuickActions() {
  return (
    <section>
      <h2 className="mb-4 px-1 text-xl font-bold">Outils rapides</h2>
      <div className="grid gap-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group border-border bg-card hover:border-brand/50 flex items-start justify-between gap-4 rounded-2xl border p-4 transition-all hover:shadow-md sm:items-center sm:p-5"
          >
            <div className="flex min-w-0 items-start gap-4 sm:items-center">
              <div
                className={`shrink-0 rounded-xl p-3 text-white ${action.color}`}
              >
                <action.icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-foreground font-bold">{action.title}</h4>
                <p className="text-muted-foreground text-sm">{action.desc}</p>
              </div>
            </div>
            <ArrowRight className="text-muted-foreground group-hover:text-brand mt-3 h-5 w-5 shrink-0 transition-all group-hover:translate-x-1 sm:mt-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
