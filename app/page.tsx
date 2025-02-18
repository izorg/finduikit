import { Box, Flex, Text } from "@radix-ui/themes";
import { type Metadata } from "next";

import { frameworkParam, FrameworkSelect } from "../components/FrameworkSelect";
import { UiKits } from "../components/UiKits";

import { getUiKits } from "./getUiKits";
import { SearchInput } from "./SearchInput";
import { uiKitFrameworkSchema } from "./uiKitSchema.ts";

const title = "Find UI kit";
const description = "Explore UI kits for rapid web development";

export const metadata: Metadata = {
  description,
  title,
};

type PageProps = {
  params?: Promise<{ framework: string }>;
};

const getFrameworkFromParams = async (params: PageProps["params"]) => {
  if (!params) {
    return;
  }

  const { framework } = await params;

  return uiKitFrameworkSchema.options.find(
    (option) => frameworkParam[option] === framework,
  );
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
              <h1>{title}</h1>
            </Text>
            <Text as="p">{description}</Text>
          </header>
        </Text>
      </Flex>
      <Flex asChild direction="column" gap="4">
        <main>
          <Flex gap="2" maxWidth="400px" mx="auto" width="100%">
            <Box asChild flexGrow="1">
              <SearchInput />
            </Box>
            <FrameworkSelect framework={framework} />
          </Flex>
          <UiKits uiKits={uiKits} />
        </main>
      </Flex>
    </Flex>
  );
};

export default Page;
