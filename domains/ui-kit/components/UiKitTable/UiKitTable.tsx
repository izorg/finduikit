import { mdiCheck } from "@mdi/js";
import { Link } from "@radix-ui/themes/components/link";
import * as Table from "@radix-ui/themes/components/table";
import { Text } from "@radix-ui/themes/components/text";
import { siFigma, siStorybook } from "simple-icons";

import { SvgIcon } from "../../../icon";
import type { UiKit } from "../../UiKit";

import { UiKitTableFrameworkList } from "./UiKitTableFrameworkList";

import styles from "./UiKitTable.module.css";

type UiKitTableProps = {
  uiKits: UiKit[];
};

export const UiKitTable = (props: UiKitTableProps) => {
  const { uiKits } = props;

  return (
    <div className="rt-TableRoot rt-r-size-3 rt-variant-ghost">
      <table className="rt-TableRootTable">
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
      </table>
    </div>
  );
};
