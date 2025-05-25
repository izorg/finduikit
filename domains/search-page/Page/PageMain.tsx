import { Flex } from "@radix-ui/themes/components/flex";

import { type UiKit, UiKitGrid } from "../../ui-kit";
import { PageTopBar } from "../PageTopBar";

type PageMainProps = {
  uiKits: UiKit[];
};

export const PageMain = ({ uiKits }: PageMainProps) => (
  <Flex asChild direction="column" flexGrow="1" gap="4">
    <main>
      <PageTopBar />
      <UiKitGrid uiKits={uiKits} />
    </main>
  </Flex>
);
