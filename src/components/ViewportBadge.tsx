"use client";

import { useEffect, useState } from "react";

const BREAKPOINTS: [number, string][] = [
  [1536, "2xl"],
  [1280, "xl"],
  [1024, "lg"],
  [768, "md"],
  [640, "sm"],
  [0, "xs"],
];

export function ViewportBadge() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setWidth(window.innerWidth);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  if (width === null) return null;

  const breakpoint = BREAKPOINTS.find(([min]) => width >= min)?.[1] ?? "xs";

  return (
    <div
      aria-hidden
      className="label tnum absolute right-8 bottom-8 hidden items-center gap-2 text-faint/70 lg:flex"
    >
      <span>{width}px</span>
      <span className="text-faint/40">/</span>
      <span className="text-accent/80">{breakpoint}</span>
    </div>
  );
}
