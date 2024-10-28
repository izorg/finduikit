import { Box, Card, Flex, Inset, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

import type { UiKit } from "./getUiKits";

import styles from "./UiKitCard.module.css";

type UiKitCardProps = {
  uiKit: UiKit;
};

export const UiKitCard = (props: UiKitCardProps) => {
  const { uiKit } = props;

  return (
    <Card>
      <Flex direction="column" gap="4" position="relative">
        <Box>
          <Text asChild weight="medium">
            <Link className={styles.link} href={uiKit.homepage} target="_blank">
              {uiKit.name}
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
          <Box>{uiKit.description}</Box>
        </Text>
      </Flex>
    </Card>
  );
};
