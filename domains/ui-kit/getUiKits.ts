import fs from "node:fs";
import path from "node:path";

import { parse } from "yaml";

import { firebaseGetFirestoreUiKitsCollection } from "../firebase";

import { type UiKitDynamicDataSchema } from "./uiKitDynamicDataSchema";
import { uiKitSchema, type UiKitSchema } from "./uiKitSchema";

export type UiKit = UiKitDynamicDataSchema & UiKitSchema;

export const getUiKits = async () => {
  const entries = await fs.promises.readdir(
    path.join(process.cwd(), "ui-kits"),
    {
      withFileTypes: true,
    },
  );

  const uiKitsCollection = firebaseGetFirestoreUiKitsCollection();

  let uiKitsDynamicData: Partial<Record<string, UiKitDynamicDataSchema>>;

  try {
    const snapshot = await uiKitsCollection.get();

    uiKitsDynamicData = Object.fromEntries(
      snapshot.docs.map((doc) => [doc.id, doc.data()]),
    );
  } catch {
    uiKitsDynamicData = {};
  }

  return await Promise.all(
    entries
      .filter((dirent) => dirent.isFile())
      .map(async (dirent) => {
        const buffer = await fs.promises.readFile(
          path.join(dirent.parentPath, dirent.name),
        );

        const dynamicData = uiKitsDynamicData[dirent.name];

        return {
          ...uiKitSchema.parse(parse(buffer.toString())),
          ...dynamicData,
        };
      }),
  );
};
