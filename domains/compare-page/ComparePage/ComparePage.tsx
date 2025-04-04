import { Flex } from "@radix-ui/themes/components/flex";
import { Link } from "@radix-ui/themes/components/link";
import * as Table from "@radix-ui/themes/components/table";
import { Text } from "@radix-ui/themes/components/text";
import { siFigma, siStorybook } from "simple-icons";

import { frameworkColors, frameworkIcons } from "../../framework";
import { SvgIcon } from "../../icon";
import { getUiKits } from "../../ui-kit";

import styles from "../../framework/FrameworkList/FrameworkList.module.css";

const nameCompare = new Intl.Collator("en").compare;

const uiKitsResource = getUiKits();

export const ComparePage = async () => {
  const uiKitSet = await uiKitsResource;
  const uiKits = [...uiKitSet];

  const sortedUiKits = uiKits.toSorted((a, b) => nameCompare(a.name, b.name));

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Framework</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Figma</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Storybook</Table.ColumnHeaderCell>
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
            <Table.Cell>
              {uiKit.frameworks && uiKit.frameworks.length > 0 && (
                <Flex asChild gap="2">
                  <ul aria-label="Framework list" className={styles.list}>
                    {uiKit.frameworks.map((framework) => (
                      <li className={styles.listItem} key={framework}>
                        <Text asChild color={frameworkColors[framework]}>
                          <SvgIcon path={frameworkIcons[framework].path} />
                        </Text>
                      </li>
                    ))}
                  </ul>
                </Flex>
              )}
            </Table.Cell>
            <Table.Cell>
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
            <Table.Cell>
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
  );
};
