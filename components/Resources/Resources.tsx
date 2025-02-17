import { mdiWeb } from "@mdi/js";
import { Flex, Heading, IconButton, Text, Tooltip } from "@radix-ui/themes";
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
      <Heading as="h3" mb="2" size="2" weight="medium">
        Resources
      </Heading>
      <Flex asChild gap="3">
        <Text asChild size="5">
          <ul className={styles.list}>
            <li>
              <Tooltip content="Homepage">
                <IconButton asChild variant="ghost">
                  <NextLink href={uiKit.homepage} target="_blank">
                    <SvgIcon path={mdiWeb} />
                  </NextLink>
                </IconButton>
              </Tooltip>
            </li>
            <li>
              <Tooltip content="GitHub">
                <IconButton asChild color="gray" highContrast variant="ghost">
                  <NextLink href={uiKit.repository} target="_blank">
                    <SvgIcon path={siGithub.path} />
                  </NextLink>
                </IconButton>
              </Tooltip>
            </li>
          </ul>
        </Text>
      </Flex>
    </div>
  );
};
