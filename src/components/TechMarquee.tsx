"use client";

import type { CSSProperties } from "react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { techGroups, type TechKey } from "@/content/site";
import { techRegistry } from "./tech-registry";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

/** Fade the row out at both edges instead of cutting it off. */
const EDGE_FADE =
  "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)";

function TechPill({ techKey, clone }: { techKey: TechKey; clone?: boolean }) {
  const { name, Icon, hex } = techRegistry[techKey];

  return (
    <span
      aria-hidden={clone || undefined}
      style={{ "--brand": hex } as CSSProperties}
      className={`tech-pill flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-surface/50 px-4 py-2.5 text-sm text-muted ${
        clone ? "marquee-clone" : ""
      }`}
    >
      <Icon size={16} aria-hidden className="shrink-0" />
      {name}
    </span>
  );
}

export function TechMarquee({ locale }: { locale: Locale }) {
  return (
    <Section id="stack" index="04" title={t(ui.sections.stack, locale)}>
      <div className="space-y-6">
        {techGroups.map((group, index) => {
          // Longer rows travel proportionally longer, so every row moves at
          // roughly the same perceived speed.
          const duration = Math.max(28, group.items.length * 6);

          return (
            <Reveal key={index} delay={index * 80}>
              <div className="grid gap-3 md:grid-cols-[11rem_1fr] md:items-center md:gap-8">
                <h3 className="label text-faint">{t(group.label, locale)}</h3>

                <div
                  className="marquee relative overflow-hidden py-1"
                  style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
                >
                  <ul
                    className="marquee-track gap-3"
                    data-direction={index % 2 === 0 ? "left" : "right"}
                    style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
                  >
                    {group.items.map((key) => (
                      <li key={key} className="flex">
                        <TechPill techKey={key} />
                      </li>
                    ))}
                    {/* Second pass makes the loop seamless; hidden from AT. */}
                    {group.items.map((key) => (
                      <li key={`clone-${key}`} className="marquee-clone flex" aria-hidden>
                        <TechPill techKey={key} clone />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
