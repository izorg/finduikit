import { mdiCreation } from "@mdi/js";
import { Badge, Tooltip } from "@radix-ui/themes";

import { aiIcons } from "../../ai";
import { SvgIcon } from "../../icon";
import type { UiKit } from "../../ui-kit";

type AiBadgeProps = {
  ai: NonNullable<UiKit["ai"]>;
};

export const AiBadge = ({ ai }: AiBadgeProps) =>
  ai.map((item) => (
    <li key={item.type}>
      <Tooltip content="AI powered">
        <Badge asChild color="crimson">
          <a href={item.url} rel="noreferrer" target="_blank">
            <SvgIcon path={aiIcons[item.type]?.path ?? mdiCreation} />
            {item.type}
          </a>
        </Badge>
      </Tooltip>
    </li>
  ));
