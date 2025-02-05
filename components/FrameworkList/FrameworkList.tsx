import { Badge, Flex } from "@radix-ui/themes";
import type { BadgeProps } from "@radix-ui/themes/components/badge";

import type { UiKitFrameworkSchema } from "../../app/uiKitSchema";

import styles from "./FrameworkList.module.css";

const frameworkColor = new Map<UiKitFrameworkSchema, BadgeProps["color"]>([
  ["Angular", "red"],
  ["React", "cyan"],
  ["Solid", "blue"],
  ["Svelte", "orange"],
  ["Vue", "green"],
  ["Web Components", "indigo"],
]);

type FrameworkListProps = {
  frameworks?: UiKitFrameworkSchema[];
};

export const FrameworkList = (props: FrameworkListProps) => {
  const { frameworks } = props;

  if (!frameworks || frameworks.length === 0) {
    return;
  }

  return (
    <Flex asChild gap="1">
      <ul className={styles.list}>
        {frameworks.map((framework) => (
          <li key={framework}>
            <Badge color={frameworkColor.get(framework)}>{framework}</Badge>
          </li>
        ))}
      </ul>
    </Flex>
  );
};
