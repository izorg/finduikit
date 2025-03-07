import { type HTMLElement } from "node-html-parser";

import type { UiKitSchema } from "../domains/ui-kit";

import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

export const getDescription = ({
  data,
  github,
  homepage,
}: {
  data: UiKitSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
  homepage: HTMLElement;
}) => {
  const homepageDescription = homepage
    .querySelector('head > meta[name="description"]')
    ?.getAttribute("content")
    ?.trim();

  const homepageOgDescription = homepage
    .querySelector('head > meta[name="og:description"]')
    ?.getAttribute("content")
    ?.trim();

  let homepageBestDescription = [homepageDescription, homepageOgDescription]
    .toSorted((a, b) => (b?.length ?? 0) - (a?.length ?? 0))
    .at(0);

  if (["Polaris", "UI5 Web Components"].includes(data.name)) {
    homepageBestDescription = undefined;
  }

  const githubDescription = github?.description
    ?.replaceAll(/\s+/gu, " ")
    .trim();

  return homepageBestDescription ?? githubDescription ?? data.description;
};
