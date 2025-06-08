import { mdiTelescope } from "@mdi/js";
import { Button, Flex, Text } from "@radix-ui/themes";
import { type Metadata } from "next";
import NextLink from "next/link";

import { Footer } from "../../footer";
import { SvgIcon } from "../../icon";
import { getUiKits } from "../../ui-kit/server";

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
      <Flex asChild direction="column" gap="2" px="4">
        <Text align="center" asChild>
          <header>
            <Text
              asChild
              size={{
                initial: "8",
                sm: "9",
              }}
              weight="medium"
            >
              <h1>{title}</h1>
            </Text>
            <Text as="p">{description}</Text>
          </header>
        </Text>
      </Flex>
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
          <NextLink href="/explore">
            <SvgIcon path={mdiTelescope} />
            Explore
          </NextLink>
        </Button>
      </Flex>
      <Footer />
    </Flex>
  );
};
