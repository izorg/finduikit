import fs, { type Dirent } from "node:fs";
import path from "node:path";

import { ESLint } from "eslint";
import { format } from "prettier";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

import { fetchGitHubRepositoryData } from "../../../data-handlers/fetchGitHubRepositoryData";
import { fetchHomepageData } from "../../../data-handlers/fetchHomepageData";
import { getDescription } from "../../../data-handlers/getDescription";
import { getFrameworks } from "../../../data-handlers/getFrameworks";
import { getImage } from "../../../data-handlers/getImage";
import { uiKitStaticDataSchema } from "../uiKitStaticDataSchema";

const eslint = new ESLint({ fix: true });

const getUiKit = async (dirent: Dirent) => {
  const filePath = path.join(dirent.parentPath, dirent.name);

  const buffer = await fs.promises.readFile(filePath);

  return uiKitStaticDataSchema.parse(parseYaml(buffer.toString()));
};

const getUiKitFileEntries = async () => {
  const entries = await fs.promises.readdir(
    path.join(process.cwd(), "ui-kits"),
    {
      withFileTypes: true,
    },
  );

  return entries.filter((dirent) => dirent.isFile());
};

const updateUiKit = async (dirent: Dirent) => {
  const filePath = path.join(dirent.parentPath, dirent.name);
  const { name } = path.parse(dirent.name);

  const data = await getUiKit(dirent);

  const [githubResult, homepageResult] = await Promise.allSettled([
    fetchGitHubRepositoryData(data.repository),
    fetchHomepageData(data.homepage),
  ]);

  // const allFullfilled =
  //   githubResult.status === "fulfilled" &&
  //   homepageResult.status === "fulfilled";

  // if (
  //   githubResult.status === "rejected" ||
  //   homepageResult.status === "rejected"
  // ) {
  //   console.log(`❌ ${name}`);
  //
  //   return;
  // }

  // const { value: github } = githubResult;
  // const { value: homepage } = homepageResult;

  let outputData = globalThis.structuredClone(data);

  if (
    githubResult.status === "fulfilled" &&
    homepageResult.status === "fulfilled"
  ) {
    const { value: github } = githubResult;
    const { value: homepage } = homepageResult;

    outputData = {
      ...outputData,
      description: getDescription({ data, github, homepage }),
      image: getImage({ data, github, homepage }),
    };
  }

  if (githubResult.status === "fulfilled") {
    const { value: github } = githubResult;

    outputData = {
      ...outputData,
      frameworks: getFrameworks({ data, github }),
    };
  }

  const output = stringifyYaml(uiKitStaticDataSchema.parse(outputData));

  const lintResults = await eslint.lintText(output, { filePath });
  const fixedOutput = lintResults[0].output ?? output;

  const formattedOutput = await format(fixedOutput, {
    filepath: filePath,
  });

  await fs.promises.writeFile(filePath, formattedOutput);

  const rejectedDataSources = [
    ["GitHub", githubResult.status],
    ["Homepage", homepageResult.status],
  ]
    .filter(([, status]) => status === "rejected")
    .map(([dataSource]) => dataSource);

  if (rejectedDataSources.length > 0) {
    console.log(`❌ ${name}: ${rejectedDataSources.join(", ")}`);
  } else {
    console.log(`✅ ${name}`);
  }
};

const checkUiKits = async () => {
  const checkCacheFile = path.join(process.cwd(), ".uikitcache");

  let checkCache: Record<string, string>;

  try {
    const buffer = await fs.promises.readFile(checkCacheFile);

    checkCache = JSON.parse(buffer.toString()) as Record<string, string>;
  } catch {
    checkCache = {};
  }

  const entries = await getUiKitFileEntries();

  const getSortCacheTime = (dirent: Dirent) =>
    dirent.name in checkCache ? new Date(checkCache[dirent.name]).getTime() : 0;

  const CHECK_COUNT = Number.parseInt(process.env.CHECK_COUNT ?? "", 10) || 1;

  const checkEntries = entries
    .toSorted((a, b) => getSortCacheTime(a) - getSortCacheTime(b))
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

const updateReadmeTable = async () => {
  const readmeFilePath = path.join(process.cwd(), "readme.md");

  const entries = await getUiKitFileEntries();
  const readmeBuffer = await fs.promises.readFile(readmeFilePath);
  let readme = readmeBuffer.toString();

  const tableComment = "<!-- Table -->";
  const startIndex = readme.indexOf(tableComment) + tableComment.length;
  const endIndex = readme.lastIndexOf(tableComment);

  const uiKits = await Promise.all(entries.map((dirent) => getUiKit(dirent)));

  const collator = new Intl.Collator("en");

  const tableRows = uiKits
    .toSorted((a, b) => collator.compare(a.name, b.name))
    .map(
      (uiKit) =>
        `| [${uiKit.name}](${uiKit.homepage}) | [GitHub](${uiKit.repository}) |`,
    )
    .join("\n");

  const table = `

| UI Kit | Repository |
| ------ | :--------: |
${tableRows}

`;

  readme = readme.slice(0, startIndex) + table + readme.slice(endIndex);

  readme = await format(readme, {
    filepath: readmeFilePath,
  });

  await fs.promises.writeFile(readmeFilePath, readme);
};

await updateReadmeTable();
