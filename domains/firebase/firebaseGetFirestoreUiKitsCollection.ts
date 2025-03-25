import { Timestamp } from "firebase-admin/firestore";

import { uiKitDynamicDataSchema } from "../ui-kit/uiKitDynamicDataSchema";

import { firebaseGetFirestore } from "./firebaseGetFirestore";

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
        return uiKitDynamicDataSchema.parse(data);
      },
    });
