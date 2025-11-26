import fs from "node:fs";
import path from "node:path";

import { captureException } from "@sentry/nextjs";
import {
  type FirestoreDataConverter,
  Timestamp,
} from "firebase-admin/firestore";
import { cacheLife } from "next/cache";
import { parse } from "yaml";

import { firebaseGetFirestoreUiKitsCollection } from "../../firebase";
import type { UiKit } from "../UiKit";
import {
  uiKitDynamicDataSchema,
  type UiKitDynamicDataSchema,
} from "../uiKitDynamicDataSchema";
import {
  uiKitStaticDataSchema,
  type UiKitStaticDataSchema,
} from "../uiKitStaticDataSchema";

export const getUiKitFileEntries = () =>
  fs
    .readdirSync(path.join(process.cwd(), "ui-kits"), {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isFile());

export const getUiKitFileDataEntriesFromFiles = () =>
  getUiKitFileEntries().map(
    (dirent): [key: string, data: UiKitStaticDataSchema] => {
      const buffer = fs.readFileSync(path.join(dirent.parentPath, dirent.name));

      return [
        dirent.name,
        uiKitStaticDataSchema.parse(parse(buffer.toString())),
      ];
    },
  );

const uiKitConverter: FirestoreDataConverter<UiKitDynamicDataSchema, never> = {
  fromFirestore: (snapshot) => {
    const { updatedAt, ...data } = snapshot.data();

    return uiKitDynamicDataSchema.parse({
      ...data,
      updatedAt:
        updatedAt instanceof Timestamp ? updatedAt.toDate() : undefined,
    });
  },
  toFirestore: () => {
    throw new Error("This collection is only for Firestore read");
  },
};

const getUiKitDynamicDataMapFromFirestore = async () => {
  const uiKitsCollection =
    firebaseGetFirestoreUiKitsCollection().withConverter(uiKitConverter);

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

export const getUiKits = async () => {
  "use cache";

  cacheLife("days");

  const [uiKitFileDataEntries, uiKitDynamicDataMap] = await Promise.all([
    getUiKitFileDataEntriesFromFiles(),
    getUiKitDynamicDataMapFromFirestore(),
  ]);

  return new Set<UiKit>(
    uiKitFileDataEntries.map(([key, fileData]) => {
      const dynamicData = uiKitDynamicDataMap.get(key);

      return {
        ...fileData,
        ...dynamicData,
      };
    }),
  );
};
