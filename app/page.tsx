import { Box } from "@radix-ui/themes/components/box";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { type Metadata } from "next";

import { FrameworkSelect, getFrameworkFromParams } from "../domains/framework";
import { SearchInput } from "../domains/search";
import { getUiKits, UiKitGrid } from "../domains/ui-kit";

const title = "UI Kits";
const description = "Explore UI kits for rapid web development";

type PageProps = {
  params: Promise<{ framework?: string }>;
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const { params } = props;

  const framework = await getFrameworkFromParams(params);

  return {
    description,
    title: framework ? `${title} for ${framework}` : title,
  };
};

const Page = async (props: PageProps) => {
  const { params } = props;

  const framework = await getFrameworkFromParams(params);

  let uiKits = await getUiKits();

  if (framework) {
    uiKits = uiKits.filter((uiKit) => uiKit.frameworks?.includes(framework));
  }

  return (
    <Flex direction="column" gap="8" p="4">
      <Flex asChild direction="column" gap="2">
        <Text align="center" asChild>
          <header>
            <Text asChild size="9" weight="medium">
              <h1>{framework ? `${title} for ${framework}` : title}</h1>
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
            <FrameworkSelect framework={framework} />
          </Flex>
          <UiKitGrid uiKits={uiKits} />
        </main>
      </Flex>
    </Flex>
  );
};

export default Page;
