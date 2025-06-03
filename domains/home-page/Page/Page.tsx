import { mdiMagnify, mdiTableLarge } from "@mdi/js";
import { Button } from "@radix-ui/themes/components/button";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { type Metadata } from "next";
import NextLink from "next/link";

import { Footer } from "../../footer";
import { SvgIcon } from "../../icon";
import { getUiKits } from "../../ui-kit";

import { PageHeader } from "./PageHeader";

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

  return (
    <Flex direction="column" gap="6" minHeight="100dvh" py="4">
      <PageHeader description={description} title={title} />
      <Flex align="center" asChild direction="column">
        <Text as="p">
          <Text size="8">{uiKitSet.size}</Text>
          <Text>kits</Text>
        </Text>
      </Flex>
      <Flex
        align="center"
        direction={{
          initial: "column",
          sm: "row",
        }}
        gap="4"
        justify="center"
      >
        <Button asChild size="3">
          <NextLink href="/search">
            <SvgIcon path={mdiMagnify} />
            Search
          </NextLink>
        </Button>
        <Button asChild size="3">
          <NextLink href="/compare">
            <SvgIcon path={mdiTableLarge} />
            Compare
          </NextLink>
        </Button>
      </Flex>
      <Footer />
    </Flex>
  );
};
