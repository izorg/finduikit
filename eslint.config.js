import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import gitignore from "eslint-config-flat-gitignore";
import prettier from "eslint-config-prettier";
import compat from "eslint-plugin-compat";
import jsonSchemaValidator from "eslint-plugin-json-schema-validator";
import jsonc from "eslint-plugin-jsonc";
import perfectionist from "eslint-plugin-perfectionist";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import unicorn from "eslint-plugin-unicorn";
import yml from "eslint-plugin-yml";
import globals from "globals";
import ts from "typescript-eslint";

export default ts.config(
  gitignore(),
  {
    ignores: [".next", ".yarn"],
    name: "ignore",
  },
  {
    extends: [
      js.configs.recommended,
      ts.configs.recommended,
      compat.configs["flat/recommended"],
      unicorn.configs["recommended"],
      perfectionist.configs["recommended-alphabetical"],
    ],
    files: ["**/*.js", "**/*.ts?(x)"],
    languageOptions: {
      globals: globals.node,
    },
    name: "JavaScript & TypeScript",
    plugins: {
      "@next/next": next,
      "react-compiler": reactCompiler,
      "react-hooks": reactHooks,
    },
    rules: {
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

      "react-compiler/react-compiler": "error",

      ...reactHooks.configs.recommended.rules,

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
      lintAllEsApis: true,
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
