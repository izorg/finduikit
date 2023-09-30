import fs from "fs";
import path from "path";
import { parse } from "yaml";
import { z } from "zod";

const UiKitSchema = z.object({
  description: z.string(),
  homepage: z.string(),
  image: z.string().optional(),
  name: z.string(),
  repository: z.string(),
});

export type UiKit = z.infer<typeof UiKitSchema> & {
  key: string;
};

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
          path.join(dirent.path, dirent.name),
        );

        return [dirent.name.slice(0, dirent.name.lastIndexOf(".")), buffer];
      }),
  );

  return fileEntries.map(([key, buffer]) => ({
    key,
    ...UiKitSchema.parse(parse(buffer.toString())),
  }));
};
