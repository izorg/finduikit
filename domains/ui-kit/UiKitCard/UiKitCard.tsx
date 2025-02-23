import {
  Box,
  Card,
  Flex,
  Heading,
  Inset,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import NextLink from "next/link";

import { FrameworkList } from "../../../components/FrameworkList";
import { Resources } from "../../../components/Resources";
import type { UiKit } from "../getUiKits";

import styles from "./UiKitCard.module.css";

type UiKitCardProps = {
  uiKit: UiKit;
};

export const UiKitCard = (props: UiKitCardProps) => {
  const { uiKit } = props;

  return (
    <Box asChild height="100%">
      <Card>
        <Flex direction="column" gap="4" height="100%">
          <Flex align="center" gap="3">
            <Heading as="h2" size={{ initial: "5", sm: "4" }} weight="medium">
              <Link asChild color="gray" highContrast underline="hover">
                <NextLink href={uiKit.homepage} target="_blank">
                  {uiKit.name}
                </NextLink>
              </Link>
            </Heading>
            <FrameworkList frameworks={uiKit.frameworks} />
          </Flex>
          {uiKit.image && (
            <Inset asChild side="x">
              <Box
                asChild
                className={styles.imageContainer}
                position="relative"
              >
                <NextLink href={uiKit.homepage} target="_blank">
                  <Image
                    alt=""
                    className={styles.image}
                    fill
                    src={uiKit.image}
                  />
                </NextLink>
              </Box>
            </Inset>
          )}
          <Text asChild size="2">
            <Box flexGrow="1">{uiKit.description}</Box>
          </Text>
          <Separator size="4" />
          <Resources uiKit={uiKit} />
        </Flex>
      </Card>
    </Box>
  );
};
