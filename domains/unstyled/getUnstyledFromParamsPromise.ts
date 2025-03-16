import { cache } from "react";

import type { DynamicRouteParams } from "../next";

import { getUnstyledFromParams } from "./getUnstyledFromParams";

export const getUnstyledFromParamsPromise = cache(
  async (params: DynamicRouteParams) => getUnstyledFromParams(await params),
);
