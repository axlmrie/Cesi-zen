import assert from "node:assert/strict";
import { describe, it } from "vitest";

import {
  buildRgpdAnonymizedUserData,
  cleanOptionalNote,
  createDeletedAccountEmail,
  createSlug,
  determineStressLevel,
  validateProfileUpdate,
} from "../../src/lib/cesizen";

void describe("CESIZen domain rules", () => {
  void it("creates stable slugs for information pages", () => {
    assert.equal(createSlug("Comprendre le stress !"), "comprendre-le-stress");
    assert.equal(
      createSlug("  Sante mentale & prevention  "),
      "sante-mentale-prevention",
    );
  });

  void it("classifies diagnostic stress scores", () => {
    assert.equal(determineStressLevel(0), "Faible");
    assert.equal(determineStressLevel(149), "Faible");
    assert.equal(determineStressLevel(150), "Modéré");
    assert.equal(determineStressLevel(300), "Élevé");
  });

  void it("rejects invalid diagnostic scores", () => {
    assert.throws(() => determineStressLevel(-1), /positif/);
    assert.throws(() => determineStressLevel(Number.NaN), /positif/);
  });

  void it("stores journal notes only when useful", () => {
    assert.equal(cleanOptionalNote("   "), null);
    assert.equal(
      cleanOptionalNote("  Respiration avant examen  "),
      "Respiration avant examen",
    );
  });

  void it("normalizes valid profile updates", () => {
    assert.deepEqual(
      validateProfileUpdate({
        firstName: " Alice ",
        lastName: " Martin ",
        age: 25,
      }),
      {
        firstName: "Alice",
        lastName: "Martin",
        age: 25,
        name: "Alice Martin",
      },
    );
  });

  void it("rejects incomplete or underage profile updates", () => {
    assert.throws(
      () =>
        validateProfileUpdate({ firstName: "", lastName: "Martin", age: 25 }),
      /obligatoires/,
    );
    assert.throws(
      () =>
        validateProfileUpdate({
          firstName: "Alice",
          lastName: "Martin",
          age: 12,
        }),
      /13 et 120/,
    );
  });

  void it("builds deterministic anonymized data for RGPD account deletion", () => {
    assert.equal(
      createDeletedAccountEmail("user-123"),
      "deleted-user-123@deleted.local",
    );

    assert.deepEqual(buildRgpdAnonymizedUserData("user-123"), {
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

  void it("rejects empty identifiers for RGPD anonymization", () => {
    assert.throws(() => createDeletedAccountEmail("   "), /obligatoire/);
  });
});
