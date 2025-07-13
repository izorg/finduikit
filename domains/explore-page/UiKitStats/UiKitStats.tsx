import { Flex, Text } from "@radix-ui/themes";

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

  if ([issues, stars].every((stat) => !stat)) {
    return;
  }

  return (
    <Flex asChild gap="3">
      <Text asChild size="5">
        <ul aria-label="Statistics and features" className={styles.list}>
          {stars > 0 && (
            <li>
              <StarBadge stars={stars} />
            </li>
          )}
          {issues > 0 && (
            <li>
              <IssueBadge issues={issues} repository={repository} />
            </li>
          )}
          {ai && (
            <li>
              <AiBadge ai={ai} />
            </li>
          )}
          {webComponents && (
            <li>
              <WebComponentsBadge webComponents={webComponents} />
            </li>
          )}
        </ul>
      </Text>
    </Flex>
  );
};
