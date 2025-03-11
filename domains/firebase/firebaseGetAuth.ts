import { type Auth, connectAuthEmulator, getAuth } from "firebase/auth";

import { firebaseGetApp } from "./firebaseGetApp";

let auth: Auth | undefined;

export const firebaseGetAuth = () => {
  if (!auth) {
    auth = getAuth(firebaseGetApp());

    if (process.env.FOREBASE_EMULATORS === "true") {
      connectAuthEmulator(auth, "http://localhost:9099");
    }
  }

  return auth;
};
