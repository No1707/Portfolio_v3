import type { MetadataRoute } from "next";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";
import { absolute } from "@/lib/site-url";
import { pagePaths, pages } from "@/content/pages";

function entries(paths: Record<Locale, string>, xDefault: string, priority: number) {
  const languages = {
    ...Object.fromEntries(locales.map((locale) => [locale, absolute(paths[locale])])),
    "x-default": absolute(xDefault),
  };

  return locales.map((locale) => ({
    url: absolute(paths[locale]),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const home = Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])) as Record<
    Locale,
    string
  >;

  return [
    ...entries(home, "/", 1),
    ...pages.flatMap((page) => {
      const paths = pagePaths(page);
      return entries(paths, paths[defaultLocale], 0.8);
    }),
  ];
}
