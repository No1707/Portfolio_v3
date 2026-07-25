"use client";

import type { CSSProperties } from "react";
import type { TechKey } from "@/content/site";
import { techRegistry } from "./tech-registry";

/**
 * Technology tags used under experience entries and project cards.
 * Same brand-colour-on-hover behaviour as the pills in the Technologies
 * section, one size down.
 */
export function TechChips({ items }: { items: TechKey[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((key) => {
        const { name, Icon, hex } = techRegistry[key];
        return (
          <li
            key={key}
            style={{ "--brand": hex } as CSSProperties}
            className="tech-pill label flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-2.5 py-1.5 text-muted"
          >
            <Icon size={11} aria-hidden className="shrink-0" />
            {name}
          </li>
        );
      })}
    </ul>
  );
}
