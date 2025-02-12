import { mdiWeb } from "@mdi/js";
import { Badge, Flex, Heading } from "@radix-ui/themes";
import NextLink from "next/link";
import { siGithub } from "simple-icons";

import type { UiKit } from "../../app/getUiKits.ts";
import { SvgIcon } from "../SvgIcon";

import styles from "./Resources.module.css";

type ResourcesProps = {
  uiKit: UiKit;
};

export const Resources = (props: ResourcesProps) => {
  const { uiKit } = props;

  return (
    <div>
      <Heading as="h3" mb="1" size="2" weight="medium">
        Resources
      </Heading>
      <Flex asChild gap="1">
        <ul className={styles.list}>
          <li>
            <Badge asChild>
              <NextLink href={uiKit.homepage} target="_blank">
                <SvgIcon path={mdiWeb} />
                Homepage
              </NextLink>
            </Badge>
          </li>
          <li>
            <Badge asChild>
              <NextLink href={uiKit.repository} target="_blank">
                <SvgIcon path={siGithub.path} />
                GitHub
              </NextLink>
            </Badge>
          </li>
        </ul>
      </Flex>
    </div>
  );
};
