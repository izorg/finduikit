import { Flex, Link, Text } from "@radix-ui/themes";

import { SvgIcon } from "../../icon";
import { stylingColors, stylingIcons, stylingLinks } from "../../styling";
import type { UiKit } from "../../ui-kit";

type StylingLinkProps = {
  styling: NonNullable<UiKit["styling"]>;
};

export const StylingLink = ({ styling }: StylingLinkProps) => (
  <Flex align="center" display="inline-flex" gap="2">
    {[styling].flat().map((style) => (
      <Flex align="center" asChild display="inline-flex" gap="1" key={style}>
        <Link asChild color="gray" highContrast>
          <a href={stylingLinks[style]} rel="noreferrer" target="_blank">
            {stylingIcons[style] && (
              <Text asChild color={stylingColors[style]}>
                <SvgIcon path={stylingIcons[style]} />
              </Text>
            )}
            <Text wrap="nowrap">{style}</Text>
          </a>
        </Link>
      </Flex>
    ))}
  </Flex>
);
