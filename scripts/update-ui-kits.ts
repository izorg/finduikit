import fs, { type Dirent } from "node:fs";
import path from "node:path";

import { parse as parseHtml } from "node-html-parser";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

import { type UiKitFrameworkSchema, uiKitSchema } from "../app/uiKitSchema.ts";

import type { GetGitHubRepositoryQuery } from "./update-ui-kits.generated.ts";

const CHECK_COUNT = 1;

const frameworkCompare = new Intl.Collator("en").compare;

const frameworkTopicMap = new Map<string, UiKitFrameworkSchema>([
  ["angular", "Angular"],
  ["react", "React"],
  ["reactjs", "React"],
  ["solid", "Solid"],
  ["solidjs", "Solid"],
  ["svelte", "Svelte"],
  ["vue", "Vue"],
  ["web-components", "Web Components"],
]);

const getFrameworksFromTopics = (topics: string[]) => {
  const frameworks = topics
    .map((topic) => frameworkTopicMap.get(topic))
    .filter((framework) => framework !== undefined)
    .sort(frameworkCompare);

  return frameworks.length > 0 ? [...new Set(frameworks)] : undefined;
};

const getGitHubRepository = async (
  url: string,
): Promise<Exclude<GetGitHubRepositoryQuery["resource"], null>> => {
  const response = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query: /* GraphQL */ `
        query getGitHubRepository($url: URI!) {
          resource(url: $url) {
            __typename
            ... on Repository {
              description
              homepageUrl
              openGraphImageUrl
              repositoryTopics(first: 100) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        url,
      },
    }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const json = await response.json();

  return json.data.resource;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNpmPackage = async (
  name: string,
): Promise<{
  repository: {
    url: string;
  };
}> => {
  const response = await fetch(`https://registry.npmjs.org/${name}`);

  const json = await response.json();

  return json;
};

type HomepageData = {
  description?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getHomepageData = async (homepage: string): Promise<HomepageData> => {
  const data: HomepageData = {};

  const response = await fetch(homepage);

  const html = await response.text();

  const root = parseHtml(html);

  const description =
    root
      .querySelector('head > meta[name="description"]')
      ?.getAttribute("content") ??
    root
      .querySelector('head > meta[name="og:description"]')
      ?.getAttribute("content");

  if (description) {
    data.description = description;
  }

  return data;
};

const updateUiKit = async (dirent: Dirent) => {
  const filePath = path.join(dirent.parentPath, dirent.name);

  const buffer = await fs.promises.readFile(filePath);

  const data = uiKitSchema.parse(parseYaml(buffer.toString()));

  const github = await getGitHubRepository(data.repository);

  if (github.__typename !== "Repository") {
    return;
  }

  const topics = github.repositoryTopics.nodes
    ?.map((repositoryTopic) => repositoryTopic?.topic.name)
    .filter((topic) => topic !== undefined);

  await fs.promises.writeFile(
    filePath,
    stringifyYaml(
      uiKitSchema.parse({
        ...data,
        description:
          github.description?.replaceAll(/\s+/gu, " ").trim() ??
          data.description,
        frameworks:
          (topics && getFrameworksFromTopics(topics)) ?? data.frameworks,
        image: github.openGraphImageUrl?.startsWith(
          "https://repository-images.githubusercontent.com/",
        )
          ? github.openGraphImageUrl
          : data.image,
      }),
    ),
  );
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
