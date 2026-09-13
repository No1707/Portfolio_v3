"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="flex items-center gap-4">
            <h2 id={`${id}-title`} className="text-h2 font-semibold">
              {title}
            </h2>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
