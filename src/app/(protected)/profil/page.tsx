"use client";

import { useState } from "react";
import { authClient } from "@/server/better-auth/client";
import { SidebarNav } from "./_components/SidebarNav";
import { TabInfos } from "./_components/TabInfos";
import { TabSecurity } from "./_components/TabSecurity";
import { TabRGPD } from "./_components/TabRGPD";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const [activeTab, setActiveTab] = useState<"infos" | "security" | "rgpd">(
    "infos",
  );

  if (!session) {
    return null;
  }

  return (
    <div className="animate-in fade-in mx-auto max-w-4xl px-4 py-6 duration-500 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-foreground text-2xl font-bold sm:text-3xl">
          Mon Espace Personnel
        </h1>
        <p className="text-muted-foreground mt-1">
          Gérez vos informations et vos préférences de confidentialité.
        </p>
      </div>

      <div className="flex min-w-0 flex-col gap-6 md:flex-row md:gap-8">
        <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="border-border bg-card min-h-[400px] min-w-0 flex-1 rounded-3xl border p-5 shadow-sm sm:p-8">
          {activeTab === "infos" && <TabInfos session={session} />}

          {activeTab === "security" && <TabSecurity />}
          {activeTab === "rgpd" && <TabRGPD />}
        </main>
      </div>
    </div>
  );
}
