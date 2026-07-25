"use client";

import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/use-reveal";

interface RevealProps {
  children: ReactNode;
  /** Stagger, in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/** Fades and lifts its children into place the first time they reach the fold. */
export function Reveal({ children, delay = 0, className, as }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-reveal={shown ? "shown" : "hidden"}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
