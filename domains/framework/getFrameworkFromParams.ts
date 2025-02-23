import { cache } from "react";

import { frameworkParam } from "../../components/FrameworkSelect";
import type { DynamicRouteParams } from "../next";

import { Framework } from "./Framework";

export const getFrameworkFromParams = cache(
  async (params: DynamicRouteParams) => {
    const { framework } = await params;

    return Object.values(Framework).find(
      (option) => frameworkParam[option] === framework,
    );
  },
);
