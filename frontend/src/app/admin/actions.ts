"use server";

import { randomUUID } from "node:crypto";

import { hashPassword } from "better-auth/crypto";
import { revalidatePath } from "next/cache";

import { createSlug } from "@/lib/cesizen";
import {
  assertUserCanLoseActiveAdminAccess,
  runSerializableTransaction,
} from "@/server/active-admin";
import { requireAdminAction } from "@/server/admin";
import { db } from "@/server/db";
import { deleteAndAnonymizeUserAccount } from "@/server/rgpd";

type UserRole = "USER" | "ADMIN";

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalText(formData: FormData, key: string) {
  const value = getText(formData, key);
  return value.length > 0 ? value : null;
}

function getInt(formData: FormData, key: string, fallback = 0) {
  const value = Number.parseInt(getText(formData, key), 10);
  return Number.isFinite(value) ? value : fallback;
}

function getOptionalInt(formData: FormData, key: string) {
  const rawValue = getText(formData, key);
  if (!rawValue) {
    return null;
  }

  const value = Number.parseInt(rawValue, 10);
  return Number.isFinite(value) ? value : null;
}

function getCheckbox(formData: FormData, key: string) {
  const value = formData.get(key);
  return value === "on" || value === "true";
}

function getRole(formData: FormData, key = "role"): UserRole {
  return getText(formData, key) === "ADMIN" ? "ADMIN" : "USER";
}

async function ensureTargetIsNotCurrentAdmin(targetUserId: string) {
  const admin = await requireAdminAction();

  if (targetUserId === admin.id) {
    throw new Error(
      "Vous ne pouvez pas modifier votre propre acces administrateur.",
    );
  }

  return admin;
}

