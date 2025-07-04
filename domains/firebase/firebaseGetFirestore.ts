import { type Firestore, getFirestore } from "firebase-admin/firestore";

import { firebaseGetApp } from "./firebaseGetApp";

declare global {
  var firestore: Firestore | undefined;
}

export const firebaseGetFirestore = () => {
  if (!globalThis.firestore) {
    globalThis.firestore = getFirestore(firebaseGetApp());

    globalThis.firestore.settings({
      ignoreUndefinedProperties: true,
    });
  }

  return globalThis.firestore;
};
