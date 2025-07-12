import { mdiStar } from "@mdi/js";
import { Badge, Tooltip } from "@radix-ui/themes";

import { SvgIcon } from "../../icon";

const starFormatter = new Intl.NumberFormat("en", {
  compactDisplay: "short",
  notation: "compact",
});

type StarBadgeProps = {
  stars: number;
};

export const StarBadge = ({ stars }: StarBadgeProps) => (
  <Tooltip content="Stars">
    <Badge color="amber">
      <SvgIcon path={mdiStar} />
      {starFormatter.format(stars)}
    </Badge>
  </Tooltip>
);
