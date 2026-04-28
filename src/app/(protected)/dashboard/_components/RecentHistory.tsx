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
      <div className="bg-secondary/50 p-6 rounded-3xl border border-border">
        <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
          <Clock className="h-5 w-5 text-brand" /> Historique récent
        </h3>
        <p className="text-sm text-muted-foreground italic mt-4 text-center">
          Aucune activité récente. Commencez par faire un diagnostic !
        </p>
      </div>
    );
  }

  return (
    <div className="bg-secondary/50 p-6 rounded-3xl border border-border">
      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-brand" /> Historique récent
      </h3>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3 bg-background p-3 rounded-2xl border border-border/50 shadow-sm">
            <div className={`p-2 rounded-xl mt-0.5 ${item.type === "diagnostic" ? "bg-brand/10 text-brand" : "bg-blue-50 text-blue-500"}`}>
              {item.type === "diagnostic" ? <ClipboardCheck className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
            </div>
            <div className="text-[10px] text-muted-foreground whitespace-nowrap pt-1 font-medium">
              {item.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}