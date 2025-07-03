import { mdiCheck } from "@mdi/js";
import { Flex, Link, Table, Text } from "@radix-ui/themes";
import classNames from "classnames";
import type { Ref } from "react";
import { siFigma, siStorybook } from "simple-icons";

import { SvgIcon } from "../../../icon";
import type { UiKit } from "../../UiKit";

import { UiKitTableFrameworkList } from "./UiKitTableFrameworkList";

import styles from "./UiKitTable.module.css";

type UiKitTableProps = {
  ref: Ref<HTMLDivElement>;
  uiKits: UiKit[];
};

export const UiKitTable = (props: UiKitTableProps) => {
  const { uiKits, ...rest } = props;

  return (
    <Flex
      className={classNames(
        "rt-TableRoot rt-r-size-2 rt-variant-ghost",
        styles.root,
      )}
      flexGrow="1"
      overflow="auto"
      {...rest}
    >
      <table className="rt-TableRootTable">
        <colgroup>
          <col className={styles.nameColumn} />
          <col className={styles.frameworkColumn} />
          <col className={styles.styledColumn} />
          <col className={styles.figmaColumn} />
          <col className={styles.storybookColumn} />
          <col className={styles.aiColumn} />
        </colgroup>
        <Table.Header className={styles.tableHead}>
          <Table.Row>
            <Table.ColumnHeaderCell className={styles.leftCell}>
              Name
            </Table.ColumnHeaderCell>
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
            <Table.ColumnHeaderCell
              className={styles.rightCell}
              justify="center"
            >
              AI
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {uiKits.map((uiKit) => (
            <Table.Row key={uiKit.name}>
              <Table.RowHeaderCell className={styles.leftCell}>
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
              <Table.Cell className={styles.rightCell} justify="center">
                {uiKit.ai && (
                  <Link asChild color="gray" highContrast>
                    <a href={uiKit.ai.url} rel="noreferrer" target="_blank">
                      {uiKit.ai.type}
                    </a>
                  </Link>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </table>
    </Flex>
  );
};
