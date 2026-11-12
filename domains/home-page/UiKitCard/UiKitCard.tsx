import "linkify-plugin-mention";

import { Card, Divider, Heading, Link, Text, VStack } from "@astryxdesign/core";
import * as stylex from "@stylexjs/stylex";
import Linkify from "linkify-react";
import type { IntermediateRepresentation } from "linkifyjs";

import type { UiKit } from "../../ui-kit";

import { UiKitCardImage } from "./UiKitCardImage";
import { UiKitCardResources } from "./UiKitCardResources";

const styles = stylex.create({
  container: {
    height: "100%",
  },
  description: {
    flex: "1",
  },
});

const renderLink = ({ attributes, content }: IntermediateRepresentation) => (
  <Link hasUnderline rel="noreferrer" target="_blank" {...attributes}>
    {content}
  </Link>
);

type UiKitCardProps = {
  uiKit: UiKit;
};

export const UiKitCard = ({ uiKit }: UiKitCardProps) => {
  return (
    <Card key={uiKit.name}>
      <VStack gap={2} xstyle={styles.container}>
        <Heading level={2} weight="normal">
          <Link
            href={uiKit.homepage}
            rel="noreferrer"
            size="lg"
            target="_blank"
            weight="medium"
          >
            {uiKit.name}
          </Link>
        </Heading>
        <UiKitCardImage uiKit={uiKit} />
        <Text as="p" {...stylex.props(styles.description)}>
          <Linkify
            options={{
              defaultProtocol: "https",
              formatHref: {
                mention: (href) => `https://github.com${href}`,
              },
              render: renderLink,
            }}
          >
            {uiKit.description}
          </Linkify>
        </Text>
        <Divider />
        <UiKitCardResources uiKit={uiKit} />
      </VStack>
    </Card>
  );
};
