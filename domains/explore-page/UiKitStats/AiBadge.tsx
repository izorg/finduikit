import { mdiCreation } from "@mdi/js";
import { Badge, Tooltip } from "@radix-ui/themes";

import { aiIcons } from "../../ai";
import { SvgIcon } from "../../icon";
import type { UiKit } from "../../ui-kit";

type AiBadgeProps = {
  ai: NonNullable<UiKit["ai"]>;
};

export const AiBadge = ({ ai }: AiBadgeProps) => (
  <Tooltip content="AI powered">
    <Badge asChild color="crimson">
      <a href={ai.url} rel="noreferrer" target="_blank">
        <SvgIcon path={aiIcons[ai.type]?.path ?? mdiCreation} />
        {ai.type}
      </a>
    </Badge>
  </Tooltip>
);
