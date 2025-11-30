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

declare global {
  var uiKitFileDataEntries:
    | [key: string, data: UiKitStaticDataSchema][]
    | undefined;
}

export const getUiKitFileEntries = () =>
  fs
    .readdirSync(path.join(process.cwd(), "ui-kits"), {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isFile());

export const getUiKitFileDataEntriesFromFiles = () => {
  if (
    !globalThis.uiKitFileDataEntries ||
    process.env.NODE_ENV === "development"
  ) {
    const entries = getUiKitFileEntries();

    globalThis.uiKitFileDataEntries = entries.map(
      (dirent): [key: string, data: UiKitStaticDataSchema] => {
        const buffer = fs.readFileSync(
          path.join(dirent.parentPath, dirent.name),
          "utf8",
        );

        return [dirent.name, uiKitStaticDataSchema.parse(parse(buffer))];
      },
    );
  }

  return globalThis.uiKitFileDataEntries;
};

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
  "use cache";

  cacheLife("days");

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
  const uiKitFileDataEntries = getUiKitFileDataEntriesFromFiles();
  const uiKitDynamicDataMap = await getUiKitDynamicDataMapFromFirestore();

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
