import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

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

const imageExtensions = new Map([
  ["image/avif", "avif"],
  ["image/gif", "gif"],
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/svg+xml", "svg"],
  ["image/webp", "webp"],
]);

export const getImage = async ({
  data,
  github,
  homepage,
  name,
}: {
  data: UiKitStaticDataSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
  homepage?: HTMLElement;
  name: string;
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

  console.log("=== src ===", name, src);

  if (!src) {
    return data.image;
  }

  const response = await fetch(src);

  if (!response.ok) {
    console.log("=== not ok ===", name, src);
    return undefined;
  }

  const mimeType = response.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();

  if (!mimeType) {
    console.log(
      "=== content-type ===",
      name, response.headers.get("content-type"),
    );
    await response.body?.cancel();
    return undefined;
  }

  const extension = imageExtensions.get(mimeType);

  if (!extension) {
    console.log("=== mimeType ===", name, mimeType);
    await response.body?.cancel();
    return undefined;
  }

  const publicDir = path.join(process.cwd(), "public");
  const imageDir = path.join(publicDir, "images");
  await mkdir(imageDir, { recursive: true });

  const file = path.join(imageDir, `${name}.${extension}`);
  await writeFile(file, new Uint8Array(await response.arrayBuffer()));

  return {
    ...data.image,
    src: path.join('/', path.relative(publicDir, file)),
  };
};
