import { Framework, frameworkParam } from "../../../domains/framework";
import {
  getGenerateMetadata,
  Page,
  type PageProps,
} from "../../../domains/page";

export const revalidate = 86_400;

export const dynamicParams = false;

export const generateStaticParams = async () =>
  Object.values(Framework).map((framework) => ({
    framework: frameworkParam[framework],
  }));

export const generateMetadata = getGenerateMetadata({ unstyled: false });

const FrameworkPage = async (props: Omit<PageProps, "unstyled">) => {
  const { params } = props;

  return <Page params={params} />;
};

export default FrameworkPage;
