import { Flex, Link } from "@radix-ui/themes";

import { aiIcons } from "../../ai";
import { SvgIcon } from "../../icon";
import type { UiKit } from "../../ui-kit";

type AiLinksProps = {
  ai: NonNullable<UiKit["ai"]>;
};

export const AiLinks = ({ ai }: AiLinksProps) => (
  <Flex align="center" display="flex" gap="2">
    {ai.map((item) => {
      const icon = aiIcons[item.type];

      return (
        <Flex
          align="center"
          asChild
          display="inline-flex"
          gap="1"
          key={item.type}
        >
          <Link asChild color="gray" highContrast>
            <a href={item.url} rel="noreferrer" target="_blank">
              {icon && <SvgIcon path={icon.path} />}
              {item.type}
            </a>
          </Link>
        </Flex>
      );
    })}
  </Flex>
);
