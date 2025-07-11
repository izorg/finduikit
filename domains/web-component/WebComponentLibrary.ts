export const WebComponentLibrary = {
  Lit: "Lit",
  Stencil: "Stencil",
} as const;

export type WebComponentLibrary =
  (typeof WebComponentLibrary)[keyof typeof WebComponentLibrary];
