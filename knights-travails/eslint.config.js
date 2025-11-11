import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/", "dist/**", "**/*.d.ts"],
  },
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    extends: [
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      prettierRecommended, // Must be last to disable conflicting rules
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: ["./tsconfig.json"], // Adjust path if needed
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // Add or override specific ESLint rules here
      // For example:
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": ["off"],
    },
  },
]);
