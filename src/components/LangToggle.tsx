"use client";

import { useRouter } from "next/navigation";
import { locales, t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";

export function LangToggle({
  locale,
  paths,
}: {
  locale: Locale;
  paths?: Record<Locale, string>;
}) {
  const router = useRouter();
  const other = locales.find((l) => l !== locale) ?? locale;

  function switchLanguage() {
    router.push(paths ? paths[other] : `/${other}${window.location.hash}`);
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      aria-label={t(ui.actions.switchLanguage, locale)}
      data-xray="<button>"
      data-xray-code="{locale}"
      data-xray-align="start"
      className="label group flex h-11 cursor-pointer items-center gap-1.5 rounded-full border border-line px-3.5 text-muted transition-colors duration-200 hover:border-line-strong hover:text-text"
    >
      <span aria-hidden className={locale === "en" ? "text-text" : "text-faint"}>
        EN
      </span>
      <span aria-hidden className="text-faint/50">
        /
      </span>
      <span aria-hidden className={locale === "fr" ? "text-text" : "text-faint"}>
        FR
      </span>
    </button>
  );
}
