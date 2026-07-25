export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** A string that exists in both languages. */
export type I18nString = Record<Locale, string>;

/** Pick the right language out of an `{ en, fr }` object. */
export function t(value: I18nString, locale: Locale): string {
  return value[locale];
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};
