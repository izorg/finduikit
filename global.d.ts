declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANALYZE?: "true";
      FIREBASE_AUTH_EMAIL: string;
      FIREBASE_AUTH_PASSWORD: string;
      NEXT_PUBLIC_SENTRY_DSN?: string;
      NEXT_PUBLIC_SENTRY_ENABLED?: "false" | "true";
    }
  }
}

export {};
