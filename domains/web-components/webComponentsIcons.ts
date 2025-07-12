import { siLit, type SimpleIcon, siStencil } from "simple-icons";

import { WebComponentsLibrary } from "./WebComponentsLibrary";

export const webComponentsIcons: Record<WebComponentsLibrary, SimpleIcon> = {
  [WebComponentsLibrary.Lit]: siLit,
  [WebComponentsLibrary.Stencil]: siStencil,
};
