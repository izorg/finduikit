import { Flex, Link, Text } from "@radix-ui/themes";

import { SvgIcon } from "../../icon";
import { stylingColors, stylingIcons, stylingLinks } from "../../styling";
import type { UiKit } from "../../ui-kit";

type StylingLinkProps = {
  styling: NonNullable<UiKit["styling"]>;
};

export const StylingLink = ({ styling }: StylingLinkProps) => (
  <Flex align="center" asChild display="inline-flex" gap="1">
    <Link asChild color="gray" highContrast>
      <a href={stylingLinks[styling]} rel="noreferrer" target="_blank">
        {stylingIcons[styling] && (
          <Text asChild color={stylingColors[styling]}>
            <SvgIcon path={stylingIcons[styling]} />
          </Text>
        )}
        <Text wrap="nowrap">{styling}</Text>
      </a>
    </Link>
  </Flex>
);
