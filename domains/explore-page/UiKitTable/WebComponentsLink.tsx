import { Flex, Link, Text } from "@radix-ui/themes";

import { SvgIcon } from "../../icon";
import {
  webComponentsColors,
  webComponentsIcons,
  type WebComponentsLibrary,
  webComponentsLinks,
} from "../../web-components";

type WebComponentsLinkProps = {
  webComponents: WebComponentsLibrary;
};

export const WebComponentsLink = ({
  webComponents,
}: WebComponentsLinkProps) => {
  return (
    <Flex align="center" asChild display="inline-flex" gap="1">
      <Link asChild color="gray" highContrast>
        <a
          href={webComponentsLinks[webComponents]}
          rel="noreferrer"
          target="_blank"
        >
          {webComponentsIcons[webComponents] && (
            <Text asChild color={webComponentsColors[webComponents]}>
              <SvgIcon path={webComponentsIcons[webComponents]} />
            </Text>
          )}
          {webComponents}
        </a>
      </Link>
    </Flex>
  );
};
