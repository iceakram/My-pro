import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const host = process.env.SITE_URL || "http://localhost:3000";
  const routes = ["", "/#about", "/#projects", "/#skills", "/#testimonials", "/#contact"].map(
    (path) => ({
      url: `${host}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.6
    })
  );
  return routes;
}
