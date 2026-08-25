import { describe, expect, it } from "vitest";

import {
  buildRgpdAnonymizedUserData,
  cleanOptionalNote,
  createDeletedAccountEmail,
  createSlug,
  determineStressLevel,
  getErrorMessage,
  validateProfileUpdate,
} from "../../src/lib/cesizen";

describe("CESIZen domain edge cases", () => {
  describe("createSlug", () => {
    it("normalizes accented characters and repeated separators", () => {
      expect(createSlug("  Été, santé & bien-être !  ")).toBe(
        "ete-sante-bien-etre",
      );
    });

    it.each(["", "   ", "---", "!!!"])(
      "returns an empty slug when %j contains no usable character",
      (value) => {
        expect(createSlug(value)).toBe("");
      },
    );
  });

  describe("determineStressLevel", () => {
    it.each([
      [149, "Faible"],
      [150, "Modéré"],
      [299, "Modéré"],
      [300, "Élevé"],
    ] as const)("classifies the boundary score %i", (score, expectedLevel) => {
      expect(determineStressLevel(score)).toBe(expectedLevel);
    });

    it.each([
      -1,
      Number.NaN,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ])("rejects the invalid score %s", (score) => {
      expect(() => determineStressLevel(score)).toThrow(/positif/);
    });
  });

  describe("cleanOptionalNote", () => {
    it.each(["", "   ", "\n\t "])("converts %j to null", (value) => {
      expect(cleanOptionalNote(value)).toBeNull();
    });

    it("trims surrounding whitespace without altering the note contents", () => {
      expect(cleanOptionalNote(" \n Respiration   profonde \t")).toBe(
        "Respiration   profonde",
      );
    });
  });

  describe("validateProfileUpdate", () => {
    it.each([13, 120])("accepts the inclusive age boundary %i", (age) => {
      expect(
        validateProfileUpdate({
          firstName: " Alice ",
          lastName: " Martin ",
          age,
        }),
      ).toEqual({
        firstName: "Alice",
        lastName: "Martin",
        age,
        name: "Alice Martin",
      });
    });

    it.each([12, 121, 25.5, Number.NaN])(
      "rejects the invalid age %s",
      (age) => {
        expect(() =>
          validateProfileUpdate({
            firstName: "Alice",
            lastName: "Martin",
            age,
          }),
        ).toThrow(/13 et 120/);
      },
    );
  });

  describe("getErrorMessage", () => {
    it("returns the message carried by an Error", () => {
      expect(
        getErrorMessage(new Error("Échec explicite"), "Erreur générique"),
      ).toBe("Échec explicite");
    });

    it.each([new Error(""), "Échec brut", null, undefined, { message: "Non" }])(
      "uses the fallback for an unsupported error value",
      (error) => {
        expect(getErrorMessage(error, "Erreur générique")).toBe(
          "Erreur générique",
        );
      },
    );
  });

  describe("RGPD anonymization", () => {
    it("trims the identifier and builds deterministic anonymized data", () => {
      expect(createDeletedAccountEmail("  user-123  ")).toBe(
        "deleted-user-123@deleted.local",
      );
      expect(buildRgpdAnonymizedUserData("  user-123  ")).toEqual({
        name: "Compte supprime",
        email: "deleted-user-123@deleted.local",
        emailVerified: false,
        image: null,
        firstName: "Compte",
        lastName: "Supprime",
        age: null,
        role: "USER",
        isActif: false,
        dateConsentement: null,
      });
    });

    it.each(["", "   ", "\n\t"])(
      "rejects the empty identifier %j",
      (userId) => {
        expect(() => createDeletedAccountEmail(userId)).toThrow(/obligatoire/);
        expect(() => buildRgpdAnonymizedUserData(userId)).toThrow(
          /obligatoire/,
        );
      },
    );
  });
});
