"use client";

import { authClient } from "@/server/better-auth/client";

export function UserWelcome() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "Ami";

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-heading font-bold text-foreground">
        Ravi de vous revoir, <span className="text-brand">{firstName}</span> 👋
      </h1>
      <p className="text-muted-foreground mt-1">
        Comment vous sentez-vous aujourd'hui ? Prenez un instant pour vous.
      </p>
    </div>
  );
}