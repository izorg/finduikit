import { Box, Flex, Grid } from "@radix-ui/themes";
import type { ComponentProps } from "react";

import type { UiKit } from "../../UiKit";
import { UiKitCard } from "../UiKitCard";
import { UiKitSuggestIconButton } from "../UiKitSuggestIconButton";

import styles from "./UiKitGrid.module.css";

type UiKitGridProps = {
  uiKits: UiKit[];
} & ComponentProps<"div">;

export const UiKitGrid = (props: UiKitGridProps) => {
  const { uiKits, ...rest } = props;

  return (
    <Box flexGrow="1" overflowY="auto" p="4" {...rest}>
      <Grid asChild columns="repeat(auto-fill, minmax(240px, 1fr))" gap="4">
        <ul className={styles.grid}>
          {uiKits.map((item) => (
            <li key={item.name}>
              <UiKitCard uiKit={item} />
            </li>
          ))}
          <Flex align="center" asChild justify="center">
            <Box asChild minHeight={{ initial: "240px", xs: "320px" }} p="4">
              <li>
                <UiKitSuggestIconButton />
              </li>
            </Box>
          </Flex>
        </ul>
      </Grid>
    </Box>
  );
};
