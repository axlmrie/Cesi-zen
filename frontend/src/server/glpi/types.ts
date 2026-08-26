export const glpiCategoryEnvironmentVariables = {
  account: "GLPI_CATEGORY_ACCOUNT_ID",
  technical: "GLPI_CATEGORY_TECHNICAL_ID",
  usage: "GLPI_CATEGORY_USAGE_ID",
  privacy: "GLPI_CATEGORY_PRIVACY_ID",
  other: "GLPI_CATEGORY_OTHER_ID",
} as const;

export type GlpiCategoryKey = keyof typeof glpiCategoryEnvironmentVariables;

export type GlpiCategoryIds = Readonly<Record<GlpiCategoryKey, number>>;

export type CreateGlpiTicketInput = Readonly<{
  subject: string;
  content: string;
  categoryId?: number;
}>;

export type GlpiTicket = Readonly<{
  id: number;
  status: number;
  dateModified?: string;
}>;

export type GlpiStatusTone = "neutral" | "info" | "warning" | "success";

export type GlpiStatusPresentation = Readonly<{
  label: string;
  tone: GlpiStatusTone;
  progress: number;
}>;

export type GlpiClientErrorCode =
  | "CONFIGURATION"
  | "VALIDATION"
  | "TIMEOUT"
  | "AUTHENTICATION"
  | "NOT_FOUND"
  | "INVALID_RESPONSE"
  | "UNAVAILABLE";

export class GlpiClientError extends Error {
  readonly code: GlpiClientErrorCode;

  constructor(code: GlpiClientErrorCode, message: string) {
    super(message);
    this.name = "GlpiClientError";
    this.code = code;
  }
}
