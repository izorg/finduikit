import { type useParams } from "next/navigation";

import { Framework } from "./Framework";
import { frameworkParam } from "./FrameworkSelect";

export const getFrameworkFromParams = (params: ReturnType<typeof useParams>) =>
  Object.values(Framework).find(
    (option) => frameworkParam[option] === params.framework,
  );
