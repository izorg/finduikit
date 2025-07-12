export const WebComponentsLibrary = {
  Lit: "Lit",
  Stencil: "Stencil",
} as const;

export type WebComponentsLibrary =
  (typeof WebComponentsLibrary)[keyof typeof WebComponentsLibrary];
