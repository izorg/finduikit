import { Flex, Link } from "@radix-ui/themes";

import { aiIcons } from "../../ai";
import { SvgIcon } from "../../icon";
import type { UiKit } from "../../ui-kit";

type AiLinkProps = {
  ai: NonNullable<UiKit["ai"]>;
};

export const AiLink = ({ ai }: AiLinkProps) => {
  console.log("=== ai ===", ai);

  return (
    <Flex align="center" direction="column" display="flex" gap="1">
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
};
