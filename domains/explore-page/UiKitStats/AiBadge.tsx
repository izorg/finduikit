import { mdiCreation } from "@mdi/js";
import { Button, DropdownMenu, Tooltip } from "@radix-ui/themes";

import { aiIcons } from "../../ai";
import { SvgIcon } from "../../icon";
import type { UiKit } from "../../ui-kit";

import styles from "./AiBadge.module.css";

type AiBadgeProps = {
  ai: NonNullable<UiKit["ai"]>;
};

export const AiBadge = ({ ai }: AiBadgeProps) => {
  if (ai.length === 1) {
    const [item] = ai;

    return (
      <Tooltip content="AI for Agents">
        <Button
          asChild
          className={styles.badge}
          color="crimson"
          size="1"
          variant="soft"
        >
          <a href={item.url} rel="noreferrer" target="_blank">
            <SvgIcon path={aiIcons[item.type]?.path ?? mdiCreation} />
            {item.type}
          </a>
        </Button>
      </Tooltip>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          className={styles.badge}
          color="crimson"
          size="1"
          variant="soft"
        >
          <SvgIcon path={mdiCreation} />
          AI for Agents
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {ai.map((item) => (
          <DropdownMenu.Item asChild key={item.type}>
            <a href={item.url} rel="noreferrer" target="_blank">
              {item.type}
            </a>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
