import type { HTMLElement } from "node-html-parser";

import type { UiKitStaticDataSchema } from "../domains/ui-kit";

import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

const getHomepageOgImage = (homepage: HTMLElement) => {
  const ogImage = homepage
    .querySelector('meta[property="og:image"]')
    ?.getAttribute("content")
    ?.trim();

  return ogImage && URL.canParse(ogImage) ? ogImage : undefined;
};

export const getImage = ({
  data,
  github,
  homepage,
}: {
  data: UiKitStaticDataSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
  homepage: HTMLElement;
}) => {
  if (data?.image === "") {
    return "";
  }

  const gitHubImage = github?.openGraphImageUrl.startsWith(
    "https://opengraph.githubassets.com",
  )
    ? undefined
    : github?.openGraphImageUrl;

  const homepageOgImage = getHomepageOgImage(homepage);

  return gitHubImage ?? homepageOgImage ?? data.image;
};
