import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { siStorybook } from "simple-icons";

import { SvgIcon } from "../../icon";

type StorybookLinkProps = {
  storybook: string;
};

export const StorybookLink = ({ storybook }: StorybookLinkProps) => (
  <Flex display="inline-flex">
    <Tooltip content="Storybook">
      <IconButton asChild color="ruby" variant="ghost">
        <a
          aria-label="Storybook"
          href={storybook}
          rel="noreferrer"
          target="_blank"
        >
          <SvgIcon path={siStorybook.path} />
        </a>
      </IconButton>
    </Tooltip>
  </Flex>
);
