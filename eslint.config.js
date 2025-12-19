import css from "@eslint/css";
import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import next from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";
import gitignore from "eslint-config-flat-gitignore";
import prettier from "eslint-config-prettier/flat";
import compat from "eslint-plugin-compat";
import importPlugin from "eslint-plugin-import";
import jsonSchemaValidator from "eslint-plugin-json-schema-validator";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { configs as perfectionistConfigs } from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unicorn from "eslint-plugin-unicorn";
import yml from "eslint-plugin-yml";
import { defineConfig } from "eslint/config";
import globals from "globals";
import * as ts from "typescript-eslint";

/**
 * Run `yarn dlx @eslint/config-inspector` to visualise the config
 */
export default defineConfig(
  gitignore(),
  {
    ignores: [".yarn"],
    name: "ignore",
  },
  markdown.configs.processor,
  markdown.configs.recommended,
  {
    extends: [
      js.configs.recommended,
      ts.configs.strictTypeChecked,
      compat.configs["flat/recommended"],
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      jsxA11y.flatConfigs.recommended,
      next.configs.recommended,
      next.configs["core-web-vitals"],
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs.flat["recommended-latest"],
      stylistic.configs.recommended,
      unicorn.configs.recommended,
      perfectionistConfigs["recommended-alphabetical"],
    ],
    files: ["**/*.js", "**/*.ts?(x)"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    name: "javascript-and-typescript",
    rules: {
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
    files: ["**/*.d.ts"],
    name: "typescript-declaration",
    rules: {
      "unicorn/require-module-specifiers": "off",
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
    rules: {
      "css/no-invalid-at-rules": "off",
      "css/no-invalid-properties": "off",
    },
  },
  {
    extends: [jsonSchemaValidator.configs["flat/recommended"]],
    files: ["ui-kits/*.yml"],
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
    files: ["ui-kits/*.yml"],
    rules: {
      "yml/no-irregular-whitespace": "off",
    },
  },
  {
    files: ["package.json"],
    name: "package-json",
    rules: {
      "json/sort-keys": "off",
    },
  },
  {
    files: [".github/workflows/*.yml"],
    name: "github-workflows",
    rules: {
      "yml/sort-keys": [
        "error",
        {
          order: ["name", "on", "jobs"],
          pathPattern: "^$",
        },
      ],
    },
  },
  prettier,
);
