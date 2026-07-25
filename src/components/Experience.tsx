"use client";

import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { experience } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { TechChips } from "./TechChips";

export function Experience({ locale }: { locale: Locale }) {
  return (
    <Section id="experience" index="02" title={t(ui.sections.experience, locale)}>
      <ol className="border-t border-line">
        {experience.map((entry, index) => (
          <li key={`${entry.organisation}-${index}`} className="border-b border-line">
            <Reveal delay={index * 90}>
              <article className="group relative">
                {/* Amber rule that draws itself down the row on hover */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
                />
                <div className="grid gap-5 py-8 transition-colors duration-300 group-hover:bg-surface/50 md:grid-cols-[11rem_1fr] md:gap-10 md:px-5">
                  <div className="md:pt-1">
                    <p className="label tnum text-accent">{t(entry.period, locale)}</p>
                    <p className="label mt-2.5 text-faint">{t(entry.kind, locale)}</p>
                  </div>

                  <div>
                    <h3 className="text-h3 font-medium">
                      {t(entry.role, locale)}
                      <span className="text-faint"> · </span>
                      <span className="text-accent">{entry.organisation}</span>
                    </h3>
                    <p className="mt-3 max-w-2xl text-muted">
                      {t(entry.description, locale)}
                    </p>
                    <div className="mt-5">
                      <TechChips items={entry.tech} />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
