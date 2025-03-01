import fs from "node:fs";
import path from "node:path";

import { parse } from "yaml";

import { uiKitSchema, type UiKitSchema } from "./uiKitSchema";

export type UiKit = UiKitSchema;

export const getUiKits = async () => {
  const entries = await fs.promises.readdir(
    path.join(process.cwd(), "ui-kits"),
    {
      withFileTypes: true,
    },
  );

  return await Promise.all(
    entries
      .filter((dirent) => dirent.isFile())
      .map(async (dirent) => {
        const buffer = await fs.promises.readFile(
          path.join(dirent.parentPath, dirent.name),
        );

        return uiKitSchema.parse(parse(buffer.toString()));
      }),
  );
};
