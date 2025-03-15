import { Framework, frameworkParams } from "../../../../domains/framework";
import {
  getGenerateMetadata,
  Page,
  type PageProps,
} from "../../../../domains/page";

export const revalidate = 3600;

export const dynamicParams = false;

export const generateStaticParams = () =>
  Object.values(Framework).map((framework) => ({
    framework: frameworkParams[framework],
  }));

export const generateMetadata = getGenerateMetadata({ unstyled: true });

const FrameworkPage = (props: Omit<PageProps, "unstyled">) => (
  <Page {...props} unstyled />
);

export default FrameworkPage;
