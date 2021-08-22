/** @type {import('@commitlint/types').UserConfig} */
const CommitLintConfigurations = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "404",
        "auth",
        "components",
        "constants",
        "functions",
        "helpers",
        "layout",
        "meta",
        "notification",
        "product",
        "routes",
        "services",
        "setting",
        "system",
        "shipment-receipt",
        "ui",
      ],
    ],
    "scope-case": [2, "always", "kebab-case"],
  },
};

module.exports = CommitLintConfigurations;
