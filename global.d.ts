declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SENTRY_DSN?: string;
    }
  }
}

export {};
