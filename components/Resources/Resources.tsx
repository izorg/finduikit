import { mdiWeb } from "@mdi/js";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import { Text } from "@radix-ui/themes/components/text";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
import { siGithub, siStorybook } from "simple-icons";

import type { UiKit } from "../../domains/ui-kit";
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
                  <a href={uiKit.homepage} target="_blank">
                    <SvgIcon path={mdiWeb} />
                  </a>
                </IconButton>
              </Tooltip>
            </li>
            <li>
              <Tooltip content="GitHub">
                <IconButton asChild color="gray" highContrast variant="ghost">
                  <a href={uiKit.repository} target="_blank">
                    <SvgIcon path={siGithub.path} />
                  </a>
                </IconButton>
              </Tooltip>
            </li>
            {uiKit.storybook && (
              <li>
                <Tooltip content="Storybook">
                  <IconButton asChild color="ruby" variant="ghost">
                    <a href={uiKit.storybook} target="_blank">
                      <SvgIcon path={siStorybook.path} />
                    </a>
                  </IconButton>
                </Tooltip>
              </li>
            )}
          </ul>
        </Text>
      </Flex>
    </div>
  );
};
