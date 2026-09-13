"use client";

import Image from "next/image";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { about } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function About({ locale }: { locale: Locale }) {
  return (
    <Section id="about" title={t(ui.sections.about, locale)}>
      <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-20">
        <Reveal>
          <div className="relative aspect-square w-40 overflow-hidden rounded-2xl border border-line bg-surface/40 sm:w-44">
            <Image
              src="/nolan.jpg"
              alt={t(ui.about.portraitAlt, locale)}
              fill
              sizes="(min-width: 640px) 11rem, 10rem"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="max-w-2xl">
          <Reveal>
            <p className="text-h3 font-medium">{t(about.intro, locale)}</p>
          </Reveal>

          <div className="mt-6 space-y-5 text-lead text-muted">
            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={index} as="p" delay={60 + index * 70}>
                {t(paragraph, locale)}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
