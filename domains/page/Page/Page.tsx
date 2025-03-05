import { Box } from "@radix-ui/themes/components/box";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { type Metadata } from "next";

import { FrameworkSelect, getFrameworkFromParams } from "../../framework";
import { SearchInput } from "../../search";
import { getUiKits, UiKitGrid } from "../../ui-kit";
import { UnstyledSwitch } from "../UnstyledSwitch";

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

    let title = defaultTitle;

    const framework = await getFrameworkFromParams(params);

    if (framework) {
      title = `${title} for ${framework}`;
    }

    if (unstyled) {
      title = `Unstyled ${title}`;
    }

    return {
      description,
      title,
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

  let title = defaultTitle;

  if (framework) {
    title = `${title} for ${framework}`;
  }

  if (unstyled) {
    title = `Unstyled ${title}`;
  }

  return (
    <Flex direction="column" gap="8" p="4">
      <Flex asChild direction="column" gap="2">
        <Text align="center" asChild>
          <header>
            <Text asChild size="9" weight="medium">
              <h1>{title}</h1>
            </Text>
            <Text as="p">{description}</Text>
          </header>
        </Text>
      </Flex>
      <Flex asChild direction="column" gap="4">
        <main>
          <Flex
            direction={{
              initial: "column",
              xs: "row",
            }}
            gap="2"
            maxWidth="520px"
            mx="auto"
            width="100%"
          >
            <Box asChild flexGrow="1">
              <SearchInput />
            </Box>
            <Flex gap="2">
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
          <UiKitGrid uiKits={uiKits} />
        </main>
      </Flex>
    </Flex>
  );
};
