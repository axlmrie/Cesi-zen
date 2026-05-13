import "server-only";

import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/server/better-auth/config";
import { db } from "@/server/db";

const adminUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  isActif: true,
} as const;

export async function getCurrentUserWithRole() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  return db.user.findUnique({
    where: { id: session.user.id },
    select: adminUserSelect,
  });
}

export async function requireAdminPage() {
  const user = await getCurrentUserWithRole();

  if (!user) {
    redirect("/auth/connexion");
  }

  if (!user.isActif || user.role !== "ADMIN") {
    notFound();
  }

  return user;
}

export async function requireAdminAction() {
  const user = await getCurrentUserWithRole();

  if (!user?.isActif || user.role !== "ADMIN") {
    throw new Error("Action non autorisee.");
  }

  return user;
}
