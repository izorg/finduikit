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

import { Resources } from "../../../resource";
import type { UiKit } from "../../UiKit";
import { UiKitFrameworkList } from "../UiKitFrameworkList";
import { UiKitStats } from "../UiKitStats";

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
              <a href={uiKit.homepage} rel="noreferrer" target="_blank">
                {uiKit.name}
              </a>
            </Link>
          </Heading>
          <UiKitFrameworkList frameworks={uiKit.frameworks} />
        </Flex>
        {uiKit.image && (
          <Inset asChild side="x">
            <Box
              asChild
              className={styles.imageContainer}
              display={{
                initial: "none",
                xs: "block",
              }}
              position="relative"
            >
              <a
                aria-label={uiKit.name}
                href={uiKit.homepage}
                rel="noreferrer"
                target="_blank"
              >
                <Image alt="" className={styles.image} fill src={uiKit.image} />
              </a>
            </Box>
          </Inset>
        )}
        <Box asChild flexGrow="1">
          <Text size="2">{uiKit.description}</Text>
        </Box>
        <UiKitStats uiKit={uiKit} />
        <Separator size="4" />
        <Resources uiKit={uiKit} />
      </Flex>
    </Card>
  );
};
