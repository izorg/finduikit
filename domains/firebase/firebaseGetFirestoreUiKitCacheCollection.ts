import {
  type FirestoreDataConverter,
  Timestamp,
} from "firebase-admin/firestore";
import { z } from "zod";

import { firebaseGetFirestore } from "./firebaseGetFirestore";

const uiKitCacheSchema = z.object({
  lastUpdated: z.instanceof(Timestamp),
});

type FirestoreUiKitCache = {
  lastUpdated: Timestamp;
};

const uiKitCacheConverter: FirestoreDataConverter<
  FirestoreUiKitCache,
  FirestoreUiKitCache
> = {
  fromFirestore: (snapshot) => uiKitCacheSchema.parse(snapshot.data()),
  toFirestore: (data) => uiKitCacheSchema.parse(data),
};

export const firebaseGetFirestoreUiKitCacheCollection = () =>
  firebaseGetFirestore()
    .collection("uikitcache")
    .withConverter(uiKitCacheConverter);
