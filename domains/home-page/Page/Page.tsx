import { mdiRhombusSplit, mdiTelescope } from "@mdi/js";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { type Metadata } from "next";
import NextLink from "next/link";
import { siFigma, siStorybook } from "simple-icons";

import { Footer } from "../../footer";
import { SvgIcon } from "../../icon";
import { getUiKits } from "../../ui-kit/server";
import { HomePageStatCard } from "../HomePageStatCard";

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
    <Flex align="center" direction="column" gap="6" minHeight="100dvh" py="4">
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
      <Flex
        gap={{ initial: "4", md: "8", sm: "6" }}
        justify="center"
        px="4"
        wrap="wrap"
      >
        <HomePageStatCard>
          <HomePageStatCard.Icon color="purple" path={mdiRhombusSplit} />
          <HomePageStatCard.Label>Total UI kits</HomePageStatCard.Label>
          <HomePageStatCard.Stat>{uiKitSet.size}</HomePageStatCard.Stat>
        </HomePageStatCard>
        <HomePageStatCard>
          <HomePageStatCard.Icon color="ruby" path={siStorybook.path} />
          <HomePageStatCard.Label>Storybooks</HomePageStatCard.Label>
          <HomePageStatCard.Stat>
            {[...uiKitSet].filter((item) => item.storybook).length}
          </HomePageStatCard.Stat>
        </HomePageStatCard>
        <HomePageStatCard>
          <HomePageStatCard.Icon color="crimson" path={siFigma.path} />
          <HomePageStatCard.Label>Figma files</HomePageStatCard.Label>
          <HomePageStatCard.Stat>
            {[...uiKitSet].filter((item) => item.figma).length}
          </HomePageStatCard.Stat>
        </HomePageStatCard>
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
      <Footer mt="auto" />
    </Flex>
  );
};
