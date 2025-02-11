import {
  Box,
  Card,
  Flex,
  Inset,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import NextLink from "next/link";

import { type UiKit } from "../../app/getUiKits.ts";
import { FrameworkList } from "../FrameworkList";
import { Resources } from "../Resources";

import styles from "./UiKitCard.module.css";

type UiKitCardProps = {
  uiKit: UiKit;
};

export const UiKitCard = (props: UiKitCardProps) => {
  const { uiKit } = props;

  return (
    <Card>
      <Flex direction="column" gap="4" height="100%">
        <Box>
          <Text asChild weight="medium">
            <Link asChild color="gray" highContrast underline="hover">
              <NextLink href={uiKit.homepage} target="_blank">
                {uiKit.name}
              </NextLink>
            </Link>
          </Text>
        </Box>
        {uiKit.image && (
          <Inset asChild side="x">
            <Box className={styles.imageContainer} position="relative">
              <Image alt="" className={styles.image} fill src={uiKit.image} />
            </Box>
          </Inset>
        )}
        <Text asChild size="2">
          <Box flexGrow="1">{uiKit.description}</Box>
        </Text>
        <Separator size="4" />
        <Resources uiKit={uiKit} />
        {uiKit.frameworks && uiKit.frameworks.length > 0 && (
          <>
            <Separator size="4" />
            <FrameworkList frameworks={uiKit.frameworks} />
          </>
        )}
      </Flex>
    </Card>
  );
};
