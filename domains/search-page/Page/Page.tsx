import { Flex } from "@radix-ui/themes/components/flex";
import { type Metadata } from "next";

import { Footer } from "../../footer";
import { getFrameworkFromParamsPromise } from "../../framework";
import type { DynamicRouteParams } from "../../next";
import { SearchProvider } from "../../search";
import { getUiKits } from "../../ui-kit";
import { getUnstyledFromParamsPromise } from "../../unstyled";

import { PageMain } from "./PageMain";

const defaultTitle = "UI Kits";
const description =
  "Discover a curated collection of web UI kits with high-quality components and templates for developers";

type PageProps = {
  params: DynamicRouteParams;
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const { params } = props;

  const [framework, unstyled] = await Promise.all([
    getFrameworkFromParamsPromise(params),
    getUnstyledFromParamsPromise(params),
  ]);

  const title = [
    unstyled && "Unstyled ",
    defaultTitle,
    framework && ` for ${framework}`,
  ];

  return {
    description,
    title: title.filter(Boolean).join(""),
  };
};

const uiKitsResource = getUiKits();

export const Page = async (props: PageProps) => {
  const { params } = props;

  const [framework, unstyled] = await Promise.all([
    getFrameworkFromParamsPromise(params),
    getUnstyledFromParamsPromise(params),
  ]);

  const uiKitSet = await uiKitsResource;

  let uiKits = [...uiKitSet];

  if (framework) {
    uiKits = uiKits.filter((uiKit) => uiKit.frameworks?.includes(framework));
  }

  if (unstyled) {
    uiKits = uiKits.filter((uiKit) => uiKit.unstyled);
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
