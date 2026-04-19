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

import { fetchGitHubRepositoryData } from "../../../../data-handlers/fetchGitHubRepositoryData";
import { getIssues } from "../../../../data-handlers/getIssues";
import { getStars } from "../../../../data-handlers/getStars";
import { getUpdatedAt } from "../../../../data-handlers/getUpdatedAt";
import { firebaseGetFirestoreUiKitsCollection } from "../../../firebase";
import { uiKitStaticDataSchema } from "../../uiKitStaticDataSchema";

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
  const content = await fs.promises.readFile(filePath, "utf8");
  const fileData = uiKitStaticDataSchema.parse(parseYaml(content));

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

  const checkCache: Partial<Record<string, UiKitDynamicDataSchema>> =
    Object.fromEntries(uiKitsSnapshot.docs.map((doc) => [doc.id, doc.data()]));

  const entries = await fs.promises.readdir(
    path.join(process.cwd(), "ui-kits"),
    {
      withFileTypes: true,
    },
  );

  const fileEntries = entries.filter((dirent) => dirent.isFile());

  const staticDataSet = new Set(fileEntries.map((dirent) => dirent.name));
  const dynamicDataSet = new Set(Object.keys(checkCache));

  await Promise.all(
    dynamicDataSet
      .difference(staticDataSet)
      .values()
      .map((id) => uiKitsCollection.doc(id).delete()),
  );

  const getSortCacheTime = (dirent: Dirent) =>
    checkCache[dirent.name]?.checkedAt?.getTime() ?? 0;

  const checkCount =
    Number.parseInt(
      url.searchParams.get("check-count") ?? process.env.CHECK_COUNT ?? "",
      10,
    ) || 1;

  const checkEntries = fileEntries
    .toSorted((a, b) => getSortCacheTime(a) - getSortCacheTime(b))
    .slice(0, checkCount);

  const stream = new ReadableStream({
    start: async (controller) => {
      for (const checkEntry of checkEntries) {
        await updateUiKit(checkEntry, uiKitsCollection);

        const delimiter = checkEntries.indexOf(checkEntry) === 0 ? "" : ",";

        controller.enqueue(`${delimiter}${path.parse(checkEntry.name).name}`);
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
};
