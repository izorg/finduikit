import { Box, Flex, Text } from "@radix-ui/themes";
import { type Metadata } from "next";

import { getUiKits } from "./getUiKits";
import { SearchInput } from "./SearchInput";
import { SearchProvider } from "./SearchProvider";
import { UiKits } from "./UiKits";

const title = "Find UI kit";
const description = "Explore UI kits for rapid development";

export const metadata: Metadata = {
  description,
  title,
};

const Page = async () => {
  const uiKits = await getUiKits();

  return (
    <Flex direction="column" gap="4" p="4">
      <Box asChild mx="auto">
        <Text align="center" as="div">
          <Text as="div" size="9">
            {title}
          </Text>
          <Text as="p">{description}</Text>
        </Text>
      </Box>
      <SearchProvider>
        <SearchInput />
        <UiKits uiKits={uiKits} />
      </SearchProvider>
    </Flex>
  );
};

export default Page;
