import { mdiCheck } from "@mdi/js";
import { Flex, IconButton, Link, Table, Text, Tooltip } from "@radix-ui/themes";
import classNames from "classnames";
import type { Ref } from "react";
import { siGithub } from "simple-icons";

import { SvgIcon } from "../../icon";
import type { UiKit } from "../../ui-kit";

import { AiLinks } from "./AiLinks";
import { FigmaLink } from "./FigmaLink";
import { StorybookLink } from "./StorybookLink";
import { StylingLink } from "./StylingLink";
import { UiKitTableFrameworkList } from "./UiKitTableFrameworkList";
import { WebComponentsLink } from "./WebComponentsLink";

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
        "rt-TableRoot rt-r-size-2 rt-variant-ghost md:rt-r-size-3",
        styles.root,
      )}
      flexGrow="1"
      overflow="auto"
      {...rest}
    >
      <table className={classNames(styles.table, "rt-TableRootTable")}>
        <colgroup>
          <col className={styles.nameColumn} />
          <col className={styles.frameworkColumn} />
          <col className={styles.styledColumn} />
          <col className={styles.figmaColumn} />
          <col className={styles.storybookColumn} />
          <col className={styles.stylingColumn} />
          <col className={styles.aiColumn} />
          <col className={styles.webComponents} />
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
            <Table.ColumnHeaderCell justify="center">
              Styling
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify="center">AI</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell
              className={styles.rightCell}
              justify="center"
            >
              Web Components
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {uiKits.map((uiKit) => (
            <Table.Row key={uiKit.name}>
              <Table.RowHeaderCell className={styles.leftCell}>
                <Flex align="center" display="inline-flex" gap="2">
                  <Link asChild color="gray" highContrast wrap="nowrap">
                    <a href={uiKit.homepage} rel="noreferrer" target="_blank">
                      {uiKit.name}
                    </a>
                  </Link>
                  <Tooltip content="GitHub">
                    <IconButton
                      asChild
                      color="gray"
                      highContrast
                      variant="ghost"
                    >
                      <a
                        href={uiKit.repository}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <SvgIcon path={siGithub.path} />
                      </a>
                    </IconButton>
                  </Tooltip>
                </Flex>
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
                {uiKit.figma && <FigmaLink figma={uiKit.figma} />}
              </Table.Cell>
              <Table.Cell justify="center">
                {uiKit.storybook && (
                  <StorybookLink storybook={uiKit.storybook} />
                )}
              </Table.Cell>
              <Table.Cell justify="center">
                {uiKit.styling && <StylingLink styling={uiKit.styling} />}
              </Table.Cell>
              <Table.Cell justify="center">
                {uiKit.ai && <AiLinks ai={uiKit.ai} />}
              </Table.Cell>
              <Table.Cell className={styles.rightCell} justify="center">
                {uiKit.webComponents && (
                  <WebComponentsLink webComponents={uiKit.webComponents} />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </table>
    </Flex>
  );
};
