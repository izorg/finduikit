import {
  type FirestoreDataConverter,
  Timestamp,
} from "firebase-admin/firestore";

import {
  uiKitDynamicDataSchema,
  type UiKitDynamicDataSchema,
} from "../ui-kit/uiKitDynamicDataSchema";

import { firebaseGetFirestore } from "./firebaseGetFirestore";

type FirestoreUiKitData = {
  issues?: number;
  stars?: number;
  updatedAt?: Timestamp;
};

const uiKitsConverter: FirestoreDataConverter<
  UiKitDynamicDataSchema,
  FirestoreUiKitData
> = {
  fromFirestore: (snapshot) => {
    const { updatedAt, ...data } = snapshot.data();

    return uiKitDynamicDataSchema.parse({
      ...data,
      updatedAt:
        updatedAt instanceof Timestamp ? updatedAt.toDate() : undefined,
    } satisfies UiKitDynamicDataSchema);
  },
  toFirestore: (data) => {
    const { updatedAt, ...rest } = data;

    return {
      ...rest,
      updatedAt:
        updatedAt instanceof Date ? Timestamp.fromDate(updatedAt) : undefined,
    };
  },
};

export const firebaseGetFirestoreUiKitsCollection = () =>
  firebaseGetFirestore().collection("ui-kits").withConverter(uiKitsConverter);
