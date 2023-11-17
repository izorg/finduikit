import { type Metadata } from "next";

import { getUiKits } from "./getUiKits";
import { UiKits } from "./UiKits";

export const metadata: Metadata = {
  description: "Explore UI kits for rapid development",
  title: "Find UI kit",
};

const Page = async () => {
  const uiKits = await getUiKits();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="mx-auto text-center">
        <div className="text-display-large">Find UI kit</div>
        <p>Explore UI kits for rapid web development</p>
      </div>
      <UiKits uiKits={uiKits} />
    </div>
  );
};

export default Page;
