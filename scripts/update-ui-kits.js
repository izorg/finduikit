// @ts-check

import fs from "node:fs";
import path from "node:path";
import { parse, stringify } from "yaml";

/**
 * @param {string} url
 * @returns {Promise<any>}
 */
const getGitHubRepository = async (url) => {
  url = url.replaceAll(/^git\+|\.git$/g, "");

  const response = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query: /* GraphQL */ `
        query getGithubRepository($url: URI!) {
          resource(url: $url) {
            ... on Repository {
              description
              descriptionHTML
              latestRelease {
                name
                tagName
              }
              name
              repositoryTopics(first: 1) {
                nodes {
                  topic {
                    name
                  }
                }
              }
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

  const data = parse(buffer.toString());

  const github = await getGitHubRepository(data.repository);

  console.log(JSON.stringify(github, null, 2));

  // const npmPackage = await getNpmPackage(data.npmPackageName);

  // const repository = npmPackage.repository.url.replaceAll(/^git\+|\.git$/g, "");

  await fs.promises.writeFile(
    filePath,
    stringify({
      ...data,
      image: github.openGraphImageUrl?.startsWith(
        "https://repository-images.githubusercontent.com/",
      )
        ? github.openGraphImageUrl
        : data.image,
      // lastChecked: new Date().toISOString(),
      // repository,
    }),
  );
};

// await getGitHubRepository("git+https://github.com/adobe/react-spectrum.git");
// await getNpmPackage("@adobe/react-spectrum");

const entries = await fs.promises.readdir(path.join(process.cwd(), "ui-kits"), {
  withFileTypes: true,
});

await Promise.all(
  entries
    // .slice(0, 3)
    .filter((dirent) => dirent.isFile())
    .map((dirent) => updateUiKit(dirent)),
);
