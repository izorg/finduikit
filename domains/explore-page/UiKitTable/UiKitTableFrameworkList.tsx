import { Flex, Text } from "@radix-ui/themes";

import { Framework, frameworkColors, frameworkIcons } from "../../framework";
import { SvgIcon } from "../../icon";

import styles from "./UiKitTableFrameworkList.module.css";

type ComparePageFrameworkListProps = {
  frameworks?: Framework[];
};

export const UiKitTableFrameworkList = (
  props: ComparePageFrameworkListProps,
) => {
  const { frameworks } = props;

  return (
    <Flex asChild display="inline-flex" gap="2">
      <ul aria-label="Framework list" className={styles.list}>
        {Object.values(Framework).map((framework) => (
          <li key={framework}>
            <Text asChild color={frameworkColors[framework]}>
              <SvgIcon
                path={frameworkIcons[framework].path}
                style={{
                  opacity: frameworks?.includes(framework) ? undefined : 0.12,
                }}
              />
            </Text>
          </li>
        ))}
      </ul>
    </Flex>
  );
};
