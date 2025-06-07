import { mdiCheck } from "@mdi/js";
import { Flex, Link, Table, Text } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import { siFigma, siStorybook } from "simple-icons";

import { SvgIcon } from "../../../icon";
import type { UiKit } from "../../UiKit";

import { UiKitTableFrameworkList } from "./UiKitTableFrameworkList";

import styles from "./UiKitTable.module.css";

type UiKitTableProps = {
  uiKits: UiKit[];
} & ComponentProps<"div">;

export const UiKitTable = (props: UiKitTableProps) => {
  const { uiKits, ...rest } = props;

  return (
    <Flex asChild flexGrow="1" overflow="auto">
      <Table.Root {...rest}>
        <Table.Header className={styles.tableHead}>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify="center">
              Framework
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify="center">
              Styled
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
          {uiKits.map((uiKit) => (
            <Table.Row key={uiKit.name}>
              <Table.RowHeaderCell>
                <Link asChild color="gray" highContrast>
                  <a href={uiKit.homepage} rel="noreferrer" target="_blank">
                    {uiKit.name}
                  </a>
                </Link>
              </Table.RowHeaderCell>
              <Table.Cell justify="center">
                <UiKitTableFrameworkList frameworks={uiKit.frameworks} />
              </Table.Cell>
              <Table.Cell justify="center">
                {!uiKit.unstyled && (
                  <Text color="jade">
                    <SvgIcon path={mdiCheck} />
                  </Text>
                )}
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
    </Flex>
  );
};
