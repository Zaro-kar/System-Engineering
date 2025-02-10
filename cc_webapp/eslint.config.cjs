/* eslint-env node */
/* eslint-disable no-undef */

// eslint.config.cjs
const globals = require("globals");
const pluginJs = require("@eslint/js");
const pluginReact = require("eslint-plugin-react");
// const tsEslintFlat = require("@typescript-eslint/eslint-plugin/flat-config-recommended");

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    // Base config: specify files, ignores, and language options.
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["**/node_modules/**", "**/dist/**"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      // Add any additional custom rules here.
    },
  },
  // Include recommended configurations directly:
  pluginJs.configs.recommended,
  // tsEslintFlat,
  pluginReact.configs.flat.recommended,
];