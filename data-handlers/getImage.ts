import type { UiKitStaticDataSchema } from "../domains/ui-kit";

import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

export const getImage = ({
  data,
  github,
}: {
  data: UiKitStaticDataSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
}) => {
  if (data?.image === "") {
    return "";
  }

  const gitHubImage = github?.openGraphImageUrl.startsWith(
    "https://opengraph.githubassets.com",
  )
    ? undefined
    : github?.openGraphImageUrl;

  return gitHubImage ?? data.image;
};
