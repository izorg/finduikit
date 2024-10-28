import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import gitignore from "eslint-config-flat-gitignore";
import prettier from "eslint-config-prettier";
import compat from "eslint-plugin-compat";
import perfectionist from "eslint-plugin-perfectionist";
import reactCompiler from "eslint-plugin-react-compiler";
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
  unicorn.configs["flat/recommended"],
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
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,

      "react-compiler/react-compiler": "error",

      "unicorn/filename-case": "off",

      "unicorn/prevent-abbreviations": "off",
    },
    settings: {
      lintAllEsApis: true,
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
