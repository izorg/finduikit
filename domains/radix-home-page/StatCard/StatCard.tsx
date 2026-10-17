import { Box, Card, Text, type TextProps } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";

import { SvgIcon } from "../../icon";

import styles from "./StatCard.module.css";

const Label = ({ children }: { children: string }) => (
  <Text as="div" color="gray" size={{ initial: "2", md: "3" }}>
    {children}
  </Text>
);

const Stat = ({ children }: { children: number }) => (
  <Text as="div" size={{ initial: "7", md: "8" }} weight="medium">
    {children.toLocaleString("en")}
  </Text>
);

const Icon = ({ color, path }: { color: TextProps["color"]; path: string }) => (
  <Text asChild color={color}>
    <SvgIcon aria-hidden className={styles.cardIllustration} path={path} />
  </Text>
);

export const StatCard = ({ children }: PropsWithChildren) => {
  return (
    <Box asChild width={{ initial: "10rem", md: "12rem" }}>
      <Card asChild className={styles.card} size={{ initial: "2", md: "3" }}>
        <section>{children}</section>
      </Card>
    </Box>
  );
};

StatCard.Icon = Icon;
StatCard.Label = Label;
StatCard.Stat = Stat;
