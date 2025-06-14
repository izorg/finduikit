import { Box, type BoxProps, Link, Text } from "@radix-ui/themes";

export const Footer = (props: BoxProps) => (
  <Box asChild px="4" {...props}>
    <Text align="center" asChild color="gray" size="2">
      <footer>
        Built by{" "}
        <Link
          color="gray"
          href="https://www.linkedin.com/in/izorg/"
          rel="noreferrer"
          target="_blank"
          underline="always"
        >
          Viacheslav Zavoruev
        </Link>
        . The source code is available on{" "}
        <Link
          color="gray"
          href="https://github.com/izorg/finduikit"
          rel="noreferrer"
          target="_blank"
          underline="always"
        >
          GitHub
        </Link>
        .
      </footer>
    </Text>
  </Box>
);
