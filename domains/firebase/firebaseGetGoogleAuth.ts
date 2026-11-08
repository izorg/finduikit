import { GoogleAuth, JWT } from "google-auth-library";

declare global {
  var googleAuth: GoogleAuth | undefined;
}

export const firebaseGetGoogleAuth = () => {
  if (!globalThis.googleAuth) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    ) as {
      client_email: string;
      private_key: string;
      project_id: string;
    };

    globalThis.googleAuth = new GoogleAuth({
      authClient: new JWT({
        email: serviceAccount.client_email,
        key: serviceAccount.private_key,
        scopes: ["https://www.googleapis.com/auth/datastore"],
      }),
      projectId: serviceAccount.project_id,
    });
  }

  return globalThis.googleAuth;
}
