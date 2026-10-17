import { captureException } from "@sentry/nextjs";
import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import { useState } from "react";

import type { UiKit } from "../../ui-kit";

const styles = stylex.create({
  image: (objectFit: string) => ({
    objectFit,
  }),
  link: {
    aspectRatio: "2 / 1",
    marginInline: "calc(var(--astryx-card-padding) * -1)",
    position: "relative",
  },
});

type UiKitCardImageProps = {
  uiKit: UiKit;
};

export const UiKitCardImage = (props: UiKitCardImageProps) => {
  const { uiKit } = props;

  const [hidden, setHidden] = useState(false);

  if (hidden || !uiKit.image) {
    return;
  }

  return (
    <a
      aria-label={uiKit.name}
      href={uiKit.homepage}
      rel="noreferrer"
      target="_blank"
      {...stylex.props(styles.link)}
    >
      <Image
        alt=""
        fill
        onError={() => {
          captureException(
            new Error(`Failed to load image for ${uiKit.name}`),
            { contexts: { "UI Kit": uiKit } },
          );
          setHidden(true);
        }}
        src={uiKit.image.src}
        {...stylex.props(styles.image(uiKit.image.fit ?? "contain"))}
      />
    </a>
  );
};
