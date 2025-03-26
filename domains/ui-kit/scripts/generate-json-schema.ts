import fs from "node:fs";
import path from "node:path";

import { ESLint } from "eslint";
import { format } from "prettier";
import { zodToJsonSchema } from "zod-to-json-schema";

import { uiKitSchema } from "../uiKitSchema";

const jsonSchema = zodToJsonSchema(uiKitSchema, "UiKit");
const output = JSON.stringify(jsonSchema, undefined, 2);
const eslint = new ESLint({ fix: true });
const filePath = path.join(process.cwd(), "domains/ui-kit/UiKit.schema.json");

const lintResults = await eslint.lintText(output, {
  filePath,
});
const fixedOutput = lintResults[0].output ?? output;
const formattedOutput = await format(fixedOutput, {
  filepath: filePath,
});

await fs.promises.writeFile(filePath, formattedOutput);
