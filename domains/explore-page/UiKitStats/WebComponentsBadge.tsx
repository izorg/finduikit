import { Button, Tooltip } from "@radix-ui/themes";

import { SvgIcon } from "../../icon";
import {
  webComponentsIcons,
  type WebComponentsLibrary,
  webComponentsLinks,
} from "../../web-components";

import styles from "./WebComponentsBadge.module.css";

type WebComponentsProps = {
  webComponents: WebComponentsLibrary;
};

export const WebComponentsBadge = ({ webComponents }: WebComponentsProps) => (
  <Tooltip content="Web Components">
    <Button
      asChild
      className={styles.badge}
      color="blue"
      size="1"
      variant="soft"
    >
      <a
        href={webComponentsLinks[webComponents]}
        rel="noreferrer"
        target="_blank"
      >
        <SvgIcon path={webComponentsIcons[webComponents]} />
        {webComponents}
      </a>
    </Button>
  </Tooltip>
);
