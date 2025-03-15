import { getGenerateMetadata, Page, type PageProps } from "../../domains/page";

export const revalidate = 3600;

export const generateMetadata = getGenerateMetadata({ unstyled: true });

const HomePage = (props: Omit<PageProps, "unstyled">) => (
  <Page {...props} unstyled />
);

export default HomePage;
