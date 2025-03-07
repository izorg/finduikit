import type { UiKitSchema } from "../domains/ui-kit";

import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

export const getImage = ({
  data,
  github,
}: {
  data: UiKitSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
}) =>
  github?.openGraphImageUrl?.startsWith(
    "https://repository-images.githubusercontent.com/",
  )
    ? github.openGraphImageUrl
    : data.image;
