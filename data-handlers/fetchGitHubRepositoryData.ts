import type { GetGitHubRepositoryQuery } from "./fetchGitHubRepositoryData.generated";

export const fetchGitHubRepositoryData = async (url: string) => {
  const response = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query: /* GraphQL */ `
        query getGitHubRepository($url: URI!) {
          resource(url: $url) {
            __typename
            ... on Repository {
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

  const data = json.data as GetGitHubRepositoryQuery;

  if (data.resource?.__typename === "Repository") {
    return data.resource;
  }
};
