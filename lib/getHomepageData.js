// @ts-check

import { parse } from "node-html-parser";

/**
 * @typedef {object} HomepageData
 * @property {string} [description]
 */

/**
 * @param {string} homepage
 * @returns {Promise<HomepageData>}
 */
export const getHomepageData = async (homepage) => {
  /**
   * @type {HomepageData}
   */
  const data = {};

  const response = await fetch(homepage);

  const html = await response.text();

  const root = parse(html);

  const description =
    root
      .querySelector('head > meta[name="description"]')
      ?.getAttribute("content") ??
    root
      .querySelector('head > meta[name="og:description"]')
      ?.getAttribute("content");

  if (description) {
    data.description = description;
  }

  return data;
};
