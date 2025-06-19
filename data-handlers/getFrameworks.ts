import { Framework } from "../domains/framework";
import type { UiKitStaticDataSchema } from "../domains/ui-kit";

import { type fetchGitHubRepositoryData } from "./fetchGitHubRepositoryData";

const frameworkCompare = new Intl.Collator("en").compare;

const frameworkTopicMap = new Map<string, Framework>([
  ["angular", Framework.Angular],
  ["react", Framework.React],
  ["reactjs", Framework.React],
  ["solid-js", Framework.Solid],
  ["solid", Framework.Solid],
  ["solidjs", Framework.Solid],
  ["svelte", Framework.Svelte],
  ["vue", Framework.Vue],
  ["vue3", Framework.Vue],
  ["vuejs", Framework.Vue],
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
  data: UiKitStaticDataSchema;
  github: Awaited<ReturnType<typeof fetchGitHubRepositoryData>>;
}) => {
  if (data.frameworks) {
    return data.frameworks;
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
