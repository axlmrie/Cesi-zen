export type StressLevel = "Faible" | "Modéré" | "Élevé";

export function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function determineStressLevel(score: number): StressLevel {
  if (!Number.isFinite(score) || score < 0) {
    throw new Error("Le score de stress doit etre un nombre positif.");
  }

  if (score >= 300) {
    return "Élevé";
  }
  if (score >= 150) {
    return "Modéré";
  }
  return "Faible";
}

export function cleanOptionalNote(value: string) {
  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
}

export type ProfileUpdateInput = {
  firstName: string;
  lastName: string;
  age: number;
};

export function validateProfileUpdate(input: ProfileUpdateInput) {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();

  if (!firstName || !lastName) {
    throw new Error("Le prenom et le nom sont obligatoires.");
  }

  if (!Number.isInteger(input.age) || input.age < 13 || input.age > 120) {
    throw new Error("L'age doit etre compris entre 13 et 120 ans.");
  }

  return {
    firstName,
    lastName,
    age: input.age,
    name: `${firstName} ${lastName}`,
  };
}

export function createDeletedAccountEmail(userId: string) {
  const normalizedId = userId.trim();

  if (!normalizedId) {
    throw new Error("L'identifiant utilisateur est obligatoire.");
  }

  return `deleted-${normalizedId}@deleted.local`;
}

export function buildRgpdAnonymizedUserData(userId: string) {
  return {
    name: "Compte supprime",
    email: createDeletedAccountEmail(userId),
    emailVerified: false,
    image: null,
    firstName: "Compte",
    lastName: "Supprime",
    age: null,
    role: "USER" as const,
    isActif: false,
    dateConsentement: null,
  };
}

export function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}
