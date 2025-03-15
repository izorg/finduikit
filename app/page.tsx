import { getGenerateMetadata, Page, type PageProps } from "../domains/page";

export const revalidate = 3600;

export const generateMetadata = getGenerateMetadata({ unstyled: false });

const HomePage = (props: Omit<PageProps, "unstyled">) => <Page {...props} />;

export default HomePage;
