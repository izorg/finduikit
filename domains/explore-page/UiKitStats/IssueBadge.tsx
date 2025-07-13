import { mdiRecordCircleOutline } from "@mdi/js";
import { Badge, Tooltip } from "@radix-ui/themes";

import { SvgIcon } from "../../icon";

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
    <Badge asChild color="grass">
      <a href={`${repository}/issues`} rel="noreferrer" target="_blank">
        <SvgIcon path={mdiRecordCircleOutline} />
        {issueFormatter.format(issues)}
      </a>
    </Badge>
  </Tooltip>
);
