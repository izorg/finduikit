import { type useParams } from "next/navigation";

export const getUnstyledFromParams = (params: ReturnType<typeof useParams>) =>
  Array.isArray(params.slug) && params.slug.includes("unstyled");