export async function createManagedUser(formData: FormData) {
  await requireAdminAction();

  const firstName = getText(formData, "firstName");
  const lastName = getText(formData, "lastName");
  const email = getText(formData, "email").toLowerCase();
  const password = getText(formData, "password");
  const age = getOptionalInt(formData, "age");
  const role = getRole(formData);

  if (!firstName || !lastName || !email || !password) {
    throw new Error("Prenom, nom, email et mot de passe sont obligatoires.");
  }

  if (password.length < 8) {
    throw new Error("Le mot de passe doit contenir au moins 8 caracteres.");
  }

  const existingUser = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    throw new Error("Un compte existe deja avec cette adresse email.");
  }

  const userId = randomUUID();
  const passwordHash = await hashPassword(password);

  await db.user.create({
    data: {
      id: userId,
      name: `${firstName} ${lastName}`,
      email,
      emailVerified: false,
      firstName,
      lastName,
      age,
      role,
      accounts: {
        create: {
          accountId: userId,
          providerId: "credential",
          password: passwordHash,
        },
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/utilisateurs");
}

export async function updateManagedUserRole(formData: FormData) {
  const userId = getText(formData, "userId");
  const role = getRole(formData);

  if (!userId) {
    throw new Error("Utilisateur introuvable.");
  }

  if (role !== "ADMIN") {
    await ensureTargetIsNotCurrentAdmin(userId);
    await runSerializableTransaction(async (transaction) => {
      await assertUserCanLoseActiveAdminAccess(transaction, userId);
      await transaction.user.update({
        where: { id: userId },
        data: { role },
      });
    });
  } else {
    await requireAdminAction();
    await db.user.update({
      where: { id: userId },
      data: { role },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/utilisateurs");
}

export async function toggleManagedUserStatus(formData: FormData) {
  const userId = getText(formData, "userId");
  const isActif = getCheckbox(formData, "isActif");

  if (!userId) {
    throw new Error("Utilisateur introuvable.");
  }

  if (!isActif) {
    await ensureTargetIsNotCurrentAdmin(userId);
    await runSerializableTransaction(async (transaction) => {
      await assertUserCanLoseActiveAdminAccess(transaction, userId);
      await transaction.user.update({
        where: { id: userId },
        data: { isActif },
      });
      await transaction.session.deleteMany({ where: { userId } });
    });
  } else {
    await requireAdminAction();
    await db.user.update({
      where: { id: userId },
      data: { isActif },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/utilisateurs");
}

export async function anonymizeManagedUser(formData: FormData) {
  const userId = getText(formData, "userId");

  if (!userId) {
    throw new Error("Utilisateur introuvable.");
  }

  await ensureTargetIsNotCurrentAdmin(userId);
  await deleteAndAnonymizeUserAccount(userId);

  revalidatePath("/admin");
  revalidatePath("/admin/utilisateurs");
}

export async function upsertPageInfo(formData: FormData) {
  const admin = await requireAdminAction();

  const id = getOptionalText(formData, "id");
  const titre = getText(formData, "titre");
  const requestedSlug = getText(formData, "slug");
  const contenu = getText(formData, "contenu");
  const isPublie = getCheckbox(formData, "isPublie");
  const slug = createSlug(requestedSlug || titre);

  if (!titre || !slug || !contenu) {
    throw new Error("Titre, slug et contenu sont obligatoires.");
  }

  if (id) {
    await db.pageInfo.update({
      where: { id },
      data: { titre, slug, contenu, isPublie },
    });
  } else {
    await db.pageInfo.create({
      data: {
        titre,
        slug,
        contenu,
        isPublie,
        auteurId: admin.id,
      },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/informations");
  revalidatePath("/informations");
}

export async function deletePageInfo(formData: FormData) {
  await requireAdminAction();

  const id = getText(formData, "id");
  if (!id) {
    throw new Error("Page introuvable.");
  }

  await db.pageInfo.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/admin/informations");
  revalidatePath("/informations");
}

export async function upsertMenu(formData: FormData) {
  await requireAdminAction();

  const id = getOptionalText(formData, "id");
  const label = getText(formData, "label");
  const url = getText(formData, "url");
  const ordreAffichage = getInt(formData, "ordreAffichage", 0);

  if (!label || !url) {
    throw new Error("Le libelle et l'URL du menu sont obligatoires.");
  }

  if (id) {
    await db.menu.update({
      where: { id },
      data: { label, url, ordreAffichage },
    });
  } else {
    await db.menu.create({
      data: { label, url, ordreAffichage },
    });
  }

  revalidatePath("/admin/informations");
  revalidatePath("/");
  revalidatePath("/informations");
}

export async function deleteMenu(formData: FormData) {
  await requireAdminAction();

  const id = getText(formData, "id");
  if (!id) {
    throw new Error("Menu introuvable.");
  }

  await db.menu.delete({ where: { id } });

  revalidatePath("/admin/informations");
  revalidatePath("/");
  revalidatePath("/informations");
}

export async function upsertDiagnosticEvent(formData: FormData) {
  await requireAdminAction();

  const id = getOptionalText(formData, "id");
  const description = getText(formData, "description");
  const points = getInt(formData, "points", 0);
  const isActif = getCheckbox(formData, "isActif");

  if (!description || points < 0) {
    throw new Error("Description obligatoire et points positifs requis.");
  }

  if (id) {
    await db.evenementStress.update({
      where: { id },
      data: { description, points, isActif },
    });
  } else {
    await db.evenementStress.create({
      data: { description, points, isActif: true },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/diagnostic");
  revalidatePath("/diagnostic");
}

export async function deleteDiagnosticEvent(formData: FormData) {
  await requireAdminAction();

  const id = getText(formData, "id");
  if (!id) {
    throw new Error("Evenement introuvable.");
  }

  await db.evenementStress.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/admin/diagnostic");
  revalidatePath("/diagnostic");
}

export async function upsertRespirationExercise(formData: FormData) {
  await requireAdminAction();

  const id = getOptionalText(formData, "id");
  const titre = getText(formData, "titre");
  const inspirationSec = getInt(formData, "inspirationSec", 0);
  const retenueSec = getInt(formData, "retenueSec", 0);
  const expirationSec = getInt(formData, "expirationSec", 0);

  if (!titre || inspirationSec <= 0 || expirationSec <= 0 || retenueSec < 0) {
    throw new Error("Titre, inspiration et expiration valides requis.");
  }

  if (id) {
    await db.exerciceRespiration.update({
      where: { id },
      data: {
        titre,
        inspirationSec,
        retenueSec,
        expirationSec,
        isCustom: false,
      },
    });
  } else {
    await db.exerciceRespiration.create({
      data: {
        titre,
        inspirationSec,
        retenueSec,
        expirationSec,
        isCustom: false,
      },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/respiration");
  revalidatePath("/respiration");
}

export async function deleteRespirationExercise(formData: FormData) {
  await requireAdminAction();

  const id = getText(formData, "id");
  if (!id) {
    throw new Error("Exercice introuvable.");
  }

  await db.exerciceRespiration.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/admin/respiration");
  revalidatePath("/respiration");
}

export async function upsertEmotionNiveau1(formData: FormData) {
  await requireAdminAction();

  const id = getOptionalText(formData, "id");
  const libelle = getText(formData, "libelle");

  if (!libelle) {
    throw new Error("Le libelle est obligatoire.");
  }

  if (id) {
    await db.emotionNiveau1.update({
      where: { id },
      data: { libelle },
    });
  } else {
    await db.emotionNiveau1.create({
      data: { libelle },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/emotions");
  revalidatePath("/journal");
}

export async function deleteEmotionNiveau1(formData: FormData) {
  await requireAdminAction();

  const id = getText(formData, "id");
  if (!id) {
    throw new Error("Emotion introuvable.");
  }

  await db.emotionNiveau1.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/admin/emotions");
  revalidatePath("/journal");
}

export async function upsertEmotionNiveau2(formData: FormData) {
  await requireAdminAction();

  const id = getOptionalText(formData, "id");
  const libelle = getText(formData, "libelle");
  const emotionN1Id = getText(formData, "emotionN1Id");

  if (!libelle || !emotionN1Id) {
    throw new Error("Le libelle et l'emotion de base sont obligatoires.");
  }

  if (id) {
    await db.emotionNiveau2.update({
      where: { id },
      data: { libelle, emotionN1Id },
    });
  } else {
    await db.emotionNiveau2.create({
      data: { libelle, emotionN1Id },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/emotions");
  revalidatePath("/journal");
}

export async function deleteEmotionNiveau2(formData: FormData) {
  await requireAdminAction();

  const id = getText(formData, "id");
  if (!id) {
    throw new Error("Emotion introuvable.");
  }

  await db.emotionNiveau2.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/admin/emotions");
  revalidatePath("/journal");
}
