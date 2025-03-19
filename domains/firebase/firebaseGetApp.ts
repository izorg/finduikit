import admin from "firebase-admin";
import { type App, initializeApp } from "firebase-admin/app";

declare global {
  // eslint-disable-next-line no-var
  var app: App | undefined;
}

export const firebaseGetApp = () => {
  if (!globalThis.app) {
    console.log("=== app ===");

    globalThis.app = initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY),
      ),
    });
  }

  return globalThis.app;
};
