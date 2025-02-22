import { frameworkParam } from "../../../components/FrameworkSelect";
import { uiKitFrameworkSchema } from "../../../domains/ui-kit";

export const dynamicParams = false;

export const generateStaticParams = async () =>
  uiKitFrameworkSchema.options.map((framework) => ({
    framework: frameworkParam[framework],
  }));

export { default, metadata } from "../../page";
