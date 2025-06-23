import emoji from "emoji-toolkit";
import { type HTMLElement } from "node-html-parser";

import type { UiKitStaticDataSchema } from "../domains/ui-kit";

import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

const preservedDescriptions = new Set(["KoliBri", "NG-ZORRO"]);

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

  let homepageBestDescription = [homepageDescription, homepageOgDescription]
    .toSorted((a, b) => (b?.length ?? 0) - (a?.length ?? 0))
    .at(0);

  if (["Polaris", "UI5 Web Components"].includes(data.name)) {
    homepageBestDescription = undefined;
  }

  let githubDescription = github?.description?.replaceAll(/\s+/gu, " ").trim();

  if (githubDescription) {
    githubDescription = emoji.shortnameToUnicode(githubDescription);
  }

  return homepageBestDescription ?? githubDescription ?? data.description;
};
