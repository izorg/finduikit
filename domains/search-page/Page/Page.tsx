import { Flex } from "@radix-ui/themes/components/flex";
import { type Metadata } from "next";

import { Footer } from "../../footer";
import { getFrameworkFromParamsPromise } from "../../framework";
import type { DynamicRouteParams } from "../../next";
import { SearchProvider } from "../../search";
import { getUiKits } from "../../ui-kit";

import { PageMain } from "./PageMain";

const title = "UI Kits";
const description =
  "Discover a curated collection of web UI kits with high-quality components and templates for developers";

export const metadata: Metadata = {
  description,
  title,
};

const uiKitsResource = getUiKits();

type PageProps = {
  params: DynamicRouteParams;
};

export const Page = async (props: PageProps) => {
  const { params } = props;

  const framework = await getFrameworkFromParamsPromise(params);

  const uiKitSet = await uiKitsResource;

  let uiKits = [...uiKitSet];

  if (framework) {
    uiKits = uiKits.filter((uiKit) => uiKit.frameworks?.includes(framework));
  }

  return (
    <SearchProvider>
      <Flex direction="column" gap="6" minHeight="100dvh" pb="4">
        <PageMain uiKits={uiKits} />
        <Footer />
      </Flex>
    </SearchProvider>
  );
};
