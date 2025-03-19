import { Framework } from "../domains/framework";
import type { UiKitSchema } from "../domains/ui-kit";

import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

const frameworkCompare = new Intl.Collator("en").compare;

const frameworkTopicMap = new Map<string, Framework>([
  ["angular", Framework.Angular],
  ["react", Framework.React],
  ["reactjs", Framework.React],
  ["solid", Framework.Solid],
  ["solidjs", Framework.Solid],
  ["svelte", Framework.Svelte],
  ["vue", Framework.Vue],
]);

const getFrameworksFromTopics = (topics: string[]) => {
  const frameworks = topics
    .map((topic) => frameworkTopicMap.get(topic))
    .filter((framework) => framework !== undefined)
    .sort(frameworkCompare);

  return frameworks.length > 0 ? [...new Set(frameworks)] : undefined;
};

export const getFrameworks = ({
  data,
  github,
}: {
  data: UiKitSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
}) => {
  if (data.name === "Ant Design Vue") {
    return [Framework.Vue];
  }

  if (data.frameworks?.length === 0) {
    return [];
  }

  const topics = github?.repositoryTopics.nodes
    ?.map((repositoryTopic) => repositoryTopic?.topic.name)
    .filter((topic) => topic !== undefined);

  if (topics) {
    const githubFrameworks = getFrameworksFromTopics(topics);

    if (githubFrameworks) {
      return githubFrameworks;
    }
  }

  return data.frameworks;
};
