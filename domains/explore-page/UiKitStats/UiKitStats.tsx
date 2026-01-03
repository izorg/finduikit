import { Flex, Text } from "@radix-ui/themes";
import type { ReactNode } from "react";

import type { UiKit } from "../../ui-kit";

import { AiBadge } from "./AiBadge";
import { IssueBadge } from "./IssueBadge";
import { StarBadge } from "./StarBadge";
import { WebComponentsBadge } from "./WebComponentsBadge";

import styles from "./UiKitStats.module.css";

type UiKitStatsProps = {
  uiKit: UiKit;
};

export const UiKitStats = (props: UiKitStatsProps) => {
  const { uiKit } = props;

  const { ai, issues = 0, repository, stars = 0, webComponents } = uiKit;

  let aiStats: ReactNode;
  let issueStats: ReactNode;
  let starStats: ReactNode;
  let webComponentStats: ReactNode;

  if (ai) {
    aiStats = ai.map((item) => (
      <li key={item.type}>
        <AiBadge ai={item} />
      </li>
    ));
  }

  if (issues) {
    issueStats = (
      <li key="issues">
        <IssueBadge issues={issues} repository={repository} />
      </li>
    );
  }

  if (stars) {
    starStats = (
      <li key="stars">
        <StarBadge stars={stars} />
      </li>
    );
  }

  if (webComponents) {
    webComponentStats = (
      <li key="web-components">
        <WebComponentsBadge webComponents={webComponents} />
      </li>
    );
  }

  const stats = [starStats, issueStats, aiStats, webComponentStats].filter(
    Boolean,
  );

  if (stats.length === 0) {
    return;
  }

  return (
    <Flex asChild gap="3">
      <Text asChild size="5">
        <ul aria-label="Statistics and features" className={styles.list}>
          {stats}
        </ul>
      </Text>
    </Flex>
  );
};
