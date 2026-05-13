"use client";

import { User, Shield, FileText, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/server/better-auth/client";
import { useRouter } from "next/navigation";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: "infos" | "security" | "rgpd") => void;
}

export function SidebarNav({ activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push("/auth/connexion") },
    });
  };

  const tabs = [
    { id: "infos", icon: User, label: "Mes informations" },
    { id: "security", icon: Shield, label: "Sécurité" },
    { id: "rgpd", icon: FileText, label: "Confidentialité (RGPD)" },
  ] as const;

  return (
    <aside className="-mx-4 w-auto shrink-0 overflow-x-auto px-4 md:mx-0 md:w-64 md:overflow-visible md:px-0">
      <nav className="flex min-w-max gap-2 md:min-w-0 md:flex-col">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all md:shrink ${
              activeTab === tab.id
                ? "bg-brand text-white shadow-md"
                : "hover:bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-5 w-5" /> {tab.label}
          </button>
        ))}

        <div className="bg-border my-2 hidden h-[1px] md:block" />

        <button
          onClick={handleSignOut}
          disabled={isLoggingOut}
          className="text-destructive hover:bg-destructive/10 flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all md:shrink"
        >
          {isLoggingOut ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
          Se déconnecter
        </button>
      </nav>
    </aside>
  );
}
