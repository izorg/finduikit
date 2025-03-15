import { Framework, frameworkParam } from "../../../domains/framework";
import {
  getGenerateMetadata,
  Page,
  type PageProps,
} from "../../../domains/page";

export const revalidate = 3600;

export const dynamicParams = false;

export const generateStaticParams = () =>
  Object.values(Framework).map((framework) => ({
    framework: frameworkParam[framework],
  }));

export const generateMetadata = getGenerateMetadata({ unstyled: false });

const FrameworkPage = (props: Omit<PageProps, "unstyled">) => (
  <Page {...props} />
);

export default FrameworkPage;
