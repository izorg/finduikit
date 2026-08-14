import type { MetadataRoute } from "next";

const lastModified = new Date();

const sitemap = (): MetadataRoute.Sitemap => [
  {
    changeFrequency: "daily",
    lastModified,
    priority: 1,
    url: "https://finduikit.com",
  },
  {
    changeFrequency: "daily",
    lastModified,
    priority: 1,
    url: "https://finduikit.com/explore",
  },
];

export default sitemap;
