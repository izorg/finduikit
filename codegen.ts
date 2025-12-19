import { type CodegenConfig } from "@graphql-codegen/cli";

const scalars = {
  DateTime: "string",
  URI: "string",
};

const config: CodegenConfig = {
  documents: ["data-handlers/fetchGitHubRepositoryData.ts"],
  generates: {
    "data-handlers/": {
      config: {
        avoidOptionals: true,
        enumsAsConst: true,
        scalars,
      },
      plugins: ["typescript-operations"],
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "../github.generated.ts",
        extension: ".generated.ts",
      },
    },
    "github.generated.ts": {
      config: {
        avoidOptionals: true,
        enumsAsConst: true,
        scalars,
      },
      plugins: ["typescript"],
    },
  },
  hooks: {
    afterAllFileWrite: ["yarn prettier --write", "yarn eslint --fix"],
  },
  ignoreNoDocuments: true, // for better experience with the watcher
  schema: {
    "https://api.github.com/graphql": {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        "User-Agent": "Awesome-Octocat-App",
      },
    },
  },
};

export default config;
