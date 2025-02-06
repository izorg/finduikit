import { Box, Card, Flex, Inset, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

import { type UiKit } from "../../app/getUiKits.ts";
import { FrameworkList } from "../FrameworkList/FrameworkList.tsx";

import styles from "./UiKitCard.module.css";

type UiKitCardProps = {
  uiKit: UiKit;
};

export const UiKitCard = (props: UiKitCardProps) => {
  const { uiKit } = props;

  return (
    <Box asChild position="relative">
      <Card>
        <Flex direction="column" gap="4" height="100%">
          <Box>
            <Text asChild weight="medium">
              <Link
                className={styles.link}
                href={uiKit.homepage}
                target="_blank"
              >
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
            <Box flexGrow="1">{uiKit.description}</Box>
          </Text>
          {uiKit.frameworks && uiKit.frameworks.length > 0 && (
            <>
              <Separator size="4" />
              <FrameworkList frameworks={uiKit.frameworks} />
            </>
          )}
        </Flex>
      </Card>
    </Box>
  );
};
