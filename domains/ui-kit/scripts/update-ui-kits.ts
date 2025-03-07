import fs, { type Dirent } from "node:fs";
import path from "node:path";

import { ESLint } from "eslint";
import prettier from "prettier";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

import { fetchGitHubRepositoryData } from "../../../data-handlers/fetchGitHubRepositoryData";
import { Framework } from "../../framework";
import { type UiKitSchema, uiKitSchema } from "../uiKitSchema";

const CHECK_COUNT = 1;

const frameworkCompare = new Intl.Collator("en").compare;

const frameworkTopicMap = new Map<string, Framework>([
  ["angular", Framework.Angular],
  ["react", Framework.React],
  ["reactjs", Framework.React],
  ["solid", Framework.Solid],
  ["solidjs", Framework.Solid],
  ["svelte", Framework.Svelte],
  ["vue", Framework.Vue],
]);

const getFrameworksFromTopics = (topics: string[]) => {
  const frameworks = topics
    .map((topic) => frameworkTopicMap.get(topic))
    .filter((framework) => framework !== undefined)
    .sort(frameworkCompare);

  return frameworks.length > 0 ? [...new Set(frameworks)] : undefined;
};

const eslint = new ESLint({ fix: true });

const getDescription = ({
  data,
  github,
}: {
  data: UiKitSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
}) => {
  const githubDescription = github?.description
    ?.replaceAll(/\s+/gu, " ")
    .trim();

  return githubDescription ?? data.description;
};

const getFrameworks = ({
  data,
  github,
}: {
  data: UiKitSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
}) => {
  if (data.frameworks?.length === 0) {
    return [];
  }

  const topics = github?.repositoryTopics.nodes
    ?.map((repositoryTopic) => repositoryTopic?.topic.name)
    .filter((topic) => topic !== undefined);

  if (topics) {
    const githubFrameworks = getFrameworksFromTopics(topics);

    if (githubFrameworks) {
      return githubFrameworks;
    }
  }

  return data.frameworks;
};

const getImage = ({
  data,
  github,
}: {
  data: UiKitSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
}) =>
  github?.openGraphImageUrl?.startsWith(
    "https://repository-images.githubusercontent.com/",
  )
    ? github.openGraphImageUrl
    : data.image;

const updateUiKit = async (dirent: Dirent) => {
  const filePath = path.join(dirent.parentPath, dirent.name);

  const buffer = await fs.promises.readFile(filePath);

  const data = uiKitSchema.parse(parseYaml(buffer.toString()));

  const github = await fetchGitHubRepositoryData(data.repository);

  const output = stringifyYaml(
    uiKitSchema.parse({
      ...data,
      description: getDescription({ data, github }),
      frameworks: getFrameworks({ data, github }),
      image: getImage({ data, github }),
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
