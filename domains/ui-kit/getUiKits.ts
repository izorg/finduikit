import fs from "node:fs";
import path from "node:path";

import { captureException } from "@sentry/nextjs";
import { parse } from "yaml";

import { firebaseGetFirestoreUiKitsCollection } from "../firebase";

import {
  uiKitDynamicDataSchema,
  type UiKitDynamicDataSchema,
} from "./uiKitDynamicDataSchema";
import { uiKitSchema, type UiKitSchema } from "./uiKitSchema";

export type UiKit = UiKitDynamicDataSchema & UiKitSchema;

const getUiKitFileDataEntriesFromFiles = async () => {
  const entries = await fs.promises.readdir(
    path.join(process.cwd(), "ui-kits"),
    {
      withFileTypes: true,
    },
  );

  return await Promise.all(
    entries
      .filter((dirent) => dirent.isFile())
      .map(async (dirent): Promise<[key: string, data: UiKitSchema]> => {
        const buffer = await fs.promises.readFile(
          path.join(dirent.parentPath, dirent.name),
        );

        return [dirent.name, uiKitSchema.parse(parse(buffer.toString()))];
      }),
  );
};

const getUiKitDynamicDataMapFromFirestore = async () => {
  const uiKitsCollection = firebaseGetFirestoreUiKitsCollection();

  const uiKitsDynamicDataMap = new Map<string, UiKitDynamicDataSchema>();

  try {
    const snapshot = await uiKitsCollection.get();

    for (const doc of snapshot.docs) {
      uiKitsDynamicDataMap.set(
        doc.id,
        uiKitDynamicDataSchema.parse(doc.data()),
      );
    }
  } catch (error) {
    captureException(error);
  }

  return uiKitsDynamicDataMap;
};

const nameCompare = new Intl.Collator("en").compare;

export const getUiKits = async () => {
  const [uiKitFileDataEntries, uiKitDynamicDataMap] = await Promise.all([
    getUiKitFileDataEntriesFromFiles(),
    getUiKitDynamicDataMapFromFirestore(),
  ]);

  return uiKitFileDataEntries
    .map(([key, fileData]) => {
      const dynamicData = uiKitDynamicDataMap.get(key);

      return {
        ...fileData,
        ...dynamicData,
      };
    })
    .toSorted((a, b) => nameCompare(a.name, b.name));
};
