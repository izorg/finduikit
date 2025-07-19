import { Badge, Tooltip } from "@radix-ui/themes";
import { siWebcomponentsdotorg } from "simple-icons";

import { SvgIcon } from "../../icon";
import {
  webComponentsIcons,
  type WebComponentsLibrary,
  webComponentsLinks,
} from "../../web-components";

type WebComponentsProps = {
  webComponents: WebComponentsLibrary;
};

export const WebComponentsBadge = ({ webComponents }: WebComponentsProps) => (
  <Tooltip content="Web Components">
    <Badge asChild color="blue">
      <a
        href={webComponentsLinks[webComponents]}
        rel="noreferrer"
        target="_blank"
      >
        <SvgIcon
          path={webComponentsIcons[webComponents] ?? siWebcomponentsdotorg.path}
        />
        {webComponents}
      </a>
    </Badge>
  </Tooltip>
);
