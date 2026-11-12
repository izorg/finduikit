import { Heading, HStack, Icon, Link } from "@astryxdesign/core";
import {
  IconBrandFigma,
  IconBrandGithub,
  IconBrandStorybook,
  IconWorld,
} from "@tabler/icons-react";

import type { UiKit } from "../../ui-kit";

type UiKitCardResourcesProps = {
  uiKit: UiKit;
};

export const UiKitCardResources = ({ uiKit }: UiKitCardResourcesProps) => (
  <>
    <Heading accessibilityLevel={3} level={4} weight="medium">
      Resources
    </Heading>
    <HStack gap={2}>
      <Link href={uiKit.homepage} target="_blank" tooltip="Homepage">
        <Icon icon={IconWorld} />
      </Link>
      <Link href={uiKit.repository} target="_blank" tooltip="GitHub">
        <Icon icon={IconBrandGithub} />
      </Link>
      {uiKit.figma && (
        <Link href={uiKit.figma} target="_blank" tooltip="Figma">
          <Icon icon={IconBrandFigma} />
        </Link>
      )}
      {uiKit.storybook && (
        <Link href={uiKit.storybook} target="_blank" tooltip="Storybook">
          <Icon icon={IconBrandStorybook} />
        </Link>
      )}
    </HStack>
  </>
);
