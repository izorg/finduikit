import { getGenerateMetadata, Page } from "../../domains/page";

type PageProps = {
  params: Promise<{ framework?: string }>;
};

export const generateMetadata = getGenerateMetadata({ unstyled: true });

const HomePage = async (props: PageProps) => {
  const { params } = props;

  return <Page params={params} unstyled />;
};

export default HomePage;
