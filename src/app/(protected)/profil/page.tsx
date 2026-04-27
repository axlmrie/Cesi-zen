"use client";

import { useState } from "react";
import { authClient } from "@/server/better-auth/client";
import { SidebarNav } from "./_components/SidebarNav";
import { TabInfos } from "./_components/TabInfos";
// Tu pourras créer TabSecurity et TabRGPD sur le même modèle !

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const [activeTab, setActiveTab] = useState<"infos" | "security" | "rgpd">("infos");

  if (!session) return null; // Sécurité visuelle avant chargement

  return (
    <div className="container max-w-4xl mx-auto py-10 px-6 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground">Mon Espace Personnel</h1>
        <p className="text-muted-foreground mt-1">Gérez vos informations et vos préférences de confidentialité.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm min-h-[400px]">
          {activeTab === "infos" && <TabInfos session={session} />}
          
          {/* Mettre tes autres composants ici quand tu les auras créés */}
          {activeTab === "security" && <p className="text-muted-foreground animate-in slide-in-from-right-4">Composant Sécurité à intégrer</p>}
          {activeTab === "rgpd" && <p className="text-muted-foreground animate-in slide-in-from-right-4">Composant RGPD à intégrer</p>}
        </main>
      </div>
    </div>
  );
}