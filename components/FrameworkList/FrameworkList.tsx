import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import Link from "next/link";

import { Framework } from "../../domains/framework";
import { SvgIcon } from "../SvgIcon";

import { frameworkColor } from "./frameworkColor.ts";
import { frameworkIcon } from "./frameworkIcon.ts";

import styles from "./FrameworkList.module.css";

const frameworkLink: Record<Framework, string> = {
  [Framework.Angular]: "https://angular.dev/",
  [Framework.React]: "https://react.dev/",
  [Framework.Solid]: "https://www.solidjs.com/",
  [Framework.Svelte]: "https://svelte.dev/",
  [Framework.Vue]: "https://vuejs.org/",
};

type FrameworkListProps = {
  frameworks?: Framework[];
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
