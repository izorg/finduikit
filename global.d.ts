declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANALYZE?: "true";
      NEXT_PUBLIC_SENTRY_DSN?: string;
      NEXT_PUBLIC_SENTRY_ENABLED?: "false" | "true";
    }
  }
}

export {};
