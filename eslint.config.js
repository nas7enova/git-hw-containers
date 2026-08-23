import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"], // убрали jsx
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        "__dirname": "readonly",
        "test": "readonly",
        "expect": "readonly",
        "beforeEach": "readonly",
        "afterEach": "readonly",
        "describe": "readonly",
        "it": "readonly",
        "jest": "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-useless-assignment": "off",
    },
  },

  {
    ignores: [
      "dist/",
      "bundle.js",
      "*.min.js",
      "node_modules/",
      "build/",
      "coverage/",
      "temp.js",
      "config/*",
    ],
  },
]);