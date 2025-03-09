import { type FirebaseApp, initializeApp } from "firebase/app";

let app: FirebaseApp | undefined;

export const firebaseGetApp = () => {
  if (!app) {
    app = initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      appId: process.env.FIREBASE_APP_ID,
      authDomain: "finduikit.firebaseapp.com",
      projectId: "finduikit",
    });
  }

  return app;
};
