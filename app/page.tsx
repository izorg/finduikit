import { getGenerateMetadata, Page, type PageProps } from "../domains/page";

export const generateMetadata = getGenerateMetadata({ unstyled: false });

const HomePage = async (props: Omit<PageProps, "unstyled">) => {
  const { params } = props;

  return <Page params={params} />;
};

export default HomePage;
