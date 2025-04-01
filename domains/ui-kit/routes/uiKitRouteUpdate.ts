import fs, { type Dirent } from "node:fs";
import path from "node:path";

import {
  type CollectionReference,
  type FirestoreDataConverter,
  Timestamp,
} from "firebase-admin/firestore";
import { notFound } from "next/navigation";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

import { fetchGitHubRepositoryData } from "../../../data-handlers/fetchGitHubRepositoryData";
import { getIssues } from "../../../data-handlers/getIssues";
import { getStars } from "../../../data-handlers/getStars";
import { getUpdatedAt } from "../../../data-handlers/getUpdatedAt";
import { firebaseGetFirestoreUiKitsCollection } from "../../firebase";
import { uiKitSchema } from "../uiKitSchema";

const uiKitDynamicDataSchema = z.object({
  checkedAt: z.date().optional(),
  issues: z.number().optional(),
  stars: z.number().optional(),
  updatedAt: z.date().optional(),
});

type UiKitDynamicDataSchema = z.infer<typeof uiKitDynamicDataSchema>;

const firestoreUiKitDataSchema = z.object({
  checkedAt: z.instanceof(Timestamp).optional(),
  issues: z.number().optional(),
  stars: z.number().optional(),
  updatedAt: z.instanceof(Timestamp).optional(),
});

type FirestoreUiKitDataSchema = z.infer<typeof firestoreUiKitDataSchema>;

const uiKitConverter: FirestoreDataConverter<
  UiKitDynamicDataSchema,
  FirestoreUiKitDataSchema
> = {
  fromFirestore: (snapshot) => {
    const { checkedAt, updatedAt, ...data } = snapshot.data();

    return uiKitDynamicDataSchema.parse({
      ...data,
      checkedAt:
        checkedAt instanceof Timestamp ? checkedAt.toDate() : undefined,
      updatedAt:
        updatedAt instanceof Timestamp ? updatedAt.toDate() : undefined,
    });
  },
  toFirestore: (data) => {
    const { checkedAt, updatedAt, ...rest } = data;

    return firestoreUiKitDataSchema.parse({
      ...rest,
      checkedAt:
        checkedAt instanceof Date ? Timestamp.fromDate(checkedAt) : undefined,
      updatedAt:
        updatedAt instanceof Date ? Timestamp.fromDate(updatedAt) : undefined,
    });
  },
};

const updateUiKit = async (
  dirent: Dirent,
  uiKitsCollection: CollectionReference<
    UiKitDynamicDataSchema,
    FirestoreUiKitDataSchema
  >,
) => {
  const filePath = path.join(dirent.parentPath, dirent.name);
  const buffer = await fs.promises.readFile(filePath);
  const fileData = uiKitSchema.parse(parseYaml(buffer.toString()));

  const github = await fetchGitHubRepositoryData(fileData.repository);

  if (github) {
    await uiKitsCollection.doc(dirent.name).set({
      checkedAt: new Date(),
      issues: getIssues({ github }),
      stars: getStars({ github }),
      updatedAt: getUpdatedAt({ github }),
    });
  }
};

export const uiKitRouteUpdate = async (request: Request) => {
  const url = new URL(request.url);

  if (
    url.searchParams.get("secret") !== process.env.CRON_SECRET &&
    request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    notFound();
  }

  const uiKitsCollection =
    firebaseGetFirestoreUiKitsCollection().withConverter(uiKitConverter);

  const uiKitsSnapshot = await uiKitsCollection.get();

  let checkCache: Partial<Record<string, UiKitDynamicDataSchema>> = {};

  for (const doc of uiKitsSnapshot.docs) {
    checkCache[doc.id] = doc.data();
  }

  checkCache = Object.fromEntries(
    uiKitsSnapshot.docs.map((doc) => [doc.id, doc.data()]),
  );

  const entries = await fs.promises.readdir(
    path.join(process.cwd(), "ui-kits"),
    {
      withFileTypes: true,
    },
  );

  const getSortCacheTime = (dirent: Dirent) =>
    checkCache[dirent.name]?.checkedAt?.getTime() ?? 0;

  const checkCount =
    Number.parseInt(
      url.searchParams.get("check-count") ?? process.env.CHECK_COUNT ?? "",
      10,
    ) || 1;

  const checkEntries = entries
    .filter((dirent) => dirent.isFile())
    .sort((a, b) => getSortCacheTime(a) - getSortCacheTime(b))
    .slice(0, checkCount);

  for await (const checkEntry of checkEntries) {
    await updateUiKit(checkEntry, uiKitsCollection);
  }

  return Response.json(checkEntries);
};
