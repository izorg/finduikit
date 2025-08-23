declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANALYZE?: "true";
      FIREBASE_AUTH_EMAIL: string;
      FIREBASE_AUTH_PASSWORD: string;
      FIREBASE_SERVICE_ACCOUNT_KEY: string;
      NEXT_PUBLIC_SENTRY_ENABLED?: "false" | "true";
    }
  }
}

export {};
