import { mdiWeb } from "@mdi/js";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import { Text } from "@radix-ui/themes/components/text";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
import { siFigma, siGithub, siStorybook } from "simple-icons";

import { SvgIcon } from "../../icon";
import type { UiKit } from "../../ui-kit";

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
                  <a href={uiKit.homepage} rel="noreferrer" target="_blank">
                    <SvgIcon path={mdiWeb} />
                  </a>
                </IconButton>
              </Tooltip>
            </li>
            <li>
              <Tooltip content="GitHub">
                <IconButton asChild color="gray" highContrast variant="ghost">
                  <a href={uiKit.repository} rel="noreferrer" target="_blank">
                    <SvgIcon path={siGithub.path} />
                  </a>
                </IconButton>
              </Tooltip>
            </li>
            {uiKit.storybook && (
              <li>
                <Tooltip content="Storybook">
                  <IconButton asChild color="ruby" variant="ghost">
                    <a href={uiKit.storybook} rel="noreferrer" target="_blank">
                      <SvgIcon path={siStorybook.path} />
                    </a>
                  </IconButton>
                </Tooltip>
              </li>
            )}
            {uiKit.figma && (
              <li>
                <Tooltip content="Figma">
                  <IconButton asChild color="crimson" variant="ghost">
                    <a href={uiKit.figma} rel="noreferrer" target="_blank">
                      <SvgIcon path={siFigma.path} />
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
