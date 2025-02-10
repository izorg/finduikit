import type { GetGitHubRepositoryQuery } from "./fetchGitHubRepositoryData.generated.ts";

export const fetchGitHubRepositoryData = async (
  url: string,
): Promise<Exclude<GetGitHubRepositoryQuery["resource"], null>> => {
  const response = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query: /* GraphQL */ `
        query getGitHubRepository($url: URI!) {
          resource(url: $url) {
            __typename
            ... on Repository {
              description
              homepageUrl
              openGraphImageUrl
              repositoryTopics(first: 100) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        url,
      },
    }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const json = await response.json();

  return json.data.resource;
};
