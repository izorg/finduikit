import { frameworkParam } from "../../../components/FrameworkSelect";
import { Framework } from "../../../domains/framework";

export const dynamicParams = false;

export const generateStaticParams = async () =>
  Object.values(Framework).map((framework) => ({
    framework: frameworkParam[framework],
  }));

export { default, metadata } from "../../page";
