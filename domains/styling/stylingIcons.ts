import { siCss, type SimpleIcon, siSass, siTailwindcss } from "simple-icons";

import { Styling } from "./Styling";

export const stylingIcons: Partial<Record<Styling, SimpleIcon["path"]>> = {
  [Styling.CSS]: siCss.path,
  [Styling.Sass]: siSass.path,
  [Styling["Tailwind CSS"]]: siTailwindcss.path,
};
