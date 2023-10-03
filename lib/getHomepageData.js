// @ts-check

import { JSDOM } from "jsdom";

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

  const {
    window: { document },
  } = new JSDOM(html);

  const description =
    document
      .querySelector('head > meta[name="description"]')
      ?.getAttribute("content") ??
    document
      .querySelector('head > meta[name="og:description"]')
      ?.getAttribute("content");

  if (description) {
    data.description = description;
  }

  return data;
};
