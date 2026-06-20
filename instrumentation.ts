export const register = async () => {
  await import("./sentry.server.config");
};

export { captureRequestError as onRequestError } from "@sentry/nextjs";
