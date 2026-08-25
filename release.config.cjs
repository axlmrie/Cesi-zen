"use strict";

const allowedReleaseBranches = ["main", "master"];
const currentBranch = process.env.GITHUB_REF_NAME;

if (
  process.env.GITHUB_ACTIONS === "true" &&
  !allowedReleaseBranches.includes(currentBranch)
) {
  throw new Error(
    "semantic-release ne peut etre execute que depuis main ou master.",
  );
}

module.exports = {
  // Une seule branche est consideree lors d'un run GitHub Actions. Cela evite
  // de creer deux canaux de release si main et master existent simultanement.
  branches: currentBranch ? [currentBranch] : allowedReleaseBranches,
  tagFormat: "v${version}",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/github",
      {
        successComment: false,
        failComment: false,
        failTitle: false,
        labels: false,
        releasedLabels: false,
      },
    ],
    "./.github/semantic-release/export-version.cjs",
  ],
};
