import {
  siAngular,
  type SimpleIcon,
  siReact,
  siSolid,
  siSvelte,
  siVuedotjs,
} from "simple-icons";

import { Framework } from "../../domains/framework";

export const frameworkIcon: Record<Framework, SimpleIcon> = {
  [Framework.Angular]: siAngular,
  [Framework.React]: siReact,
  [Framework.Solid]: siSolid,
  [Framework.Svelte]: siSvelte,
  [Framework.Vue]: siVuedotjs,
};
