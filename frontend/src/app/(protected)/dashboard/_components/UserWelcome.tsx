"use client";

import { authClient } from "@/server/better-auth/client";

export function UserWelcome() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "Ami";

  return (
    <div className="mb-8 min-w-0">
      <h1 className="font-heading text-foreground text-2xl font-bold text-balance sm:text-3xl">
        Ravi de vous revoir, <span className="text-brand">{firstName}</span> 👋
      </h1>
      <p className="text-muted-foreground mt-1 text-sm sm:text-base">
        Comment vous sentez-vous aujourd'hui ? Prenez un instant pour vous.
      </p>
    </div>
  );
}
