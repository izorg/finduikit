import { Box } from "@radix-ui/themes/components/box";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { type Metadata } from "next";

import { FrameworkSelect, getFrameworkFromParams } from "../../framework";
import { SearchInput } from "../../search";
import { getUiKits, UiKitGrid } from "../../ui-kit";
import { UnstyledSwitch } from "../UnstyledSwitch";

import styles from "./Page.module.css";

const defaultTitle = "UI Kits";
const description = "Explore UI kits for rapid web development";

export type PageProps = {
  params: Promise<{ framework?: string }>;
  unstyled?: boolean;
};

export const getGenerateMetadata =
  ({ unstyled }: Pick<PageProps, "unstyled">) =>
  async (props: Pick<PageProps, "params">): Promise<Metadata> => {
    const { params } = props;

    const framework = await getFrameworkFromParams(params);

    const title = [
      unstyled && "Unstyled ",
      defaultTitle,
      framework && ` for ${framework}`,
    ];

    return {
      description,
      title: title.filter(Boolean).join(""),
    };
  };

export const Page = async (props: PageProps) => {
  const { params, unstyled } = props;

  const framework = await getFrameworkFromParams(params);

  let uiKits = await getUiKits();

  if (framework) {
    uiKits = uiKits.filter((uiKit) => uiKit.frameworks?.includes(framework));
  }

  if (unstyled) {
    uiKits = uiKits.filter((uiKit) => uiKit.unstyled);
  }

  return (
    <Flex direction="column" gap="4" py="4">
      <Flex asChild direction="column" gap="2" px="4">
        <Text align="center" asChild>
          <header>
            <Text
              asChild
              size={{
                initial: "6",
                sm: "9",
              }}
              weight="medium"
            >
              <h1>
                {unstyled && <>Unstyled </>}
                {defaultTitle}
                {Boolean(framework) && <> for {framework}</>}
              </h1>
            </Text>
            <Text as="p">{description}</Text>
          </header>
        </Text>
      </Flex>
      <Flex asChild direction="column" gap="4">
        <main>
          <Box className={styles.search} p="4" position="sticky" top="0">
            <Flex
              direction={{
                initial: "column",
                xs: "row",
              }}
              gap="4"
              maxWidth="640px"
              mx="auto"
              width="100%"
            >
              <Box asChild flexGrow="1">
                <SearchInput />
              </Box>
              <Flex gap="4">
                <Box asChild flexGrow="1">
                  <FrameworkSelect framework={framework} />
                </Box>
                <Text as="label" size="3" style={{ alignSelf: "center" }}>
                  <Flex gap="2">
                    <UnstyledSwitch size="2" /> Unstyled
                  </Flex>
                </Text>
              </Flex>
            </Flex>
          </Box>
          <UiKitGrid uiKits={uiKits} />
        </main>
      </Flex>
    </Flex>
  );
};
