import css from "@eslint/css";
import js from "@eslint/js";
import json from "@eslint/json";
import next from "@next/eslint-plugin-next";
import gitignore from "eslint-config-flat-gitignore";
import prettier from "eslint-config-prettier/flat";
import compat from "eslint-plugin-compat";
import importPlugin from "eslint-plugin-import";
import jsonSchemaValidator from "eslint-plugin-json-schema-validator";
import jsxA11y from "eslint-plugin-jsx-a11y";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unicorn from "eslint-plugin-unicorn";
import yml from "eslint-plugin-yml";
import globals from "globals";
import * as ts from "typescript-eslint";

/**
 * Run `npx @eslint/config-inspector` to visualise the config
 */
export default ts.config(
  gitignore(),
  {
    ignores: [".yarn"],
    name: "ignore",
  },
  {
    extends: [
      js.configs.recommended,
      ts.configs.recommended,
      compat.configs["flat/recommended"],
      jsxA11y.flatConfigs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs.recommended,
      next.flatConfig.recommended,
      next.flatConfig.coreWebVitals,
      unicorn.configs["recommended"],
      perfectionist.configs["recommended-alphabetical"],
    ],
    files: ["**/*.js", "**/*.ts?(x)"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    name: "javascript-and-typescript",
    rules: {
      "import/no-cycle": "error",

      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            "side-effect",
            "builtin",
            "external",
            "parent",
            "sibling",
            "index",
            "side-effect-style",
            "style",
            "unknown",
          ],
        },
      ],

      "unicorn/filename-case": "off",
      "unicorn/prevent-abbreviations": "off",
    },
    settings: {
      "import/resolver": {
        node: true,
        typescript: true,
      },
      lintAllEsApis: true,
      polyfills: ["Array.toSorted", "Object.fromEntries"],
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.ts?(x)"],
    name: "typescript",
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],
    },
  },
  {
    files: [
      "data-handlers/**/*.ts",
      "domains/**/routes/*.ts",
      "domains/**/scripts/*.ts",
    ],
    name: "server",
    settings: {
      browserslistOpts: {
        env: "server",
      },
    },
  },
  {
    extends: [json.configs.recommended],
    files: ["**/*.json"],
    language: "json/json",
    name: "json",
    rules: {
      "json/sort-keys": "error",
    },
  },
  {
    extends: [yml.configs["flat/recommended"], yml.configs["flat/prettier"]],
    files: ["**/*.y?(a)ml"],
    name: "yaml",
    rules: {
      "yml/sort-keys": ["error", "asc"],
    },
  },
  {
    extends: [css.configs.recommended],
    files: ["**/*.css"],
    language: "css/css",
    name: "css",
  },
  {
    extends: [jsonSchemaValidator.configs["flat/recommended"]],
    ignores: ["**/*.css", "**/*.json"],
    name: "json-schema",
    rules: {
      "json-schema-validator/no-invalid": [
        "error",
        {
          schemas: [
            {
              fileMatch: ["ui-kits/*.yml"],
              schema: "domains/ui-kit/UiKitStaticData.schema.json",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.schema.json"],
    name: "json-schema",
    rules: {
      "json/sort-keys": "off",
    },
  },
  {
    files: ["package.json"],
    name: "package-json",
    rules: {
      "json/sort-keys": "off",
    },
  },
  prettier,
);
