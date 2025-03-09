import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

export const getIssues = ({
  github,
}: {
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
}) => github?.issues.totalCount;
