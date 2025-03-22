import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { type Metadata } from "next";

import { getFrameworkFromParamsPromise } from "../../framework";
import type { DynamicRouteParams } from "../../next";
import { getUiKits, UiKitGrid } from "../../ui-kit";
import { getUnstyledFromParamsPromise } from "../../unstyled";
import { PageTopBar } from "../PageTopBar";

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
      <Flex asChild direction="column" gap="2" px="4">
        <Text align="center" asChild>
          <header>
            <Text
              asChild
              size={{
                initial: "6",
                sm: "9",
              }}
              weight="medium"
            >
              <h1>
                {unstyled && <>Unstyled </>}
                {defaultTitle}
                {Boolean(framework) && <> for {framework}</>}
              </h1>
            </Text>
            <Text as="p">{description}</Text>
          </header>
        </Text>
      </Flex>
      <Flex asChild direction="column" gap="4">
        <main>
          <PageTopBar />
          <UiKitGrid uiKits={uiKits} />
        </main>
      </Flex>
    </Flex>
  );
};
