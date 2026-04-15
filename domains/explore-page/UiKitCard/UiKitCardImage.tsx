import { Box, Inset } from "@radix-ui/themes";
import { captureException } from "@sentry/nextjs";
import Image from "next/image";
import { useState } from "react";

import type { UiKit } from "../../ui-kit";

import styles from "./UiKitCardImage.module.css";

type UiKitCardImageProps = {
  uiKit: UiKit;
};

export const UiKitCardImage = (props: UiKitCardImageProps) => {
  const { uiKit } = props;

  const [hidden, setHidden] = useState(false);

  if (!uiKit.image || hidden) {
    return;
  }

  return (
    <Inset asChild side="x">
      <Box
        asChild
        className={styles.imageContainer}
        display={{
          initial: "none",
          xs: "block",
        }}
        position="relative"
      >
        <a
          aria-label={uiKit.name}
          href={uiKit.homepage}
          rel="noreferrer"
          target="_blank"
        >
          <Image
            alt=""
            className={styles.image}
            fill
            onError={() => {
              captureException(
                new Error(`Failed to load image for ${uiKit.name}`),
                { contexts: { "UI Kit": uiKit } },
              );
              setHidden(true);
            }}
            src={uiKit.image.src}
            style={{
              objectFit: uiKit.image.fit,
            }}
          />
        </a>
      </Box>
    </Inset>
  );
};
