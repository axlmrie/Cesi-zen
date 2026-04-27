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
    <aside className="w-full md:w-64 shrink-0">
      <nav className="flex flex-col gap-2">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === tab.id ? "bg-brand text-white shadow-md" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-5 w-5" /> {tab.label}
          </button>
        ))}
        
        <div className="h-[1px] bg-border my-2" />
        
        <button 
          onClick={handleSignOut} disabled={isLoggingOut}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-destructive hover:bg-destructive/10 transition-all"
        >
          {isLoggingOut ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogOut className="h-5 w-5" />} 
          Se déconnecter
        </button>
      </nav>
    </aside>
  );
}