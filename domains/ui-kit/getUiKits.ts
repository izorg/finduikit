import fs from "node:fs";
import path from "node:path";

import { parse } from "yaml";

import { uiKitSchema, type UiKitSchema } from "./uiKitSchema.ts";

export type UiKit = {
  key: string;
} & UiKitSchema;

export const getUiKits = async () => {
  const entries = await fs.promises.readdir(
    path.join(process.cwd(), "ui-kits"),
    {
      withFileTypes: true,
    },
  );

  const fileEntries: [key: string, buffer: Buffer][] = await Promise.all(
    entries
      .filter((dirent) => dirent.isFile())
      .map(async (dirent) => {
        const buffer = await fs.promises.readFile(
          path.join(dirent.parentPath, dirent.name),
        );

        return [dirent.name.slice(0, dirent.name.lastIndexOf(".")), buffer];
      }),
  );

  return fileEntries.map(([key, buffer]) => ({
    key,
    ...uiKitSchema.parse(parse(buffer.toString())),
  }));
};
