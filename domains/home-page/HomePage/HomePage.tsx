import { Heading, Link, Text } from "@astryxdesign/core";
import { spacingVars } from "@astryxdesign/core/theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { type Metadata } from "next";
import { Suspense } from "react";

import { getUiKits } from "../../ui-kit/server";

import { Main } from "./Main";

const title = "Find UI Kit";
const description =
  "Discover a curated collection of web UI kits with high-quality components and templates for developers";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description,
  title,
};

const styles = stylex.create({
  container: {
    minHeight: "100dvh",
  },
  containerPadding: {
    paddingInline: spacingVars["--spacing-4"],
  },
  footer: {
    marginTop: spacingVars["--spacing-8"],
  },
  header: {
    marginBottom: spacingVars["--spacing-8"],
  },
});

export const HomePage = async () => {
  const uiKitSet = await getUiKits();

  const uiKits = [...uiKitSet];

  return (
    <>
      <div {...stylex.props(styles.container)}>
        <header {...stylex.props(styles.header, styles.containerPadding)}>
          <Heading justify="center" level={1} type="display-1">
            {title}
          </Heading>
          <Text as="p" display="block" justify="center" size="lg">
            {description}
          </Text>
        </header>
        <Suspense>
          <Main uiKits={uiKits} />
        </Suspense>
      </div>
      <footer {...stylex.props(styles.footer, styles.containerPadding)}>
        <Text as="p" display="block" justify="center">
          Built by{" "}
          <Link
            color="inherit"
            hasUnderline
            href="https://www.linkedin.com/in/izorg/"
            rel="noreferrer"
            target="_blank"
          >
            Viacheslav Zavoruev
          </Link>
          . The source code is available on{" "}
          <Link
            color="inherit"
            hasUnderline
            href="https://github.com/izorg/finduikit"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </Link>
          .
        </Text>
      </footer>
    </>
  );
};
