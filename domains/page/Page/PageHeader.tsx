import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";

import type { Framework } from "../../framework";

type PageHeaderProps = {
  defaultTitle: string;
  description: string;
  framework?: Framework;
  unstyled: boolean;
};

export const PageHeader = (props: PageHeaderProps) => {
  const { defaultTitle, description, framework, unstyled } = props;

  return (
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
  );
};
