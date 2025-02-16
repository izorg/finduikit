import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import type { BadgeProps } from "@radix-ui/themes/components/badge";
import Link from "next/link";
import {
  siAngular,
  type SimpleIcon,
  siReact,
  siSolid,
  siSvelte,
  siVuedotjs,
} from "simple-icons";

import type { UiKitFrameworkSchema } from "../../app/uiKitSchema";
import { SvgIcon } from "../SvgIcon";

import styles from "./FrameworkList.module.css";

const frameworkColor: Record<UiKitFrameworkSchema, BadgeProps["color"]> = {
  Angular: "red",
  React: "cyan",
  Solid: "blue",
  Svelte: "orange",
  Vue: "green",
};

const frameworkIcon: Record<UiKitFrameworkSchema, SimpleIcon> = {
  Angular: siAngular,
  React: siReact,
  Solid: siSolid,
  Svelte: siSvelte,
  Vue: siVuedotjs,
};

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
    <Flex asChild gap="1">
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
