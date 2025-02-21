import fs, { type Dirent } from "node:fs";
import path from "node:path";

import { ESLint } from "eslint";
import prettier from "prettier";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

import { type UiKitFrameworkSchema, uiKitSchema } from "../app/uiKitSchema.ts";
import { fetchGitHubRepositoryData } from "../data-handlers/fetchGitHubRepositoryData.ts";

const CHECK_COUNT = 100;

const frameworkCompare = new Intl.Collator("en").compare;

const frameworkTopicMap = new Map<string, UiKitFrameworkSchema>([
  ["angular", "Angular"],
  ["react", "React"],
  ["reactjs", "React"],
  ["solid", "Solid"],
  ["solidjs", "Solid"],
  ["svelte", "Svelte"],
  ["vue", "Vue"],
]);

const getFrameworksFromTopics = (topics: string[]) => {
  const frameworks = topics
    .map((topic) => frameworkTopicMap.get(topic))
    .filter((framework) => framework !== undefined)
    .sort(frameworkCompare);

  return frameworks.length > 0 ? [...new Set(frameworks)] : undefined;
};

const eslint = new ESLint({ fix: true });

const updateUiKit = async (dirent: Dirent) => {
  const filePath = path.join(dirent.parentPath, dirent.name);

  const buffer = await fs.promises.readFile(filePath);

  const data = uiKitSchema.parse(parseYaml(buffer.toString()));

  const github = await fetchGitHubRepositoryData(data.repository);

  if (github.__typename !== "Repository") {
    return;
  }

  const topics = github.repositoryTopics.nodes
    ?.map((repositoryTopic) => repositoryTopic?.topic.name)
    .filter((topic) => topic !== undefined);

  const output = stringifyYaml(
    uiKitSchema.parse({
      ...data,
      description:
        github.description?.replaceAll(/\s+/gu, " ").trim() ?? data.description,
      frameworks:
        (topics &&
          data.frameworks?.length !== 0 &&
          getFrameworksFromTopics(topics)) ||
        data.frameworks,
      image: github.openGraphImageUrl?.startsWith(
        "https://repository-images.githubusercontent.com/",
      )
        ? github.openGraphImageUrl
        : data.image,
    }),
  );

  const lintResults = await eslint.lintText(output, { filePath });
  const fixedOutput = lintResults[0].output ?? output;

  const formattedOutput = await prettier.format(fixedOutput, {
    filepath: filePath,
  });

  await fs.promises.writeFile(filePath, formattedOutput);
};

const checkUiKits = async () => {
  const checkCacheFile = path.join(process.cwd(), ".uikitcache");

  let checkCache: Record<string, string>;

  try {
    const buffer = await fs.promises.readFile(checkCacheFile);

    checkCache = JSON.parse(buffer.toString());
  } catch {
    checkCache = {};
  }

  const entries = await fs.promises.readdir(
    path.join(process.cwd(), "ui-kits"),
    {
      withFileTypes: true,
    },
  );

  const getSortCacheTime = (dirent: Dirent) =>
    dirent.name in checkCache ? new Date(checkCache[dirent.name]).getTime() : 0;

  const checkEntries = entries
    .filter((dirent) => dirent.isFile())
    .sort((a, b) => getSortCacheTime(a) - getSortCacheTime(b))
    .slice(0, CHECK_COUNT);

  await Promise.all(checkEntries.map((entry) => updateUiKit(entry)));

  await fs.promises.writeFile(
    checkCacheFile,
    JSON.stringify({
      ...checkCache,
      ...Object.fromEntries(
        checkEntries.map((dirent) => [dirent.name, new Date().toISOString()]),
      ),
    }),
  );
};

await checkUiKits();
