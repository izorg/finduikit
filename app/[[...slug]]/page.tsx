import { frameworkParams } from "../../domains/framework";

export const revalidate = 3600;

export const dynamicParams = false;

export const generateStaticParams = () => [
  ...Object.values(frameworkParams)
    .map((framework) => ({
      slug: [framework],
    }))
    .flatMap(({ slug }) => [{ slug }, { slug: [...slug, "unstyled"] }]),
  {
    slug: undefined,
  },
  {
    slug: ["unstyled"],
  },
];

export { Page as default, generateMetadata } from "../../domains/page";
