import { mdiRecordCircleOutline } from "@mdi/js";
import { Badge, Tooltip } from "@radix-ui/themes";

import { SvgIcon } from "../../icon";

const issueFormatter = new Intl.NumberFormat("en", {
  compactDisplay: "short",
  notation: "compact",
});

type IssueBadgeProps = {
  issues: number;
};

export const IssueBadge = ({ issues }: IssueBadgeProps) => (
  <Tooltip content="Open issues">
    <Badge color="grass">
      <SvgIcon path={mdiRecordCircleOutline} />
      {issueFormatter.format(issues)}
    </Badge>
  </Tooltip>
);
