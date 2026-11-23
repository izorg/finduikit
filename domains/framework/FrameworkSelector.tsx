import {
  Selector,
  type SelectorOptionData,
  type SelectorProps,
} from "@astryxdesign/core";
import type { ComponentType, SVGProps } from "react";
import type { DistributedOmit } from "type-fest";

import { Framework } from "./Framework";
import { frameworkIcons } from "./frameworkIcons";

interface FrameworkOption extends SelectorOptionData {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: Framework;
}

type FrameworkSelectorProps = DistributedOmit<
  SelectorProps<FrameworkOption>,
  "options"
>;

const options: FrameworkOption[] = Object.values(Framework).map(
  (framework) => ({
    icon: frameworkIcons[framework],
    label: framework,
    value: framework,
  }),
);
export const FrameworkSelector = (props: FrameworkSelectorProps) => (
  <Selector {...props} options={options} />
);
