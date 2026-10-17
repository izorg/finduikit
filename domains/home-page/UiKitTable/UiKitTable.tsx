import {
  Icon,
  Link,
  pixel,
  Table,
  type TableColumn,
  useTableStickyColumns,
} from "@astryxdesign/core";
import { type StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import {
  IconBrandFigma,
  IconBrandGithub,
  IconBrandStorybook,
  IconCheck,
} from "@tabler/icons-react";

import type { UiKit } from "../../ui-kit";

const styles = stylex.create({
  homepageLink: {
    display: "inline",
  },
  repositoryLink: {
    verticalAlign: "middle",
  },
  repositoryLinkWrapper: {
    whiteSpace: "nowrap",
  },
  styledIcon: {
    display: "inline-block",
  },
});

const columns: TableColumn<UiKit>[] = [
  {
    header: "Name",
    key: "name",
    renderCell: (uiKit) => (
      <>
        <Link
          href={uiKit.homepage}
          target="_blank"
          xstyle={styles.homepageLink}
        >
          {uiKit.name}
        </Link>
        <span {...stylex.props(styles.repositoryLinkWrapper)}>
          {"\u{A0}"}
          <Link
            href={uiKit.repository}
            target="_blank"
            tooltip="GitHub"
            xstyle={styles.repositoryLink}
          >
            <Icon icon={IconBrandGithub} />
          </Link>
        </span>
      </>
    ),
    width: pixel(280),
  },
  {
    header: "Framework",
    key: "framework",
    renderCell: (uiKit) => uiKit.frameworks?.join(", "),
    width: pixel(220),
  },
  {
    align: "center",
    header: "Styled",
    key: "styled",
    renderCell: (uiKit) =>
      !uiKit.unstyled && <Icon icon={IconCheck} xstyle={styles.styledIcon} />,
    width: pixel(100),
  },
  {
    align: "center",
    header: "Figma",
    key: "figma",
    renderCell: (uiKit) =>
      uiKit.figma && (
        <Link href={uiKit.figma} target="_blank" tooltip="Figma">
          <Icon icon={IconBrandFigma} />
        </Link>
      ),
    width: pixel(100),
  },
  {
    align: "center",
    header: "Storybook",
    key: "storybook",
    renderCell: (uiKit) =>
      uiKit.storybook && (
        <Link href={uiKit.storybook} target="_blank" tooltip="Storybook">
          <Icon icon={IconBrandStorybook} />
        </Link>
      ),
    width: pixel(120),
  },
  {
    header: "Styling",
    key: "styling",
    renderCell: (uiKit) => uiKit.styling && [uiKit.styling].flat().join(", "),
    width: pixel(200),
  },
  {
    header: "AI",
    key: "ai",
    renderCell: (uiKit) => uiKit.ai?.map((ai) => ai.type).join(", "),
    width: pixel(200),
  },
  {
    header: "Web Components",
    key: "webComponents",
    renderCell: (uiKit) => uiKit.webComponents,
    width: pixel(160),
  },
];

type UiKitTableProps = {
  uiKits: UiKit[];
  xstyle?: StyleXStyles;
};

export const UiKitTable = ({ uiKits, ...rest }: UiKitTableProps) => {
  const stickyColumns = useTableStickyColumns<UiKit>({
    startKeys: ["name"],
  });

  return (
    <Table
      columns={columns}
      data={uiKits}
      idKey="name"
      plugins={{ stickyColumns }}
      {...rest}
    />
  );
};
