import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import gitignore from "eslint-config-flat-gitignore";
import prettier from "eslint-config-prettier/flat";
import compat from "eslint-plugin-compat";
import importPlugin from "eslint-plugin-import";
import jsonSchemaValidator from "eslint-plugin-json-schema-validator";
import jsonc from "eslint-plugin-jsonc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
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
      reactHooks.configs["recommended-latest"],
      reactCompiler.configs.recommended,
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
    name: "JavaScript & TypeScript",
    plugins: {
      "@next/next": next,
    },
    rules: {
      "import/no-cycle": "error",

      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,

      "no-restricted-imports": [
        "error",
        {
          paths: [
            /**
             * Use direct component imports for better tree-shaking
             */
            {
              message: "Please use `@radix-ui/themes/components/*` instead.",
              name: "@radix-ui/themes",
            },
          ],
        },
      ],

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
    name: "TypeScript",
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
    name: "Server",
    settings: {
      browserslistOpts: {
        env: "server",
      },
    },
  },
  {
    extends: [
      jsonc.configs["flat/recommended-with-json"],
      jsonc.configs["flat/prettier"],
    ],
    files: ["**/*.json"],
    ignores: ["package.json", "tsconfig.json"],
    name: "JSON",
    rules: {
      "jsonc/sort-keys": ["error", "asc"],
    },
  },
  {
    extends: [yml.configs["flat/recommended"], yml.configs["flat/prettier"]],
    files: ["**/*.y?(a)ml"],
    name: "YAML",
    rules: {
      "yml/sort-keys": ["error", "asc"],
    },
  },
  {
    extends: [jsonSchemaValidator.configs["flat/recommended"]],
    name: "JSON Schema",
    rules: {
      "json-schema-validator/no-invalid": [
        "error",
        {
          schemas: [
            {
              fileMatch: ["ui-kits/*.yml"],
              schema: "domains/ui-kit/UiKit.schema.json",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["stylelint.config.js"],
    name: "Stylelint",
    rules: {
      "unicorn/no-null": "off",
    },
  },
  {
    extends: [prettier],
    name: "Prettier",
  },
);
