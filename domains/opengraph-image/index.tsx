import { mdiRhombusSplit } from "@mdi/js";
import { ImageResponse } from "next/og";

import { getUiKits } from "../ui-kit/server";

export const alt = "The image shows total amount of UI kits on the site.";

export const size = {
  height: 630,
  width: 1200,
};

export const contentType = "image/png";

const uiKitsResource = getUiKits();

export const OpenGraphImage = async () => {
  const uiKitSet = await uiKitsResource;

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 64,
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#646464",
            display: "flex",
            fontSize: 114,
          }}
        >
          Total UI kits
        </div>
        <div
          style={{
            color: "#202020",
            display: "flex",
            fontSize: 256,
          }}
        >
          {uiKitSet.size}
        </div>
        <svg
          fill="#8145B5"
          style={{
            height: 400,
            opacity: 0.15,
            position: "absolute",
            right: 20,
            top: 20,
            transform: "rotate(20deg)",
            width: 400,
          }}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={mdiRhombusSplit} />
        </svg>
      </div>
    ),
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  );
};
