import "linkify-plugin-mention";

import {
  Box,
  Card,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";
import Linkify from "linkify-react";
import type { IntermediateRepresentation } from "linkifyjs";

import { Resources } from "../../resource";
import type { UiKit } from "../../ui-kit";
import { UiKitFrameworkList } from "../UiKitFrameworkList";
import { UiKitStats } from "../UiKitStats";

import { UiKitCardImage } from "./UiKitCardImage";

import styles from "./UiKitCard.module.css";

const renderLink = ({ attributes, content }: IntermediateRepresentation) => (
  <Link
    color="gray"
    highContrast
    rel="noreferrer"
    target="_blank"
    {...attributes}
  >
    {content}
  </Link>
);

type UiKitCardProps = {
  uiKit: UiKit;
};

export const UiKitCard = (props: UiKitCardProps) => {
  const { uiKit } = props;

  return (
    <Card className={styles.card}>
      <Flex direction="column" gap="4" height="100%">
        <Flex align="center" gap="3">
          <Heading as="h2" size={{ initial: "5", sm: "4" }} weight="medium">
            <Link asChild color="gray" highContrast underline="hover">
              <a href={uiKit.homepage} rel="noreferrer" target="_blank">
                {uiKit.name}
              </a>
            </Link>
          </Heading>
          <UiKitFrameworkList frameworks={uiKit.frameworks} />
        </Flex>
        <UiKitCardImage uiKit={uiKit} />
        <Box asChild flexGrow="1">
          <Text as="p" size="2">
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
        </Box>
        <UiKitStats uiKit={uiKit} />
        <Separator size="4" />
        <Resources uiKit={uiKit} />
      </Flex>
    </Card>
  );
};
