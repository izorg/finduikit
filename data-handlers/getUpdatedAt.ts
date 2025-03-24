import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

export const getUpdatedAt = ({
  github,
}: {
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
}) => {
  if (github?.defaultBranchRef?.target?.__typename === "Commit") {
    return new Date(github.defaultBranchRef.target.committedDate);
  }
};
