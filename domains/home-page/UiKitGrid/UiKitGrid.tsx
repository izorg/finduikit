import { Grid } from "@astryxdesign/core";
import type { StyleXStyles } from "@stylexjs/stylex";

import type { UiKit } from "../../ui-kit";
import { UiKitCard } from "../UiKitCard";

type UiKitGridProps = {
  uiKits: UiKit[];
  xstyle?: StyleXStyles;
};

export const UiKitGrid = ({ uiKits, ...rest }: UiKitGridProps) => (
  <Grid columns={{ minWidth: 280 }} gap={4} {...rest}>
    {uiKits.map((uiKit) => (
      <UiKitCard key={uiKit.name} uiKit={uiKit} />
    ))}
  </Grid>
);
