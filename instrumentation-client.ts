// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a user loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { init } from "@sentry/nextjs";

export { captureRouterTransitionStart as onRouterTransitionStart } from "@sentry/nextjs";

init({
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true",

  // Adjust this value in production or use tracesSampler for greater control
  tracesSampleRate: 1,
});
