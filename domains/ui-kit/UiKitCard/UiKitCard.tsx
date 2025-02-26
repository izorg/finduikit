import { Box } from "@radix-ui/themes/components/box";
import { Card } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Inset } from "@radix-ui/themes/components/inset";
import { Link } from "@radix-ui/themes/components/link";
import { Separator } from "@radix-ui/themes/components/separator";
import { Text } from "@radix-ui/themes/components/text";
import Image from "next/image";

import { FrameworkList } from "../../framework";
import { Resources } from "../../resource";
import type { UiKit } from "../getUiKits";

import styles from "./UiKitCard.module.css";

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
              <a href={uiKit.homepage} target="_blank">
                {uiKit.name}
              </a>
            </Link>
          </Heading>
          <FrameworkList frameworks={uiKit.frameworks} />
        </Flex>
        {uiKit.image && (
          <Inset asChild side="x">
            <Box asChild className={styles.imageContainer} position="relative">
              <a href={uiKit.homepage} target="_blank">
                <Image alt="" className={styles.image} fill src={uiKit.image} />
              </a>
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
  );
};
