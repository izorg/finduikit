import { Flex } from "@radix-ui/themes/components/flex";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import { Tooltip } from "@radix-ui/themes/components/tooltip";

import { SvgIcon } from "../../icon";
import { Framework } from "../Framework";

import { frameworkColors } from "./frameworkColors";
import { frameworkIcons } from "./frameworkIcons";

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
                color={frameworkColors[framework]}
                variant="ghost"
              >
                <a href={frameworkLink[framework]} target="_blank">
                  <SvgIcon path={frameworkIcons[framework].path} />
                </a>
              </IconButton>
            </Tooltip>
          </li>
        ))}
      </ul>
    </Flex>
  );
};
