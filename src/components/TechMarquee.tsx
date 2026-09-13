"use client";

import type { CSSProperties } from "react";
import { t, type Locale } from "@/lib/i18n";
import { useMarqueeDrag } from "@/lib/use-marquee-drag";
import { ui } from "@/content/ui";
import { techGroups, type TechKey } from "@/content/site";
import { techRegistry } from "./tech-registry";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

const EDGE_FADE =
  "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)";

const PASSES = 4;

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

function TechRow({
  group,
  index,
  locale,
}: {
  group: (typeof techGroups)[number];
  index: number;
  locale: Locale;
}) {
  const duration = Math.max(28, group.items.length * 6) * (PASSES / 2);
  const boxRef = useMarqueeDrag<HTMLDivElement>();

  return (
    <div className="grid gap-3 md:grid-cols-[11rem_1fr] md:items-center md:gap-8">
      <h3 className="label text-faint">{t(group.label, locale)}</h3>

      <div
        ref={boxRef}
        className="marquee relative overflow-hidden py-1"
        style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
      >
        <ul
          className="marquee-track gap-3"
          data-direction={index % 2 === 0 ? "left" : "right"}
          style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
        >
          {Array.from({ length: PASSES }, (_, pass) =>
            group.items.map((key) => (
              <li
                key={`${pass}-${key}`}
                className={pass === 0 ? "flex" : "marquee-clone flex"}
                aria-hidden={pass === 0 ? undefined : true}
              >
                <TechPill techKey={key} clone={pass > 0} />
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
}

export function TechMarquee({ locale }: { locale: Locale }) {
  return (
    <Section id="stack" title={t(ui.sections.stack, locale)}>
      <div className="space-y-6">
        {techGroups.map((group, index) => (
          <Reveal key={index} delay={index * 80}>
            <TechRow group={group} index={index} locale={locale} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
