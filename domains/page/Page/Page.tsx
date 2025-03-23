import { Flex } from "@radix-ui/themes/components/flex";
import { type Metadata } from "next";

import { getFrameworkFromParamsPromise } from "../../framework";
import type { DynamicRouteParams } from "../../next";
import { getUiKits } from "../../ui-kit";
import { getUnstyledFromParamsPromise } from "../../unstyled";

import { PageFooter } from "./PageFooter";
import { PageHeader } from "./PageHeader";
import { PageMain } from "./PageMain";

const defaultTitle = "UI Kits";
const description =
  "Discover a curated collection of web UI kits with high-quality component libraries and templates for developers";

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

export const Page = async (props: PageProps) => {
  const { params } = props;

  const [framework, unstyled] = await Promise.all([
    getFrameworkFromParamsPromise(params),
    getUnstyledFromParamsPromise(params),
  ]);

  let uiKits = await getUiKits();

  if (framework) {
    uiKits = uiKits.filter((uiKit) => uiKit.frameworks?.includes(framework));
  }

  if (unstyled) {
    uiKits = uiKits.filter((uiKit) => uiKit.unstyled);
  }

  return (
    <Flex direction="column" gap="4" py="4">
      <PageHeader
        defaultTitle={defaultTitle}
        description={description}
        framework={framework}
        unstyled={unstyled}
      />
      <PageMain uiKits={uiKits} />
      <PageFooter />
    </Flex>
  );
};
