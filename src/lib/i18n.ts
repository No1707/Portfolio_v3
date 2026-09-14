export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type I18nString = Record<Locale, string>;

export function t(value: I18nString, locale: Locale): string {
  return value[locale];
}
