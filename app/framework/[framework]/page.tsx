import { Framework, frameworkParam } from "../../../domains/framework";

export const dynamicParams = false;

export const generateStaticParams = async () =>
  Object.values(Framework).map((framework) => ({
    framework: frameworkParam[framework],
  }));

export { default, generateMetadata } from "../../page";
