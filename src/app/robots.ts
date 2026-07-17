import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/admin/", "/api/", "/private/"],
        crawlDelay: 1,
      },
      {
        userAgent: "AhrefsBot",
        disallow: ["/"],
      },
      {
        userAgent: "SemrushBot",
        disallow: ["/"],
      },
      {
        userAgent: "DotBot",
        disallow: ["/"],
      },
    ],
    sitemap:
      process.env.NEXT_PUBLIC_SITE_URL + "sitemap.xml" ||
      "https://example.com/sitemap.xml",
  };
}
