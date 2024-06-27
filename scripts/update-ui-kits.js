// @ts-check

import { parse as parseHtml } from "node-html-parser";
import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

const CHECK_COUNT = 1;

const ANGULAR = /** @type {const} */ ("angular");
const REACT = /** @type {const} */ ("react");
const VUE = /** @type {const} */ ("vue");

/**
 * @param {string} url
 * @returns {Promise<Exclude<import('./update-ui-kits.generated.ts').GetGitHubRepositoryQuery['resource'], null>>}
 */
const getGitHubRepository = async (url) => {
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

/**
 * @typedef {object} NpmPackage
 * @property {object} repository
 * @property {string} repository.url
 */

/**
 * @param {string} name
 * @returns {Promise<NpmPackage>}
 */
const getNpmPackage = async (name) => {
  const response = await fetch(`https://registry.npmjs.org/${name}`);

  const json = await response.json();

  // console.log(JSON.stringify(json, null, 2));

  return json;
};

/**
 * @typedef {object} HomepageData
 * @property {string} [description]
 */

/**
 * @param {string} homepage
 * @returns {Promise<HomepageData>}
 */
const getHomepageData = async (homepage) => {
  /**
   * @type {HomepageData}
   */
  const data = {};

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

/**
 * @typedef {object} UiKit
 * @property {string} [description]
 * @property {string} homepage
 * @property {string} [image]
 * @property {string} name
 * @property {string} repository
 */

/**
 * @param {import('node:fs').Dirent} dirent
 * @returns {Promise<void>}
 */
const updateUiKit = async (dirent) => {
  const filePath = path.join(dirent.path, dirent.name);

  const buffer = await fs.promises.readFile(filePath);

  /**
   * @type {UiKit}
   */
  const data = parseYaml(buffer.toString());

  const github = await getGitHubRepository(data.repository);

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

  /**
   * @param {import('node:fs').Dirent} dirent
   * @returns {number}
   */
  const getSortCacheTime = (dirent) =>
    dirent.name in checkCache ? new Date(checkCache[dirent.name]).getTime() : 0;

  const checkEntries = entries
    .filter((dirent) => dirent.isFile())
    .sort((a, b) => getSortCacheTime(a) - getSortCacheTime(b))
    // .slice(6, 7);
    .slice(0, CHECK_COUNT);

  // console.log("=== checkEntries ===", checkEntries);

  await Promise.all(checkEntries.map(updateUiKit));

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
