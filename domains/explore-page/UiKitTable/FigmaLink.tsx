import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { siFigma } from "simple-icons";

import { SvgIcon } from "../../icon";

type FigmaLinkProps = {
  figma: string;
};

export const FigmaLink = ({ figma }: FigmaLinkProps) => (
  <Flex display="inline-flex">
    <Tooltip content="Figma">
      <IconButton asChild color="crimson" variant="ghost">
        <a aria-label="Figma" href={figma} rel="noreferrer" target="_blank">
          <SvgIcon path={siFigma.path} />
        </a>
      </IconButton>
    </Tooltip>
  </Flex>
);
