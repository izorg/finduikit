declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANALYZE?: "true";
      NEXT_PUBLIC_SENTRY_DSN?: string;
    }
  }
}

export {};
