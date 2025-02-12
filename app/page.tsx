import { Box, Flex, Text } from "@radix-ui/themes";
import { type Metadata } from "next";

import { UiKits } from "../components/UiKits";

import { getUiKits } from "./getUiKits";
import { SearchInput } from "./SearchInput";
import { SearchProvider } from "./SearchProvider";

const title = "Find UI kit";
const description = "Explore UI kits for rapid web development";

export const metadata: Metadata = {
  description,
  title,
};

const Page = async () => {
  const uiKits = await getUiKits();

  return (
    <SearchProvider>
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
            <Box asChild maxWidth="400px" mx="auto" width="100%">
              <SearchInput />
            </Box>
            <UiKits uiKits={uiKits} />
          </main>
        </Flex>
      </Flex>
    </SearchProvider>
  );
};

export default Page;
