import fs, { type Dirent } from "node:fs";
import path from "node:path";

import { ESLint } from "eslint";
import prettier from "prettier";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

import { fetchGitHubRepositoryData } from "../../../data-handlers/fetchGitHubRepositoryData";
import { fetchHomepageData } from "../../../data-handlers/fetchHomepageData";
import { getDescription } from "../../../data-handlers/getDescription";
import { getFrameworks } from "../../../data-handlers/getFrameworks";
import { getImage } from "../../../data-handlers/getImage";
import { uiKitSchema } from "../uiKitSchema";

const CHECK_COUNT = Number.parseInt(process.env.CHECK_COUNT ?? "", 10) || 1;

const eslint = new ESLint({ fix: true });

const updateUiKit = async (dirent: Dirent) => {
  const filePath = path.join(dirent.parentPath, dirent.name);

  const buffer = await fs.promises.readFile(filePath);

  const data = uiKitSchema.parse(parseYaml(buffer.toString()));

  const [github, homepage] = await Promise.all([
    fetchGitHubRepositoryData(data.repository),
    fetchHomepageData(data.homepage),
  ]);

  const output = stringifyYaml(
    uiKitSchema.parse({
      ...data,
      description: getDescription({ data, github, homepage }),
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
