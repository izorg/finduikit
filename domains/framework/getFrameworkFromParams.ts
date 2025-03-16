import { type useParams } from "next/navigation";

import { Framework } from "./Framework";
import { frameworkParams } from "./FrameworkSelect";

export const getFrameworkFromParams = (
  params: ReturnType<typeof useParams>,
) => {
  const { slug } = params;

  if (Array.isArray(slug)) {
    return Object.values(Framework).find(
      (option) => frameworkParams[option] === slug.at(0),
    );
  }
};
