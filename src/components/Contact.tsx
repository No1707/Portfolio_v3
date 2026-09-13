"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { profile } from "@/content/site";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";

export function Contact({ locale }: { locale: Locale }) {
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    t(ui.contact.subject, locale),
  )}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 left-1/2 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-[110px]"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="label text-faint">{t(ui.sections.contact, locale)}</span>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 id="contact-title" className="mt-10 max-w-3xl text-display font-semibold text-balance">
            {t(ui.contact.headline, locale)}
            <span className="text-accent">.</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
            <a
              href={mailto}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-contrast transition-colors duration-200 hover:bg-accent-hover"
            >
              {t(ui.contact.cta, locale)}
              <ArrowUpRight
                size={16}
                weight="bold"
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href={mailto}
              className="text-sm text-muted underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
            >
              {profile.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10">
            <SocialLinks size={20} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
