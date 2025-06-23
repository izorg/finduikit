import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    changeFrequency: "daily",
    lastModified: new Date(),
    priority: 1,
    url: "https://finduikit.com",
  },
  {
    changeFrequency: "daily",
    lastModified: new Date(),
    priority: 1,
    url: "https://finduikit.com/explore",
  },
];

export default sitemap;
