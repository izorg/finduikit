import {
  mdiCreation,
  mdiMessageOutline,
  mdiRhombusSplit,
  mdiTelescope,
} from "@mdi/js";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { type Metadata } from "next";
import NextLink from "next/link";
import { siFigma, siStorybook } from "simple-icons";

import { Footer } from "../../footer";
import { SvgIcon } from "../../icon";
import { getUiKitFileDataEntriesFromFiles } from "../../ui-kit/server";
import { StatCard } from "../StatCard";
import { SupportButton } from "../SupportButton";

const title = "Find UI Kit";
const description =
  "Discover a curated collection of web UI kits with high-quality components and templates for developers";

export const metadata: Metadata = {
  description,
  title,
};

export const HomePage = () => {
  const uiKitEntries = getUiKitFileDataEntriesFromFiles();

  return (
    <Container size="3">
      <Flex
        align="center"
        direction="column"
        gap={{
          initial: "6",
          sm: "9",
        }}
        minHeight="100dvh"
        p="4"
      >
        <Flex asChild direction="column" gap="2">
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
          align="center"
          asChild
          direction="column"
          gap={{
            initial: "6",
            sm: "9",
          }}
        >
          <main>
            <Flex gap="4" justify="center" wrap="wrap">
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
            <Flex gap="4" justify="center" wrap="wrap">
              <StatCard>
                <StatCard.Icon color="purple" path={mdiRhombusSplit} />
                <StatCard.Label>Total UI kits</StatCard.Label>
                <StatCard.Stat>{uiKitEntries.length}</StatCard.Stat>
              </StatCard>
              <StatCard>
                <StatCard.Icon color="ruby" path={siStorybook.path} />
                <StatCard.Label>Storybooks</StatCard.Label>
                <StatCard.Stat>
                  {uiKitEntries.filter(([, item]) => item.storybook).length}
                </StatCard.Stat>
              </StatCard>
              <StatCard>
                <StatCard.Icon color="crimson" path={siFigma.path} />
                <StatCard.Label>Figma files</StatCard.Label>
                <StatCard.Stat>
                  {uiKitEntries.filter(([, item]) => item.figma).length}
                </StatCard.Stat>
              </StatCard>
              <StatCard>
                <StatCard.Icon color="crimson" path={mdiCreation} />
                <StatCard.Label>Build with AI</StatCard.Label>
                <StatCard.Stat>
                  {uiKitEntries.filter(([, item]) => item.ai).length}
                </StatCard.Stat>
              </StatCard>
            </Flex>
            <section>
              <Heading mb="2" weight="medium">
                Choose Tech with UI Kits
              </Heading>
              <Text>
                Knowing UI kits helps teams pick the best tools for business. It
                keeps designs consistent, and improves teamwork between
                designers and developers.
              </Text>
            </section>
            <section>
              <Heading mb="2" weight="medium">
                Speed Up Development
              </Heading>
              <Text>
                Selecting the right UI kit accelerates development by providing
                ready-made components, reducing repetitive work, and allowing
                teams to focus on building unique features.
              </Text>
            </section>
          </main>
        </Flex>
        <Footer mt="auto" />
      </Flex>
    </Container>
  );
};
