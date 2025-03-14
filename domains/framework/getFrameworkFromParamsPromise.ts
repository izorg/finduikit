import { cache } from "react";

import type { DynamicRouteParams } from "../next";

import { getFrameworkFromParams } from "./getFrameworkFromParams";

export const getFrameworkFromParamsPromise = cache(
  async (params: DynamicRouteParams) => getFrameworkFromParams(await params),
);
