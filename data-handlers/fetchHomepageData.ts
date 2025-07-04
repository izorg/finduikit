import { type HTMLElement, parse } from "node-html-parser";

const urlHeaders: Partial<Record<string, HeadersInit>> = {
  "https://canvas.workday.com/": {
    // Workaround for some sites that block requests without a user agent, example `Workday Canvas Kit`
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
  },
};

export const fetchHomepageData = async (
  homepage: string,
): Promise<HTMLElement> => {
  const response = await fetch(homepage, {
    headers: urlHeaders[homepage],
  });

  const html = await response.text();

  if (response.status > 200) {
    console.log(response.status, response.statusText, homepage);
  }

  return parse(html);
};
