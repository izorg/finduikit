import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import Link from "next/link";

import type { UiKitFrameworkSchema } from "../../app/uiKitSchema";
import { SvgIcon } from "../SvgIcon";

import { frameworkColor } from "./frameworkColor.ts";
import { frameworkIcon } from "./frameworkIcon.ts";

import styles from "./FrameworkList.module.css";

const frameworkLink: Record<UiKitFrameworkSchema, string> = {
  Angular: "https://angular.dev/",
  React: "https://react.dev/",
  Solid: "https://www.solidjs.com/",
  Svelte: "https://svelte.dev/",
  Vue: "https://vuejs.org/",
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
    <Flex asChild gap="2">
      <ul aria-label="Framework list" className={styles.list}>
        {frameworks.map((framework) => (
          <li className={styles.listItem} key={framework}>
            <Tooltip content={framework}>
              <IconButton
                asChild
                color={frameworkColor[framework]}
                variant="ghost"
              >
                <Link href={frameworkLink[framework]} target="_blank">
                  <SvgIcon path={frameworkIcon[framework].path} />
                </Link>
              </IconButton>
            </Tooltip>
          </li>
        ))}
      </ul>
    </Flex>
  );
};
