import {
  siAngular,
  type SimpleIcon,
  siReact,
  siSolid,
  siSvelte,
  siVuedotjs,
} from "simple-icons";

import type { UiKitFrameworkSchema } from "../../domains/ui-kit";

export const frameworkIcon: Record<UiKitFrameworkSchema, SimpleIcon> = {
  Angular: siAngular,
  React: siReact,
  Solid: siSolid,
  Svelte: siSvelte,
  Vue: siVuedotjs,
};
