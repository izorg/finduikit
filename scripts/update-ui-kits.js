// @ts-check

import fs from "node:fs";
import path from "node:path";
import { parse, stringify } from "yaml";

import { getHomepageData } from "../lib/getHomepageData.js";

const CHECK_COUNT = 50;

/**
 * @typedef {object} UiKit
 * @property {string} [description]
 * @property {string} homepage
 * @property {string} [image]
 * @property {string} name
 * @property {string} repository
 */

/**
 * @typedef {object} GitHubRepositoryResource
 * @property {string} [description]
 * @property {string} [homepageUrl]
 * @property {string} [openGraphImageUrl]
 */

/**
 * @param {string} url
 * @returns {Promise<GitHubRepositoryResource>}
 */
const getGitHubRepository = async (url) => {
  const response = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query: /* GraphQL */ `
        query getGitHubRepository($url: URI!) {
          resource(url: $url) {
            ... on Repository {
              description
              homepageUrl
              openGraphImageUrl
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
 * @param {import('node:fs').Dirent} dirent
 * @returns {Promise<void>}
 */
const updateUiKit = async (dirent) => {
  const filePath = path.join(dirent.path, dirent.name);

  const buffer = await fs.promises.readFile(filePath);

  /**
   * @type {UiKit}
   */
  const data = parse(buffer.toString());

  const github = await getGitHubRepository(data.repository);

  const homepage = await getHomepageData(data.homepage);

  console.log("=== homepage ===", data.name, homepage);

  await fs.promises.writeFile(
    filePath,
    stringify({
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
    .slice(0, CHECK_COUNT);

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
