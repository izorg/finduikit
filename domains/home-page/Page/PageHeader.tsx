import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";

type PageHeaderProps = {
  description: string;
  title: string;
};

export const PageHeader = (props: PageHeaderProps) => {
  const { description, title } = props;

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
            <h1>{title}</h1>
          </Text>
          <Text as="p">{description}</Text>
        </header>
      </Text>
    </Flex>
  );
};
