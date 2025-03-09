import fs from "node:fs";
import path from "node:path";

import { signInAnonymously } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore/lite";
import { parse } from "yaml";

import { firebaseGetAuth, firebaseGetFirestore } from "../firebase";

import {
  type UiKitDynamicDataSchema,
  uiKitDynamicDataSchema,
} from "./uiKitDynamicDataSchema";
import { uiKitSchema, type UiKitSchema } from "./uiKitSchema";

export type UiKit = UiKitDynamicDataSchema & UiKitSchema;

export const getUiKits = async () => {
  const entries = await fs.promises.readdir(
    path.join(process.cwd(), "ui-kits"),
    {
      withFileTypes: true,
    },
  );

  await signInAnonymously(firebaseGetAuth());

  const uiKitsCollection = collection(
    firebaseGetFirestore(),
    "ui-kits",
  ).withConverter({
    fromFirestore: (snapshot) => uiKitDynamicDataSchema.parse(snapshot.data()),
    toFirestore: (data) => uiKitDynamicDataSchema.parse(data),
  });

  let uiKitsDynamicData: Partial<Record<string, UiKitDynamicDataSchema>>;

  try {
    const snapshot = await getDocs(uiKitsCollection);

    // eslint-disable-next-line compat/compat
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
