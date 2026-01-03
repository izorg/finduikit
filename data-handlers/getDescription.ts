import emoji from "emoji-toolkit";
import { type HTMLElement } from "node-html-parser";

import type { UiKitStaticDataSchema } from "../domains/ui-kit";

import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

const descriptionCompare = (a?: string, b?: string) =>
  (b?.length ?? 0) - (a?.length ?? 0);

const preservedDescriptions = new Set([
  "Atlantis",
  "KoliBri",
  "Momentum Design",
  "NG-ZORRO",
  "UI5 Web Components",
]);

export const getDescription = ({
  data,
  github,
  homepage,
}: {
  data: UiKitStaticDataSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
  homepage: HTMLElement;
}) => {
  if (preservedDescriptions.has(data.name)) {
    return data.description;
  }

  const homepageDescription = homepage
    .querySelector('meta[name="description"]')
    ?.getAttribute("content")
    ?.trim();

  const homepageOgDescription = homepage
    .querySelector('meta[name="og:description"]')
    ?.getAttribute("content")
    ?.trim();

  let githubDescription = github?.description?.replaceAll(/\s+/gu, " ").trim();

  if (githubDescription) {
    githubDescription = emoji.shortnameToUnicode(githubDescription);
  }

  const homepageBestDescription = [
    homepageDescription,
    homepageOgDescription,
    githubDescription,
  ]
    .toSorted(descriptionCompare)
    .at(0);

  return homepageBestDescription ?? data.description;
};
