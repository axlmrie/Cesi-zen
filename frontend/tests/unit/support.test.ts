import { describe, expect, it } from "vitest";

import {
  getSupportCategory,
  parseSupportRequest,
  supportCategorySchema,
  supportRequestSchema,
} from "../../src/lib/support";

describe("support request validation", () => {
  it("accepts and trims a valid request", () => {
    expect(
      supportRequestSchema.parse({
        category: "TECHNICAL",
        subject: "  La page du journal reste bloquée  ",
        description:
          "  Après avoir sélectionné une émotion, le bouton ne répond plus.  ",
      }),
    ).toEqual({
      category: "TECHNICAL",
      subject: "La page du journal reste bloquée",
      description:
        "Après avoir sélectionné une émotion, le bouton ne répond plus.",
    });
  });

  it("rejects arbitrary category identifiers", () => {
    expect(() => supportCategorySchema.parse("999")).toThrow();
    expect(() => supportCategorySchema.parse("ADMIN")).toThrow();
  });

  it("enforces subject and description limits", () => {
    expect(() =>
      supportRequestSchema.parse({
        category: "ACCOUNT",
        subject: "Non",
        description: "Description trop courte",
      }),
    ).toThrow();

    expect(() =>
      supportRequestSchema.parse({
        category: "OTHER",
        subject: "x".repeat(121),
        description: "x".repeat(4001),
      }),
    ).toThrow();
  });

  it("parses only the expected fields from form data", () => {
    const formData = new FormData();
    formData.set("category", "PRIVACY");
    formData.set("subject", "Demande relative à mes données");
    formData.set(
      "description",
      "Je souhaite comprendre comment mes données sont exportées.",
    );
    formData.set("userId", "another-user");
    formData.set("glpiCategoryId", "999");

    expect(parseSupportRequest(formData)).toEqual({
      category: "PRIVACY",
      subject: "Demande relative à mes données",
      description: "Je souhaite comprendre comment mes données sont exportées.",
    });
  });

  it("returns the server-owned category metadata", () => {
    expect(getSupportCategory("USAGE")).toMatchObject({
      label: "Utilisation de CESIZen",
    });
  });
});
