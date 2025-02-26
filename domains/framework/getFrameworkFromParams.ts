import { cache } from "react";

import type { DynamicRouteParams } from "../next";

import { Framework } from "./Framework";
import { frameworkParam } from "./FrameworkSelect";

export const getFrameworkFromParams = cache(
  async (params: DynamicRouteParams) => {
    const { framework } = await params;

    return Object.values(Framework).find(
      (option) => frameworkParam[option] === framework,
    );
  },
);
