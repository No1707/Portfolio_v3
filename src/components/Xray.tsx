"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

export const HEADER_RIPPLES_ID = "xray-header-ripples";

export type Ripple ={ id: number; x: number; y: number; hy: number };

type XrayAlign = "start" | "center" | "end";

type XrayBox = {
  id: number;
  tag: string;
  code: string;
  x: number;
  y: number;
  w: number;
  h: number;
  align: XrayAlign;
  low: boolean;
  lower: boolean;
};

const ALIGN: Record<XrayAlign, { chip: string; code: string }> = {
  start: { chip: "left-0", code: "" },
  center: { chip: "left-1/2 -translate-x-1/2", code: "justify-center" },
  end: { chip: "right-0", code: "justify-end" },
};

function Code({ source }: { source: string }) {
  return source
    .split(/(\{[^}]*\}|<[^>]+>)/g)
    .filter(Boolean)
    .map((part, index) => (
      <span
        key={index}
        className={
          part.startsWith("{") ? "text-text" : part.startsWith("<") ? "text-accent" : "text-muted"
        }
      >
        {part}
      </span>
    ));
}

export function Ripples({
  ripples,
  className = "",
  onDone,
}: {
  ripples: { id: number; x: number; y: number }[];
  className?: string;
  onDone?: (id: number) => void;
}) {
  return ripples.map((ripple) => (
    <span
      key={ripple.id}
      aria-hidden
      className={`grid-ripple pointer-events-none absolute inset-0 ${className}`}
      style={{ "--cx": `${ripple.x}px`, "--cy": `${ripple.y}px` } as CSSProperties}
      onAnimationEnd={onDone ? () => onDone(ripple.id) : undefined}
    />
  ));
}

export function useXrayBoxes(host: RefObject<HTMLElement | null>) {
  const [boxes, setBoxes] = useState<XrayBox[]>([]);

  const measure = useRef(() => {});

  useEffect(() => {
    const root = host.current;
    if (!root) return;
    const run = () => {
      const origin = root.getBoundingClientRect();
      setBoxes(
        [...root.querySelectorAll<HTMLElement>("[data-xray]")]
          .map((el, id) => {
            const box = el.getBoundingClientRect();
            const auto = box.left + box.width / 2 - origin.left > origin.width / 2 ? "end" : "start";
            return {
              id,
              tag: el.dataset.xray ?? "",
              code: el.dataset.xrayCode ?? "",
              x: Math.round(box.left - origin.left),
              y: Math.round(box.top - origin.top),
              w: Math.round(box.width),
              h: Math.round(box.height),
              align: (el.dataset.xrayAlign as XrayAlign | undefined) ?? auto,
              low: box.bottom - origin.top + 20 > origin.height,
              lower: el.dataset.xrayRow === "2",
            };
          })
          .filter((box) => box.w > 0 && box.h > 0),
      );
    };
    measure.current = run;
    const settle = window.setTimeout(run, 1200);
    const observer = new ResizeObserver(run);
    observer.observe(root);
    root.querySelectorAll("[data-xray]").forEach((el) => observer.observe(el));
    document.fonts.ready.then(run);
    return () => {
      window.clearTimeout(settle);
      observer.disconnect();
    };
  }, [host]);

  return { boxes, measure };
}

export function XrayBoxes({ boxes, compact = false }: { boxes: XrayBox[]; compact?: boolean }) {
  return boxes.map((box, index) => {
    const previous = compact ? undefined : boxes[index - 1];
    const top = previous ? previous.y + previous.h : 0;
    const gap = box.y - top;
    const lineX = box.x - 12;
    const reach = previous ? lineX - (previous.x + previous.w) : 0;
    const align = ALIGN[box.align];
    const size = (
      <span className="tnum font-mono text-[10px] leading-none text-faint">
        {box.w}×{box.h}
      </span>
    );
    return (
      <div key={box.id}>
        {previous && gap >= 8 && (
          <>
            {reach > 0 && (
              <div
                className="absolute h-px border-t border-dashed border-accent/40"
                style={{ left: previous.x + previous.w, top, width: reach }}
              />
            )}
            <div className="absolute w-px bg-accent/50" style={{ left: lineX, top, height: gap }}>
              <span
                className={`tnum absolute top-1/2 -translate-y-1/2 font-mono text-[10px] text-accent ${box.align === "end" ? "right-2" : "left-2"}`}
              >
                {gap}px
              </span>
            </div>
          </>
        )}
        <div
          className="absolute rounded-sm border border-dashed border-accent/60"
          style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
        >
          <div
            className={`absolute flex items-center gap-2 ${compact ? `top-full ${box.lower ? "mt-[36px]" : "mt-[18px]"}` : "bottom-full mb-1"} ${align.chip}`}
          >
            {box.low && !compact && size}
            <span className="rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[10px] leading-none whitespace-nowrap text-accent-contrast">
              {box.tag}
            </span>
          </div>
          <code
            className={`h-full px-2 font-mono text-[10px] ${
              box.h < 28 || box.w < 100
                ? `flex items-center leading-none whitespace-nowrap ${align.code}`
                : "block overflow-hidden py-1.5 leading-relaxed break-all"
            }`}
          >
            <Code source={box.code} />
          </code>
          {(compact || !box.low) && <div className="absolute top-full right-0 mt-1 flex">{size}</div>}
        </div>
      </div>
    );
  });
}
