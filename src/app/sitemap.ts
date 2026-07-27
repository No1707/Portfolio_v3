import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { absolute } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(locales.map((locale) => [locale, absolute(`/${locale}`)])),
    "x-default": absolute("/"),
  };

  return locales.map((locale) => ({
    url: absolute(`/${locale}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
