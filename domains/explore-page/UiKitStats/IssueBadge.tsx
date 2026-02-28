import { mdiRecordCircleOutline } from "@mdi/js";
import { Button, Tooltip } from "@radix-ui/themes";

import { SvgIcon } from "../../icon";

import styles from "./IssueBadge.module.css";

const issueFormatter = new Intl.NumberFormat("en", {
  compactDisplay: "short",
  notation: "compact",
});

type IssueBadgeProps = {
  issues: number;
  repository: string;
};

export const IssueBadge = ({ issues, repository }: IssueBadgeProps) => (
  <Tooltip content="Open issues">
    <Button
      asChild
      className={styles.badge}
      color="grass"
      size="1"
      variant="soft"
    >
      <a href={`${repository}/issues`} rel="noreferrer" target="_blank">
        <SvgIcon path={mdiRecordCircleOutline} />
        {issueFormatter.format(issues)}
      </a>
    </Button>
  </Tooltip>
);
