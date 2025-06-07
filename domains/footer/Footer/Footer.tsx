import { Box, Link, Text } from "@radix-ui/themes";

export const Footer = () => (
  <Box asChild px="4">
    <footer>
      <Text align="center" as="p" color="gray" size="2">
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
      </Text>
    </footer>
  </Box>
);
