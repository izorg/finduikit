import { mdiRecordCircleOutline, mdiStar } from "@mdi/js";
import { Badge } from "@radix-ui/themes/components/badge";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { Tooltip } from "@radix-ui/themes/components/tooltip";

import { SvgIcon } from "../../../icon";
import type { UiKit } from "../../getUiKits";

import styles from "./UiKitStats.module.css";

type UiKitStatsProps = {
  uiKit: UiKit;
};

const starFormatter = new Intl.NumberFormat("en", {
  compactDisplay: "short",
  notation: "compact",
});

export const UiKitStats = (props: UiKitStatsProps) => {
  const { uiKit } = props;

  const { issues = 0, stars = 0 } = uiKit;

  if ([issues, stars].every((stat) => !stat)) {
    return;
  }

  return (
    <Flex asChild gap="3">
      <Text asChild size="5">
        <ul className={styles.list}>
          {stars > 0 && (
            <li>
              <Tooltip content="Stars">
                <Badge color="amber">
                  <SvgIcon path={mdiStar} />
                  {starFormatter.format(stars)}
                </Badge>
              </Tooltip>
            </li>
          )}
          {issues > 0 && (
            <li>
              <Tooltip content="Open issues">
                <Badge color="grass">
                  <SvgIcon path={mdiRecordCircleOutline} />
                  {starFormatter.format(issues)}
                </Badge>
              </Tooltip>
            </li>
          )}
        </ul>
      </Text>
    </Flex>
  );
};
