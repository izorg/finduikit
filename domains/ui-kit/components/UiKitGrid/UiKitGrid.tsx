import { Box } from "@radix-ui/themes/components/box";
import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";

import type { UiKit } from "../../UiKit";
import { UiKitCard } from "../UiKitCard";
import { UiKitSuggestIconButton } from "../UiKitSuggestIconButton";

import styles from "./UiKitGrid.module.css";

type UiKitGridProps = {
  uiKits: UiKit[];
};

export const UiKitGrid = (props: UiKitGridProps) => {
  const { uiKits } = props;

  if (uiKits.length === 0) {
    return (
      <Flex align="center" asChild justify="center">
        <Box p="4">
          <UiKitSuggestIconButton />
        </Box>
      </Flex>
    );
  }

  return (
    <Box px="4">
      <Grid
        asChild
        className={styles.grid}
        columns="repeat(auto-fill, minmax(240px, 1fr))"
        flexGrow="1"
        gap="4"
      >
        <ul>
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
