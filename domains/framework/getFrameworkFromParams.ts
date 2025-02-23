import { cache } from "react";

import { frameworkParam } from "../../components/FrameworkSelect/index.ts";
import type { DynamicRouteParams } from "../next/index.ts";

import { Framework } from "./Framework.ts";

export const getFrameworkFromParams = cache(
  async (params: DynamicRouteParams) => {
    const { framework } = await params;

    return Object.values(Framework).find(
      (option) => frameworkParam[option] === framework,
    );
  },
);
