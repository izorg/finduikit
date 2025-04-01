import { firebaseGetFirestore } from "./firebaseGetFirestore";

export const firebaseGetFirestoreUiKitsCollection = () =>
  firebaseGetFirestore().collection("ui-kits");
