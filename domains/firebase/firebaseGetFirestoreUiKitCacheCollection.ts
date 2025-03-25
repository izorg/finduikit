import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

import { firebaseGetFirestore } from "./firebaseGetFirestore";

const uiKitCacheSchema = z.object({
  lastUpdated: z.instanceof(Timestamp),
});

export const firebaseGetFirestoreUiKitCacheCollection = () =>
  firebaseGetFirestore()
    .collection("uikitcache")
    .withConverter({
      fromFirestore: (snapshot) => uiKitCacheSchema.parse(snapshot.data()),
      toFirestore: (data) => uiKitCacheSchema.parse(data),
    });
