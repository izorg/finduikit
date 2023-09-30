import { type Metadata } from "next";

import { PageView } from "./components";
import { getUiKits } from "./getUiKits";

export const metadata: Metadata = {
  description: "Explore UI kits for rapid development",
  title: "Find UI kit",
};

const Page = async () => {
  const uiKits = await getUiKits();

  return <PageView uiKits={uiKits} />;
};

export default Page;
