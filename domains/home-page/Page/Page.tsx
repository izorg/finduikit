import { mdiRhombusSplit, mdiTelescope } from "@mdi/js";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { type Metadata } from "next";
import NextLink from "next/link";
import { siFigma, siStorybook } from "simple-icons";

import { Footer } from "../../footer";
import { SvgIcon } from "../../icon";
import { getUiKits } from "../../ui-kit/server";

import styles from "./Page.module.css";

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
      <Flex gap="4" justify="center" px="4" wrap="wrap">
        <Card className={styles.card} size="2">
          <Text asChild color="purple">
            <SvgIcon
              className={styles.cardIllustration}
              path={mdiRhombusSplit}
            />
          </Text>
          <Text as="div" color="gray" size="2">
            Total UI kits
          </Text>
          <Text as="div" size="7" weight="medium">
            {uiKitSet.size.toLocaleString()}
          </Text>
        </Card>
        <Card className={styles.card} size="2">
          <Text asChild color="ruby">
            <SvgIcon
              className={styles.cardIllustration}
              path={siStorybook.path}
            />
          </Text>
          <Text as="div" color="gray" size="2">
            Storybooks
          </Text>
          <Text as="div" size="7" weight="medium">
            {[...uiKitSet]
              .filter((item) => item.storybook)
              .length.toLocaleString()}
          </Text>
        </Card>
        <Card className={styles.card} size="2">
          <Text asChild color="crimson">
            <SvgIcon className={styles.cardIllustration} path={siFigma.path} />
          </Text>
          <Text as="div" color="gray" size="2">
            Figma files
          </Text>
          <Text as="div" size="7" weight="medium">
            {[...uiKitSet].filter((item) => item.figma).length.toLocaleString()}
          </Text>
        </Card>
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
