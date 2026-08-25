"use strict";

const { appendFileSync } = require("node:fs");

/**
 * Expose la version calculee aux jobs Docker et de deploiement.
 * Ce hook success n'est appele que lorsqu'une nouvelle release est publiee.
 */
async function success(_pluginConfig, context) {
  const outputFile = process.env.GITHUB_OUTPUT;

  if (!outputFile) {
    throw new Error("La variable GITHUB_OUTPUT est absente.");
  }

  const { version, gitTag } = context.nextRelease;
  appendFileSync(
    outputFile,
    ["published=true", `version=${version}`, `tag=${gitTag}`, ""].join("\n"),
    "utf8",
  );
}

module.exports = { success };
