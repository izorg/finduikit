import {
  connectFirestoreEmulator,
  type Firestore,
  getFirestore,
} from "firebase/firestore/lite";

import { firebaseGetApp } from "./firebaseGetApp";

let firestore: Firestore | undefined;

export const firebaseGetFirestore = () => {
  if (!firestore) {
    firestore = getFirestore(firebaseGetApp());

    if (process.env.NODE_ENV === "development") {
      connectFirestoreEmulator(firestore, "localhost", 8088);
    }
  }

  return firestore;
};
