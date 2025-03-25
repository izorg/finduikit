import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

import { uiKitDynamicDataSchema } from "../ui-kit/uiKitDynamicDataSchema";

import { firebaseGetFirestore } from "./firebaseGetFirestore";

const fireStoreUiKitDataSchema = z.object({
  issues: z.number().optional(),
  stars: z.number().optional(),
  updatedAt: z.instanceof(Timestamp).optional(),
});

export const firebaseGetFirestoreUiKitsCollection = () =>
  firebaseGetFirestore()
    .collection("ui-kits")
    .withConverter({
      fromFirestore: (snapshot) => {
        const { updatedAt, ...data } = snapshot.data();

        if (updatedAt instanceof Timestamp) {
          data.updatedAt = updatedAt.toDate();
        }

        return uiKitDynamicDataSchema.parse(data);
      },
      toFirestore: (data) => {
        const { updatedAt, ...rest } = data;

        if (updatedAt instanceof Date) {
          Object.assign(rest, {
            updatedAt: Timestamp.fromDate(updatedAt),
          });
        }

        return fireStoreUiKitDataSchema.parse(rest);
      },
    });
