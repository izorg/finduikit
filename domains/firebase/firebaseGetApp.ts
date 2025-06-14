import admin from "firebase-admin";
import { type App, initializeApp } from "firebase-admin/app";

declare global {
  var app: App | undefined;
}

export const firebaseGetApp = () => {
  if (!globalThis.app) {
    globalThis.app = initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY),
      ),
    });
  }

  return globalThis.app;
};
