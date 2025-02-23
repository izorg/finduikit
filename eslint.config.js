import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import gitignore from "eslint-config-flat-gitignore";
import prettier from "eslint-config-prettier";
import compat from "eslint-plugin-compat";
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
    ignores: [".next"],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  compat.configs["flat/recommended"],
  unicorn.configs["recommended"],
  perfectionist.configs["recommended-alphabetical"],
  ...yml.configs["flat/recommended"],
  ...yml.configs["flat/prettier"],
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
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
    files: ["ui-kits/*.yml"],
    rules: {
      "yml/sort-keys": ["error", "asc"],
    },
  },
  {
    files: ["stylelint.config.js"],
    rules: {
      "unicorn/no-null": "off",
    },
  },
);
