import { ClipboardCheck, BookOpen, Clock } from "lucide-react";

// Le type des données que nous allons formater depuis le serveur
export type HistoryItem = {
  id: string;
  type: "diagnostic" | "journal";
  title: string;
  desc: string;
  date: Date;
};

export function RecentHistory({ items }: { items: HistoryItem[] }) {
  if (items.length === 0) {
    return (
      <div className="border-border bg-secondary/50 rounded-3xl border p-5 sm:p-6">
        <h3 className="text-foreground mb-2 flex items-center gap-2 font-bold">
          <Clock className="text-brand h-5 w-5" /> Historique récent
        </h3>
        <p className="text-muted-foreground mt-4 text-center text-sm italic">
          Aucune activité récente. Commencez par faire un diagnostic !
        </p>
      </div>
    );
  }

  return (
    <div className="border-border bg-secondary/50 rounded-3xl border p-5 sm:p-6">
      <h3 className="text-foreground mb-4 flex items-center gap-2 font-bold">
        <Clock className="text-brand h-5 w-5" /> Historique récent
      </h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-border/50 bg-background flex min-w-0 items-start gap-3 rounded-2xl border p-3 shadow-sm"
          >
            <div
              className={`mt-0.5 shrink-0 rounded-xl p-2 ${item.type === "diagnostic" ? "bg-brand/10 text-brand" : "bg-blue-50 text-blue-500"}`}
            >
              {item.type === "diagnostic" ? (
                <ClipboardCheck className="h-4 w-4" />
              ) : (
                <BookOpen className="h-4 w-4" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-sm font-bold">
                {item.title}
              </p>
              <p className="text-muted-foreground truncate text-xs">
                {item.desc}
              </p>
            </div>
            <div className="text-muted-foreground pt-1 text-[10px] font-medium whitespace-nowrap">
              {item.date.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
