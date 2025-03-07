import type { UiKitSchema } from "../domains/ui-kit";

import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

export const getDescription = ({
  data,
  github,
}: {
  data: UiKitSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
}) => {
  const githubDescription = github?.description
    ?.replaceAll(/\s+/gu, " ")
    .trim();

  return githubDescription ?? data.description;
};
