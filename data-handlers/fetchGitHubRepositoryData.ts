import type { GraphQLError } from "graphql";

import type {
  GetGitHubRepositoryQuery,
  GetGitHubRepositoryQueryVariables,
} from "./fetchGitHubRepositoryData.generated";

const getLegacyOpenGraphImageUrl = (openGraphImageUrl: string) => {
  const imageUrl = new URL(openGraphImageUrl);

  if (
    imageUrl.origin !== "https://repository-images.githubusercontent.com" ||
    !imageUrl.pathname.startsWith("/github-production-repository-image-")
  ) {
    return openGraphImageUrl;
  }

  imageUrl.pathname = imageUrl.pathname.split("/").slice(2).join("/");
  imageUrl.search = "";

  return imageUrl.href;
};

export const fetchGitHubRepositoryData = async (url: string) => {
  const query = /* GraphQL */ `
    query getGitHubRepository($url: URI!) {
      resource(url: $url) {
        __typename
        ... on Repository {
          defaultBranchRef {
            target {
              ... on Commit {
                __typename
                committedDate
              }
            }
          }
          description
          homepageUrl
          issues(states: [OPEN]) {
            totalCount
          }
          openGraphImageUrl
          repositoryTopics(first: 100) {
            nodes {
              topic {
                name
              }
            }
          }
          stargazerCount
        }
      }
    }
  `;

  const variables: GetGitHubRepositoryQueryVariables = {
    url,
  };

  const response = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const json = (await response.json()) as
    | { data: GetGitHubRepositoryQuery }
    | { errors: ReadonlyArray<GraphQLError> };

  if ("errors" in json) {
    throw new Error(JSON.stringify(json.errors));
  }

  const data = json.data;

  if (data.resource?.__typename === "Repository") {
    const openGraphImageUrl = getLegacyOpenGraphImageUrl(
      data.resource.openGraphImageUrl,
    );

    return {
      ...data.resource,
      openGraphImageUrl,
    };
  }
};
