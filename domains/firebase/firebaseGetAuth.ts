import { type Auth, connectAuthEmulator, getAuth } from "firebase/auth";

import { firebaseGetApp } from "./firebaseGetApp";

let auth: Auth | undefined;

export const firebaseGetAuth = () => {
  if (!auth) {
    auth = getAuth(firebaseGetApp());

    if (process.env.NODE_ENV === "development") {
      connectAuthEmulator(auth, "http://localhost:9099");
    }
  }

  return auth;
};
