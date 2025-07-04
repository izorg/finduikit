import {
  mdiCreation,
  mdiMessageOutline,
  mdiRhombusSplit,
  mdiTelescope,
} from "@mdi/js";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { type Metadata } from "next";
import NextLink from "next/link";
import { siFigma, siStorybook } from "simple-icons";

import { Footer } from "../../footer";
import { SvgIcon } from "../../icon";
import { getUiKits } from "../../ui-kit/server";
import { StatCard } from "../StatCard";
import { SupportButton } from "../SupportButton";

const title = "UI Kits";
const description =
  "Discover a curated collection of web UI kits with high-quality components and templates for developers";

export const metadata: Metadata = {
  description,
  title,
};

export const HomePage = async () => {
  const uiKitSet = await getUiKits();

  return (
    <Flex
      align="center"
      direction="column"
      gap={{
        initial: "6",
        sm: "9",
      }}
      minHeight="100dvh"
      py="4"
    >
      <Flex asChild direction="column" gap="2" px="4">
        <Text align="center" asChild>
          <header>
            <Heading
              as="h1"
              size={{
                initial: "8",
                sm: "9",
              }}
              weight="medium"
            >
              {title}
            </Heading>
            <Text as="p" size="4">
              {description}
            </Text>
          </header>
        </Text>
      </Flex>
      <Flex gap="4" justify="center" px="4" wrap="wrap">
        <Button asChild size="4">
          <NextLink href="/explore">
            <SvgIcon aria-hidden path={mdiTelescope} />
            Explore
          </NextLink>
        </Button>
        <SupportButton size="4" variant="soft">
          <SvgIcon aria-hidden path={mdiMessageOutline} />
          Support
        </SupportButton>
      </Flex>
      <Flex
        gap={{ initial: "4", md: "8", sm: "6" }}
        justify="center"
        px="4"
        wrap="wrap"
      >
        <StatCard>
          <StatCard.Icon color="purple" path={mdiRhombusSplit} />
          <StatCard.Label>Total UI kits</StatCard.Label>
          <StatCard.Stat>{uiKitSet.size}</StatCard.Stat>
        </StatCard>
        <StatCard>
          <StatCard.Icon color="ruby" path={siStorybook.path} />
          <StatCard.Label>Storybooks</StatCard.Label>
          <StatCard.Stat>
            {[...uiKitSet].filter((item) => item.storybook).length}
          </StatCard.Stat>
        </StatCard>
        <StatCard>
          <StatCard.Icon color="crimson" path={siFigma.path} />
          <StatCard.Label>Figma files</StatCard.Label>
          <StatCard.Stat>
            {[...uiKitSet].filter((item) => item.figma).length}
          </StatCard.Stat>
        </StatCard>
        <StatCard>
          <StatCard.Icon color="crimson" path={mdiCreation} />
          <StatCard.Label>Build with AI</StatCard.Label>
          <StatCard.Stat>
            {[...uiKitSet].filter((item) => item.ai).length}
          </StatCard.Stat>
        </StatCard>
      </Flex>
      <Footer mt="auto" />
    </Flex>
  );
};
