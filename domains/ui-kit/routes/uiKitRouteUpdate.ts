import fs, { type Dirent } from "node:fs";
import path from "node:path";

import { Timestamp } from "firebase-admin/firestore";
import { notFound } from "next/navigation";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

import { fetchGitHubRepositoryData } from "../../../data-handlers/fetchGitHubRepositoryData";
import { getIssues } from "../../../data-handlers/getIssues";
import { getStars } from "../../../data-handlers/getStars";
import { firebaseGetFirestore } from "../../firebase";
import { uiKitDynamicDataSchema } from "../uiKitDynamicDataSchema";
import { uiKitSchema } from "../uiKitSchema";

const firestore = firebaseGetFirestore();

const CHECK_COUNT = Number.parseInt(process.env.CHECK_COUNT ?? "", 10) || 1;

const uiKitCacheSchema = z.object({
  lastUpdated: z.instanceof(Timestamp),
});

const updateUiKit = async (dirent: Dirent) => {
  const filePath = path.join(dirent.parentPath, dirent.name);
  const buffer = await fs.promises.readFile(filePath);
  const fileData = uiKitSchema.parse(parseYaml(buffer.toString()));

  const github = await fetchGitHubRepositoryData(fileData.repository);

  if (github) {
    await firestore
      .collection("ui-kits")
      .doc(dirent.name)
      .set(
        uiKitDynamicDataSchema.parse({
          issues: getIssues({ github }),
          stars: getStars({ github }),
        }),
      );
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

  const uiKitCacheCollection = firestore
    .collection("uikitcache")
    .withConverter({
      fromFirestore: (snapshot) => uiKitCacheSchema.parse(snapshot.data()),
      toFirestore: (data) => uiKitCacheSchema.parse(data),
    });

  let checkCache;

  try {
    const snapshot = await uiKitCacheCollection.get();

    checkCache = Object.fromEntries(
      snapshot.docs.map((doc) => [doc.id, doc.data()]),
    );
  } catch (error) {
    checkCache = {};

    console.log("=== catch ===", error);
  }

  const entries = await fs.promises.readdir(
    path.join(process.cwd(), "ui-kits"),
    {
      withFileTypes: true,
    },
  );

  const getSortCacheTime = (dirent: Dirent) =>
    dirent.name in checkCache
      ? checkCache[dirent.name].lastUpdated.toMillis()
      : 0;

  const checkEntries = entries
    .filter((dirent) => dirent.isFile())
    .sort((a, b) => getSortCacheTime(a) - getSortCacheTime(b))
    .slice(0, CHECK_COUNT);

  for await (const checkEntry of checkEntries) {
    await updateUiKit(checkEntry);
    await uiKitCacheCollection.doc(checkEntry.name).set({
      lastUpdated: Timestamp.now(),
    });
  }

  return Response.json(checkEntries);
};
