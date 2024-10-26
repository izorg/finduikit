import js from '@eslint/js';
import next from "@next/eslint-plugin-next";
import gitignore from "eslint-config-flat-gitignore";
import prettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import tailwind from "eslint-plugin-tailwindcss";
import unicorn from "eslint-plugin-unicorn";
import yml from "eslint-plugin-yml";
import globals from "globals";
import ts from 'typescript-eslint';

export default ts.config(
  gitignore(),
  {
    ignores: [
      '.next'
    ]
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  unicorn.configs["flat/recommended"],
  perfectionist.configs["recommended-alphabetical"],
  ...tailwind.configs["flat/recommended"],
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
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,

      /**
       * `prettier-plugin-tailwindcss` does it
       */
      "tailwindcss/classnames-order": "off",

      "unicorn/filename-case": "off",

      "unicorn/prevent-abbreviations": "off",
    },
    settings: {
      tailwindcss: {
        cssFiles: ["app/**/*.css"],
      },
    },
  },
  {
    files: ["ui-kits/*.yml"],
    rules: {
      "yml/sort-keys": ["error", "asc"],
    },
  },
);
