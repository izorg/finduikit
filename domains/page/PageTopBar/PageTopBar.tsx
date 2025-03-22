import { Box } from "@radix-ui/themes/components/box";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";

import { FrameworkSelect } from "../../framework";
import { SearchInput } from "../../search";
import { SortingSelect } from "../../sorting";
import { UnstyledSwitch } from "../../unstyled";

import styles from "./PageTopBar.module.css";

export const PageTopBar = () => (
  <Box className={styles.topBar} p="4" position="sticky" top="0">
    <Flex
      direction={{
        initial: "column",
        sm: "row",
      }}
      gapX="4"
      gapY="2"
      maxWidth="800px"
      mx="auto"
      width="100%"
      wrap={{
        initial: "wrap",
        sm: "nowrap",
      }}
    >
      <Box asChild flexGrow="1">
        <SearchInput size="3" />
      </Box>
      <Flex
        align="center"
        gapX="4"
        gapY="2"
        wrap={{
          initial: "wrap",
          sm: "nowrap",
        }}
      >
        <FrameworkSelect size={{ initial: "2", sm: "3" }} />
        <Text as="label" size={{ initial: "2", sm: "3" }}>
          <Flex gap="2">
            <UnstyledSwitch size={{ initial: "1", sm: "2" }} /> Unstyled
          </Flex>
        </Text>
        <SortingSelect size={{ initial: "2", sm: "3" }} />
      </Flex>
    </Flex>
  </Box>
);
