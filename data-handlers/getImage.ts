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

  let url: URL;

  try {
    url = new URL(ogImage, data.homepage);
  } catch {
    return;
  }

  url.search = "";

  // Resolve wrong OG image URL issue for `lion.yml`
  if (url.hostname === "localhost") {
    url = new URL(
      url.href.slice(url.origin.length),
      new URL(data.homepage).origin,
    );
  }

  return url.href;
};

const preservedImages = new Set(["UI5 Web Components"]);

export const getImage = async ({
  data,
  github,
  homepage,
}: {
  data: UiKitStaticDataSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
  homepage?: HTMLElement;
}): Promise<UiKitStaticDataSchema["image"]> => {
  if (preservedImages.has(data.name)) {
    return data.image;
  }

  if (data.image === false) {
    return false;
  }

  const gitHubImage = github?.openGraphImageUrl.startsWith(
    "https://opengraph.githubassets.com",
  )
    ? undefined // skip auto generated GitHub OpenGraph images
    : github?.openGraphImageUrl;

  const homepageOgImage = homepage && getHomepageOgImage(homepage, data);

  const src = gitHubImage ?? homepageOgImage;

  if (!src) {
    return data.image;
  }

  const response = await fetch(src);

  if (response.status === 404) {
    return undefined;
  }

  return {
    ...data.image,
    src,
  };
};
