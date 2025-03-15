import { type useParams } from "next/navigation";

import { Framework } from "./Framework";
import { frameworkParams } from "./FrameworkSelect";

export const getFrameworkFromParams = (params: ReturnType<typeof useParams>) =>
  Object.values(Framework).find(
    (option) => frameworkParams[option] === params.framework,
  );
