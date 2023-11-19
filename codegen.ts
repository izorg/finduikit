import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  documents: ["scripts/update-ui-kits.js"],
  generates: {
    "github.generated.ts": {
      config: {
        avoidOptionals: true,
      },
      plugins: ["typescript"],
    },
    "scripts/": {
      config: {
        avoidOptionals: true,
      },
      plugins: ["typescript-operations"],
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "../github.generated.ts",
        extension: ".generated.ts",
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["yarn prettier --write", "yarn run eslint --fix"],
  },
  ignoreNoDocuments: true, // for better experience with the watcher
  schema: {
    "https://api.github.com/graphql": {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "User-Agent": "Awesome-Octocat-App",
      },
    },
  },
};

export default config;
