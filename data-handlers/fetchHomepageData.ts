import { type HTMLElement, parse } from "node-html-parser";

export const fetchHomepageData = async (
  homepage: string,
): Promise<HTMLElement> => {
  const response = await fetch(homepage);

  const html = await response.text();

  return parse(html);
};
