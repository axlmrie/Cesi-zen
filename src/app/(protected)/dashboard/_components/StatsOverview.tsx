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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card border border-border p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-xs text-muted-foreground mt-1">{stat.subValue}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}