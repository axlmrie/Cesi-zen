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
      <h2 className="text-xl font-bold mb-4 px-1">Outils rapides</h2>
      <div className="grid gap-4">
        {actions.map((action) => (
          <Link 
            key={action.title} 
            href={action.href}
            className="group flex items-center justify-between p-5 bg-card border border-border rounded-2xl hover:border-brand/50 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl text-white ${action.color}`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">{action.title}</h4>
                <p className="text-sm text-muted-foreground">{action.desc}</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-brand group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </section>
  );
}