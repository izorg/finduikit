import { parse as parseHtml } from "node-html-parser";
import fs, { type Dirent } from "node:fs";
import path from "node:path";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

import type { GetGitHubRepositoryQuery } from "./update-ui-kits.generated";

const CHECK_COUNT = 1;

/* eslint-disable @typescript-eslint/no-unused-vars */
const ANGULAR = /** @type {const} */ "angular";
const REACT = /** @type {const} */ "react";
const VUE = /** @type {const} */ "vue";
/* eslint-enable @typescript-eslint/no-unused-vars */

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

  // console.log(JSON.stringify(json, null, 2));

  return json;
};

type HomepageData = {
  description?: string;
};

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

type UiKit = {
  description?: string;
  homepage: string;
  image?: string;
  name: string;
  repository: string;
};

const updateUiKit = async (dirent: Dirent) => {
  const filePath = path.join(dirent.parentPath, dirent.name);

  const buffer = await fs.promises.readFile(filePath);

  const data: UiKit = parseYaml(buffer.toString());

  const github = await getGitHubRepository(data.repository);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const homepage = await getHomepageData(data.homepage);

  // console.log("=== homepage ===", data.name, homepage);

  if (github.__typename !== "Repository") {
    return;
  }

  await fs.promises.writeFile(
    filePath,
    stringifyYaml({
      description: github.description,
      ...data,
      image: github.openGraphImageUrl?.startsWith(
        "https://repository-images.githubusercontent.com/",
      )
        ? github.openGraphImageUrl
        : data.image,
    }),
  );
};

const checkUiKits = async () => {
  const checkCacheFile = path.join(process.cwd(), ".uikitcache");

  /**
   * @type {Record<string,string>}
   */
  let checkCache;

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
    // .slice(6, 7);
    .slice(0, CHECK_COUNT);

  // console.log("=== checkEntries ===", checkEntries);

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
