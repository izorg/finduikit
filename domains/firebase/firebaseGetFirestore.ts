import { type Firestore, getFirestore } from "firebase-admin/firestore";

import { firebaseGetApp } from "./firebaseGetApp";

let firestore: Firestore | undefined;

export const firebaseGetFirestore = () => {
  if (!firestore) {
    firestore = getFirestore(firebaseGetApp());
  }

  return firestore;
};
