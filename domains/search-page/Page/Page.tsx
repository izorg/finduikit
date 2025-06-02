import { Flex } from "@radix-ui/themes/components/flex";
import { type Metadata } from "next";

import { Footer } from "../../footer";
import { getUiKits } from "../../ui-kit";

import { PageMain } from "./PageMain";

const title = "UI Kits";
const description =
  "Discover a curated collection of web UI kits with high-quality components and templates for developers";

export const metadata: Metadata = {
  description,
  title,
};

const uiKitsResource = getUiKits();

export const Page = async () => {
  const uiKitSet = await uiKitsResource;

  const uiKits = [...uiKitSet];

  return (
    <Flex direction="column" gap="6" minHeight="100dvh" pb="4">
      <PageMain uiKits={uiKits} />
      <Footer />
    </Flex>
  );
};
