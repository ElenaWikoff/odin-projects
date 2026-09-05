import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  js.configs.recommended, // Or your preferred base configuration
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Enable the Prettier rule
    },
    languageOptions: {
      globals: {
        ...globals.browser, // Includes browser globals like window, document, console, etc.
        ...globals.node, // Includes Node.js globals like process, require, module, etc.
        ...globals.jest, // Includes Jest testing globals
        // Add other environments as needed
      },
    },
  },
  prettierConfig, // Disable conflicting ESLint rules (must be last)
  {
    files: ["**/*.js"], // Apply to specific file types
    // Add other configurations like language options, parsers, etc.
  },
]);
