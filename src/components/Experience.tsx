"use client";

import { useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { experience, type EntryPointer } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { TechChips } from "./TechChips";

/**
 * The description, with the pointer's phrase turned into a control.
 *
 * Activation only — no hover state. A button rather than a span so it
 * still works at the keyboard and on touch, where hover doesn't exist.
 */
function Description({
  text,
  pointer,
  locale,
  onFire,
}: {
  text: string;
  pointer?: EntryPointer;
  locale: Locale;
  onFire: (target: string) => void;
}) {
  const phrase = pointer && t(pointer.phrase, locale);
  const at = phrase ? text.indexOf(phrase) : -1;

  // No pointer, or the copy was edited and the phrase no longer matches —
  // either way the description still reads correctly on its own.
  if (!pointer || !phrase || at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <button
        type="button"
        aria-label={t(pointer.label, locale)}
        className="exp-pointer"
        onClick={() => onFire(pointer.target)}
      >
        {phrase}
      </button>
      {text.slice(at + phrase.length)}
    </>
  );
}

export function Experience({ locale }: { locale: Locale }) {
  /**
   * The row currently being washed. `key` is bumped on every activation so
   * the element remounts and the animation replays; the animation ending
   * unmounts it again.
   */
  const [pointed, setPointed] = useState<{ target: string; key: number } | null>(null);

  const fire = (target: string) =>
    setPointed((previous) => ({ target, key: (previous?.key ?? 0) + 1 }));

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

                  {pointed?.target === entry.organisation && (
                    <span
                      key={pointed.key}
                      aria-hidden
                      className="pointer-events-none absolute inset-0 overflow-hidden"
                      onAnimationEnd={() => setPointed(null)}
                    >
                      <span className="exp-pulse" />
                    </span>
                  )}

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
                        <Description
                          text={t(entry.description, locale)}
                          pointer={entry.pointsTo}
                          locale={locale}
                          onFire={fire}
                        />
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
