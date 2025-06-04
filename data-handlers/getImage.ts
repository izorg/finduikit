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

  return github?.openGraphImageUrl?.startsWith(
    "https://repository-images.githubusercontent.com/",
  )
    ? github.openGraphImageUrl
    : data.image;
};
