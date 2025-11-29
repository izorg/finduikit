declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANALYZE?: "true";
      CRON_SECRET: string;
      FIREBASE_AUTH_EMAIL: string;
      FIREBASE_AUTH_PASSWORD: string;
      FIREBASE_SERVICE_ACCOUNT_KEY: string;
      GITHUB_PERSONAL_ACCESS_TOKEN: string;
      NEXT_PUBLIC_SENTRY_ENABLED?: "false" | "true";
    }
  }
}

export {};
