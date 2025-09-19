import type { HTMLElement } from "node-html-parser";

import type { UiKitStaticDataSchema } from "../domains/ui-kit";

import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

const getHomepageOgImage = (
  homepage: HTMLElement,
  data: UiKitStaticDataSchema,
) => {
  const ogImage = homepage
    .querySelector('meta[property="og:image"]')
    ?.getAttribute("content")
    ?.trim();

  if (!ogImage) {
    return;
  }

  if (URL.canParse(ogImage)) {
    return ogImage;
  }

  return new URL(ogImage, new URL(data.homepage).origin).toString();
};

const preservedImages = new Set(["UI5 Web Components"]);

export const getImage = ({
  data,
  github,
  homepage,
}: {
  data: UiKitStaticDataSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
  homepage: HTMLElement;
}): UiKitStaticDataSchema["image"] => {
  if (preservedImages.has(data.name)) {
    return data.image;
  }

  if (data?.image === null) {
    // eslint-disable-next-line unicorn/no-null -- null is used to indicate no image
    return null;
  }

  const gitHubImage = github?.openGraphImageUrl.startsWith(
    "https://opengraph.githubassets.com",
  )
    ? undefined // skip auto generated GitHub OpenGraph images
    : github?.openGraphImageUrl;

  const homepageOgImage = getHomepageOgImage(homepage, data);

  const src = gitHubImage ?? homepageOgImage;

  if (!src) {
    return data.image;
  }

  return {
    ...data.image,
    src,
  };
};
