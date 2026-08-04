import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shri-krishna-coaching-center.vercel.app";

  const routes = [
    "",
    "/about",
    "/faculty",
    "/courses",
    "/facilities",
    "/gallery",
    "/notices",
    "/admission",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
