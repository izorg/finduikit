import { Flex } from "@radix-ui/themes";
import { type Metadata } from "next";
import { Suspense } from "react";

import {
  getUiKitFileDataEntriesFromFiles,
  getUiKits,
} from "../../ui-kit/server";
import { PageTopBar } from "../PageTopBar";
import { PageView } from "../PageView";

const title = "Explore UI Kits";

export const generateMetadata = (): Metadata => {
  const uiKitEntries = getUiKitFileDataEntriesFromFiles();
  const uiKitsCount = uiKitEntries.length;

  return {
    alternates: {
      canonical: "/explore",
    },
    description: `Explore ${uiKitsCount.toString()} open‑source UI kits & design systems. Search, filter by framework (React, Vue, Angular, Svelte, Solid), sort by stars or updates in grid or table view.`,
    title,
  };
};

export const Page = async () => {
  const uiKitSet = await getUiKits();

  const uiKits = [...uiKitSet];

  return (
    <Flex asChild direction="column" height="100dvh">
      <main>
        <Suspense>
          <PageTopBar />
          <PageView uiKits={uiKits} />
        </Suspense>
      </main>
    </Flex>
  );
};
