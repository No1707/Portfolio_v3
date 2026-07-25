"use client";

import { useEffect, useRef, useState } from "react";

/* Grid geometry — SPACING must match the CSS grid in `grid-backdrop`. */
const SPACING = 64;
/** Half-size of the patch we redraw, and the radius of the colour falloff. */
const RADIUS = 340;
/** Width of the well. Larger = a broader, gentler dip. */
const SIGMA = 85;
/** Maximum fraction of the distance a point is pulled toward the cursor. */
const STRENGTH = 0.55;
/** Sampling interval along each line. Smaller = smoother curve, more points. */
const STEP = 18;

/**
 * A gravity well in the blueprint grid.
 *
 * The static CSS grid stays where it is. On top of it we redraw only the
 * lines within `RADIUS` of the cursor as a single SVG path, displacing each
 * sampled point toward the pointer by a gaussian falloff — so lines bow
 * inward near the cursor and are perfectly straight again by the edge of
 * the patch, where they rejoin the CSS grid invisibly.
 *
 * One path element, one `d` attribute write per frame. No layout, no React
 * render in the hot path.
 */
export function GridWell() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;

    // Looked up rather than ref'd: a ref on <radialGradient> comes back
    // null after hydration, which would silently kill the whole effect.
    const gradient = wrap.querySelector("radialGradient");
    if (!gradient) return;

    // Nothing to follow without a cursor, and nothing to show if the
    // reader has asked for less movement.
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let clientX = 0;
    let clientY = 0;
    let inside = false;

    const TWO_SIGMA_SQ = 2 * SIGMA * SIGMA;

    // Arrow consts rather than declarations: a hoisted `function` can't
    // keep the non-null narrowing from the guard above.
    const draw = (cx: number, cy: number) => {
      const left = cx - RADIUS;
      const right = cx + RADIUS;
      const top = cy - RADIUS;
      const bottom = cy + RADIUS;
      const parts: string[] = [];

      // The CSS grid paints its 1px line across [0,1) of each cell, so the
      // stroke centre sits at +0.5 to land on exactly the same pixels.
      const firstX = Math.ceil((left - 0.5) / SPACING) * SPACING + 0.5;
      const firstY = Math.ceil((top - 0.5) / SPACING) * SPACING + 0.5;

      for (let x = firstX; x <= right; x += SPACING) {
        for (let y = top; y <= bottom; y += STEP) {
          const dx = x - cx;
          const dy = y - cy;
          const k = STRENGTH * Math.exp(-(dx * dx + dy * dy) / TWO_SIGMA_SQ);
          parts.push(
            `${y === top ? "M" : "L"}${(x - dx * k).toFixed(1)} ${(y - dy * k).toFixed(1)}`,
          );
        }
      }

      for (let y = firstY; y <= bottom; y += SPACING) {
        for (let x = left; x <= right; x += STEP) {
          const dx = x - cx;
          const dy = y - cy;
          const k = STRENGTH * Math.exp(-(dx * dx + dy * dy) / TWO_SIGMA_SQ);
          parts.push(
            `${x === left ? "M" : "L"}${(x - dx * k).toFixed(1)} ${(y - dy * k).toFixed(1)}`,
          );
        }
      }

      path.setAttribute("d", parts.join(""));
      gradient.setAttribute("cx", String(cx));
      gradient.setAttribute("cy", String(cy));
    };

    const tick = () => {
      frame = 0;
      const rect = wrap.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const nowInside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;

      if (nowInside !== inside) {
        inside = nowInside;
        setActive(nowInside);
      }
      if (nowInside) draw(x, y);
    };

    const onPointerMove = (event: PointerEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      data-lit={active}
      className="grid-well pointer-events-none absolute inset-0 -z-10"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grid-well-stroke" gradientUnits="userSpaceOnUse" r={RADIUS} cx="-1000" cy="-1000">
            {/* Amber at the centre, fading back to the grid's own colour by
                the edge — so the redrawn patch dissolves into the CSS grid. */}
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.75" />
            <stop offset="0.45" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--grid-line)" stopOpacity="1" />
          </radialGradient>
        </defs>
        <path ref={pathRef} fill="none" stroke="url(#grid-well-stroke)" strokeWidth="1" />
      </svg>
    </div>
  );
}
