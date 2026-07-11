import { Flex, IconButton, Link, Tooltip } from "@radix-ui/themes";
import { siGithub } from "simple-icons";

import { SvgIcon } from "../../icon";
import type { UiKit } from "../../ui-kit";

type UiKitNameProps = {
  uiKit: UiKit;
};

const title = "GitHub";

export const UiKitName = ({ uiKit }: UiKitNameProps) => (
  <Flex align="center" display="inline-flex" gap="2">
    <Link asChild color="gray" highContrast wrap="nowrap">
      <a href={uiKit.homepage} rel="noreferrer" target="_blank">
        {uiKit.name}
      </a>
    </Link>
    <Tooltip content={title}>
      <IconButton asChild color="gray" highContrast variant="ghost">
        <a
          aria-label={title}
          href={uiKit.repository}
          rel="noreferrer"
          target="_blank"
        >
          <SvgIcon aria-hidden path={siGithub.path} />
        </a>
      </IconButton>
    </Tooltip>
  </Flex>
);
