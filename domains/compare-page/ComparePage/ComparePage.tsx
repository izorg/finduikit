import { Container } from "@radix-ui/themes/components/container";
import { Flex } from "@radix-ui/themes/components/flex";
import type { Metadata } from "next";

import { Footer } from "../../footer";
import { getUiKits, UiKitTable } from "../../ui-kit";

const title = "UI Kits Comparison Table";

export const metadata: Metadata = {
  description:
    "Compare various UI Kits based on their frameworks, Figma, and Storybook availability.",
  title,
};

const nameCompare = new Intl.Collator("en").compare;

const uiKitsResource = getUiKits();

export const ComparePage = async () => {
  const uiKitSet = await uiKitsResource;
  const uiKits = [...uiKitSet];

  const sortedUiKits = uiKits.toSorted((a, b) => nameCompare(a.name, b.name));

  return (
    <Flex direction="column" gap="4" pb="4">
      <Container size="2">
        <UiKitTable uiKits={sortedUiKits} />
      </Container>

      <Footer />
    </Flex>
  );
};
