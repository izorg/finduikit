"use client";

import { spacingVars } from "@astryxdesign/core/theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { useFilteredUiKits } from "../../explore-page/PageView/useFilteredUiKits";
import { type UiKit, useUiKitView } from "../../ui-kit";
import { UiKitView } from "../../ui-kit/UiKitView";
import { SearchToolbar } from "../SearchToolbar";
import { UiKitGrid } from "../UiKitGrid";
import { UiKitTable } from "../UiKitTable";

const styles = stylex.create({
  containerPadding: {
    paddingInline: spacingVars["--spacing-4"],
  },
  searchToolbar: {
    marginBottom: spacingVars["--spacing-4"],
  },
});

type MainProps = {
  uiKits: UiKit[];
};

export const Main = ({ uiKits: uiKitsProp }: MainProps) => {
  const uiKits = useFilteredUiKits(uiKitsProp);

  const { uiKitView } = useUiKitView();

  return (
    <main id="main">
      <SearchToolbar xstyle={[styles.searchToolbar, styles.containerPadding]} />
      {uiKitView === UiKitView.Grid && (
        <UiKitGrid uiKits={uiKits} xstyle={styles.containerPadding} />
      )}
      {uiKitView === UiKitView.Table && <UiKitTable uiKits={uiKits} />}
    </main>
  );
};
