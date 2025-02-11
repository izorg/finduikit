import { Badge, Flex } from "@radix-ui/themes";
import type { BadgeProps } from "@radix-ui/themes/components/badge";
import Link from "next/link";

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

const frameworkLink: Record<UiKitFrameworkSchema, string> = {
  Angular: "https://angular.dev/",
  React: "https://react.dev/",
  Solid: "https://www.solidjs.com/",
  Svelte: "https://svelte.dev/",
  Vue: "https://vuejs.org/",
  "Web Components":
    "https://developer.mozilla.org/en-US/docs/Web/API/Web_components",
};

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
            <Badge asChild color={frameworkColor.get(framework)}>
              <Link href={frameworkLink[framework]} target="_blank">
                {framework}
              </Link>
            </Badge>
          </li>
        ))}
      </ul>
    </Flex>
  );
};
