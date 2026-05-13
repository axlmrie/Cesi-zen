import { Brain, Heart, Wind } from "lucide-react";

const stats = [
  {
    label: "Niveau de Stress",
    value: "Modéré",
    subValue: "185 pts",
    icon: Brain,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    label: "Humeur Moyenne",
    value: "Stable",
    subValue: "7 derniers jours",
    icon: Heart,
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    label: "Séances Respiration",
    value: "12",
    subValue: "Cette semaine",
    icon: Wind,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

export function StatsOverview() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-10 lg:grid-cols-3 lg:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-border bg-card rounded-3xl border p-5 shadow-sm sm:p-6"
        >
          <div className="flex min-w-0 items-center gap-4">
            <div className={`shrink-0 rounded-2xl p-3 ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-muted-foreground text-sm font-medium">
                {stat.label}
              </p>
              <h3 className="text-foreground text-xl font-bold">
                {stat.value}
              </h3>
              <p className="text-muted-foreground mt-1 text-xs">
                {stat.subValue}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
