import { getGenerateMetadata } from "../domains/page";

export const revalidate = 3600;

export const generateMetadata = getGenerateMetadata({ unstyled: false });

export { Page as default } from "../domains/page";
