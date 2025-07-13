import { Flex, Link } from "@radix-ui/themes";

import { aiIcons } from "../../ai";
import { SvgIcon } from "../../icon";
import type { UiKit } from "../../ui-kit";

type AiLinkProps = {
  ai: NonNullable<UiKit["ai"]>;
};

export const AiLink = ({ ai }: AiLinkProps) => {
  const icon = aiIcons[ai.type];

  return (
    <Flex align="center" asChild gap="1">
      <Link asChild color="gray" highContrast>
        <a href={ai.url} rel="noreferrer" target="_blank">
          {icon && <SvgIcon path={icon.path} />}
          {ai.type}
        </a>
      </Link>
    </Flex>
  );
};
