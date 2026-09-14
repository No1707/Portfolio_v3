"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";

export default function NotFound() {
  const params = useParams<{ lang: string }>();
  const lang = params?.lang;
  const locale: Locale = lang && isLocale(lang) ? lang : "en";

  return (
    <main className="relative isolate grid min-h-svh place-items-center overflow-hidden px-5">
      <div aria-hidden className="grid-backdrop absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="text-center">
        <p className="label tnum text-accent">404</p>
        <h1 className="mt-5 text-h2 font-semibold text-balance">{t(ui.notFound.title, locale)}</h1>
        <p className="mt-4 text-muted">{t(ui.notFound.text, locale)}</p>
        <Link
          href={`/${locale}`}
          className="group mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-contrast transition-colors duration-200 hover:bg-accent-hover"
        >
          <ArrowLeft
            size={16}
            weight="bold"
            aria-hidden
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          {t(ui.notFound.back, locale)}
        </Link>
      </div>
    </main>
  );
}
