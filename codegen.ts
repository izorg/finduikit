import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  documents: ["data-handlers/fetchGitHubRepositoryData.ts"],
  generates: {
    "data-handlers/": {
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
    "github.generated.ts": {
      config: {
        avoidOptionals: true,
        enumsAsConst: true,
        scalars: {
          URI: "string",
        },
      },
      plugins: ["typescript"],
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
