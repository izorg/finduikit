import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

export const getStars = ({
  github,
}: {
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
}) => github?.stargazerCount;
