import { locales, type I18nString, type Locale } from "@/lib/i18n";
import type { TechKey } from "./site";
import { services } from "./services";
import { expertise } from "./expertise";

export type PageKind = "service" | "expertise";

export interface PageSection {
  title: I18nString;
  paragraphs?: I18nString[];
  items?: I18nString[];
}

export interface DetailPage {
  id: string;
  kind: PageKind;
  slug: I18nString;
  name: I18nString;
  title: I18nString;
  metaTitle: I18nString;
  description: I18nString;
  summary: I18nString;
  lead: I18nString;
  sections: PageSection[];
  related: string[];
  tech?: TechKey[];
  keyword?: string;
}

export { services, expertise };

export const pages: DetailPage[] = [...services, ...expertise];

export function pageById(id: string) {
  const page = pages.find((item) => item.id === id);
  if (!page) throw new Error(`Unknown page "${id}"`);
  return page;
}

export function findPage(locale: Locale, path: string[]) {
  const joined = path.join("/");
  return pages.find((page) => page.slug[locale] === joined);
}

export function pageHref(page: DetailPage, locale: Locale) {
  return `/${locale}/${page.slug[locale]}`;
}

export function pagePaths(page: DetailPage) {
  return Object.fromEntries(locales.map((locale) => [locale, pageHref(page, locale)])) as Record<
    Locale,
    string
  >;
}
