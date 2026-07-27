"use client";

import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { about } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function About({ locale }: { locale: Locale }) {
  return (
    <Section id="about" index="01" title={t(ui.sections.about, locale)}>
      <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
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

        <Reveal delay={140}>
          <dl className="flex gap-8 lg:flex-col lg:gap-10 lg:border-l lg:border-line lg:pl-10">
            {about.stats.map((stat) => (
              <div key={stat.value} className="flex flex-col-reverse">
                <dt className="label mt-2 text-faint">{t(stat.label, locale)}</dt>
                <dd className="tnum text-h2 font-semibold text-accent">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
