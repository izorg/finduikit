import { Box } from "@radix-ui/themes/components/box";
import { Container } from "@radix-ui/themes/components/container";
import { Flex } from "@radix-ui/themes/components/flex";
import { Link } from "@radix-ui/themes/components/link";
import * as Table from "@radix-ui/themes/components/table";
import { Text } from "@radix-ui/themes/components/text";
import type { Metadata } from "next";
import { siFigma, siStorybook } from "simple-icons";

import { Footer } from "../../footer";
import { SvgIcon } from "../../icon";
import { getUiKits } from "../../ui-kit";
import { ComparePageFrameworkList } from "../ComparePageFrameworkList";

const title = "UI Kit Compare Table";

export const metadata: Metadata = {
  description:
    "Compare various UI Kits based on their frameworks, Figma, and Storybook availability.",
  title,
};

const nameCompare = new Intl.Collator("en").compare;

const uiKitsResource = getUiKits();

export const ComparePage = async () => {
  const uiKitSet = await uiKitsResource;
  const uiKits = [...uiKitSet];

  const sortedUiKits = uiKits.toSorted((a, b) => nameCompare(a.name, b.name));

  return (
    <Flex direction="column" gap="4" py="4">
      <Box asChild px="4">
        <header>
          <Text
            align="center"
            asChild
            size={{
              initial: "6",
              sm: "9",
            }}
            weight="medium"
          >
            <h1>{title}</h1>
          </Text>
        </header>
      </Box>

      <Container size="2">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="center">
                Framework
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="center">
                Figma
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="center">
                Storybook
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {sortedUiKits.map((uiKit) => (
              <Table.Row key={uiKit.name}>
                <Table.RowHeaderCell>
                  <Link asChild color="gray" highContrast>
                    <a href={uiKit.homepage} rel="noreferrer" target="_blank">
                      {uiKit.name}
                    </a>
                  </Link>
                </Table.RowHeaderCell>
                <Table.Cell justify="center">
                  <ComparePageFrameworkList frameworks={uiKit.frameworks} />
                </Table.Cell>
                <Table.Cell justify="center">
                  {uiKit.figma && (
                    <Text asChild color="crimson">
                      <a
                        aria-label="Figma"
                        href={uiKit.figma}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <SvgIcon path={siFigma.path} />
                      </a>
                    </Text>
                  )}
                </Table.Cell>
                <Table.Cell justify="center">
                  {uiKit.storybook && (
                    <Text asChild color="ruby">
                      <a
                        aria-label="Storybook"
                        href={uiKit.storybook}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <SvgIcon path={siStorybook.path} />
                      </a>
                    </Text>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>

      <Footer />
    </Flex>
  );
};
