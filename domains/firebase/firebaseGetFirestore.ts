import { type Firestore, getFirestore } from "firebase-admin/firestore";

import { firebaseGetApp } from "./firebaseGetApp";

declare global {
  // eslint-disable-next-line no-var
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
