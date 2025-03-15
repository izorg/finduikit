import { signInWithEmailAndPassword, type UserCredential } from "firebase/auth";

import { firebaseGetAuth } from "./firebaseGetAuth";

let credential: UserCredential;

export const firebaseSignIn = async () => {
  if (!credential) {
    credential = await signInWithEmailAndPassword(
      firebaseGetAuth(),
      process.env.FIREBASE_AUTH_EMAIL,
      process.env.FIREBASE_AUTH_PASSWORD,
    );
  }
};
