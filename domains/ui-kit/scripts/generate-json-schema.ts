import fs from "node:fs";
import path from "node:path";

import { ESLint } from "eslint";
import { format } from "prettier";
import { z } from "zod";

import { uiKitStaticDataSchema } from "../uiKitStaticDataSchema";

const jsonSchema = z.toJSONSchema(uiKitStaticDataSchema, {
  target: "draft-7",
});
const output = JSON.stringify(jsonSchema, undefined, 2);
const eslint = new ESLint({ fix: true });
const filePath = path.join(
  process.cwd(),
  "domains/ui-kit/UiKitStaticData.schema.json",
);

const lintResults = await eslint.lintText(output, {
  filePath,
});
const fixedOutput = lintResults[0].output ?? output;
const formattedOutput = await format(fixedOutput, {
  filepath: filePath,
});

await fs.promises.writeFile(filePath, formattedOutput);
