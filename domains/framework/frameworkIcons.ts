import {
  IconBrandAngular,
  IconBrandReact,
  IconBrandSolidjs,
  IconBrandSvelte,
  IconBrandVue,
} from "@tabler/icons-react";
import type { ComponentType, SVGProps } from "react";

import { Framework } from "./Framework";

export const frameworkIcons: Record<
  Framework,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  [Framework.Angular]: IconBrandAngular,
  [Framework.React]: IconBrandReact,
  [Framework.Solid]: IconBrandSolidjs,
  [Framework.Svelte]: IconBrandSvelte,
  [Framework.Vue]: IconBrandVue,
};
