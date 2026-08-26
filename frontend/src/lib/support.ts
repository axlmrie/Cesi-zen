import { z } from "zod";

export const supportCategoryKeys = [
  "ACCOUNT",
  "TECHNICAL",
  "USAGE",
  "PRIVACY",
  "OTHER",
] as const;

export type SupportCategoryKey = (typeof supportCategoryKeys)[number];

export const supportCategories: ReadonlyArray<{
  key: SupportCategoryKey;
  label: string;
  description: string;
}> = [
  {
    key: "ACCOUNT",
    label: "Compte et connexion",
    description: "Connexion, mot de passe ou accès à votre compte.",
  },
  {
    key: "TECHNICAL",
    label: "Problème technique",
    description: "Erreur, page bloquée ou comportement inattendu.",
  },
  {
    key: "USAGE",
    label: "Utilisation de CESIZen",
    description: "Question sur une fonctionnalité ou besoin d’aide.",
  },
  {
    key: "PRIVACY",
    label: "Données personnelles",
    description: "Confidentialité, export ou exercice de vos droits.",
  },
  {
    key: "OTHER",
    label: "Autre demande",
    description:
      "Suggestion ou demande qui ne correspond pas aux autres choix.",
  },
] as const;

export const supportCategorySchema = z.enum(supportCategoryKeys);

export const supportRequestSchema = z.object({
  category: supportCategorySchema,
  subject: z
    .string()
    .trim()
    .min(5, "Le sujet doit contenir au moins 5 caractères.")
    .max(120, "Le sujet ne doit pas dépasser 120 caractères."),
  description: z
    .string()
    .trim()
    .min(20, "La description doit contenir au moins 20 caractères.")
    .max(4000, "La description ne doit pas dépasser 4 000 caractères."),
});

export type SupportRequest = z.infer<typeof supportRequestSchema>;

export type SupportActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  ticketNumber?: number;
  fieldErrors?: Partial<
    Record<"category" | "subject" | "description", string[]>
  >;
};

export const initialSupportActionState: SupportActionState = {
  status: "idle",
};

export type SupportStatusTone = "neutral" | "info" | "warning" | "success";

export type SupportTicketView = {
  id: string;
  ticketNumber: number;
  subject: string;
  category: SupportCategoryKey;
  statusCode: number;
  statusLabel: string;
  statusDescription: string;
  statusProgress: number;
  statusTone: SupportStatusTone;
  createdAt: Date;
  lastSyncedAt: Date | null;
  syncFailed: boolean;
};

export function getSupportCategory(key: SupportCategoryKey) {
  return supportCategories.find((category) => category.key === key)!;
}

export function parseSupportRequest(formData: FormData): SupportRequest {
  return supportRequestSchema.parse({
    category: formData.get("category"),
    subject: formData.get("subject"),
    description: formData.get("description"),
  });
}
