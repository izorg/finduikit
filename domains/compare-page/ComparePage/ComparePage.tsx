import { IconButton } from "@radix-ui/themes/components/icon-button";
import { Link } from "@radix-ui/themes/components/link";
import * as Table from "@radix-ui/themes/components/table";
import { siFigma, siStorybook } from "simple-icons";

import { SvgIcon } from "../../icon";
import { getUiKits } from "../../ui-kit";

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
              {uiKit.figma && (
                <IconButton asChild color="crimson" variant="ghost">
                  <a
                    aria-label="Figma"
                    href={uiKit.figma}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <SvgIcon path={siFigma.path} />
                  </a>
                </IconButton>
              )}
            </Table.Cell>
            <Table.Cell>
              {uiKit.storybook && (
                <IconButton asChild color="ruby" variant="ghost">
                  <a
                    aria-label="Storybook"
                    href={uiKit.storybook}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <SvgIcon path={siStorybook.path} />
                  </a>
                </IconButton>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
