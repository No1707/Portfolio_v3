"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { profile } from "@/content/site";

const GLOW_UP = 16;
const GLOW_DOWN = 12;
const GLOW_CYCLE = GLOW_UP + GLOW_DOWN;

type Ripple = { id: number; x: number; y: number };
type XrayBox = {
  id: number;
  tag: string;
  code: string;
  x: number;
  y: number;
  w: number;
  h: number;
  end: boolean;
  low: boolean;
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

function Ripples({
  ripples,
  className = "",
  onDone,
}: {
  ripples: Ripple[];
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

export function Hero({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const spotlight = useRef<HTMLDivElement>(null);
  const rippleId = useRef(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [boxes, setBoxes] = useState<XrayBox[]>([]);

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  const measure = useCallback(() => {
    const host = section.current;
    if (!host) return;
    const origin = host.getBoundingClientRect();
    setBoxes(
      [...host.querySelectorAll<HTMLElement>("[data-xray]")]
        .map((el, id) => {
          const box = el.getBoundingClientRect();
          return {
            id,
            tag: el.dataset.xray ?? "",
            code: el.dataset.xrayCode ?? "",
            x: Math.round(box.left - origin.left),
            y: Math.round(box.top - origin.top),
            w: Math.round(box.width),
            h: Math.round(box.height),
            end: box.left + box.width / 2 - origin.left > origin.width / 2,
            low: box.bottom - origin.top + 20 > origin.height,
          };
        })
        .filter((box) => box.w > 0 && box.h > 0),
    );
  }, []);

  useEffect(() => {
    const host = section.current;
    if (!host) return;
    const settle = window.setTimeout(measure, 1200);
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    document.fonts.ready.then(measure);
    return () => {
      window.clearTimeout(settle);
      observer.disconnect();
    };
  }, [measure]);

  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const host = event.currentTarget;
    const box = host.getBoundingClientRect();
    host.style.setProperty("--mx", `${event.clientX - box.left}px`);
    host.style.setProperty("--my", `${event.clientY - box.top}px`);
    host.dataset.pointer = "on";
    host.dataset.hover = (event.target as Element).closest("a, button") ? "on" : "off";
    if (spotlight.current) spotlight.current.dataset.active = "true";
  };

  const leaveHero = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.dataset.pointer = "off";
    event.currentTarget.dataset.hover = "off";
    event.currentTarget.dataset.xray = "idle";
    if (spotlight.current) spotlight.current.dataset.active = "false";
  };

  const releaseHero = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.dataset.xray = "idle";
  };

  const pressHero = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    if ((event.target as Element).closest("a, button")) return;
    if (event.pointerType === "mouse") event.preventDefault();
    const host = event.currentTarget;
    const box = host.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    host.style.setProperty("--mx", `${x}px`);
    host.style.setProperty("--my", `${y}px`);
    host.dataset.xray = "expanded";
    if (reduceMotion) return;
    setRipples((list) => [...list.slice(-3), { id: ++rippleId.current, x, y }]);
  };

  const removeRipple = (id: number) =>
    setRipples((list) => list.filter((item) => item.id !== id));

  return (
    <section
      id="top"
      ref={section}
      data-pointer="off"
      data-hover="off"
      data-xray="idle"
      onPointerEnter={measure}
      onPointerMove={trackPointer}
      onPointerLeave={leaveHero}
      onPointerDown={pressHero}
      onPointerUp={releaseHero}
      onPointerCancel={releaseHero}
      className="xray-host relative isolate flex min-h-svh items-center overflow-hidden border-b border-line pt-16"
    >
      <div aria-hidden className="grid-backdrop absolute inset-0 -z-10" />
      <div
        ref={spotlight}
        aria-hidden
        data-active="false"
        className="grid-spotlight pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 data-[active=true]:opacity-100"
      />
      <Ripples ripples={ripples} className="-z-10" onDone={removeRipple} />

      {!reduceMotion && (
        <>
          <div
            aria-hidden
            className="scan-flash pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--grid-line-lit) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-lit) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div aria-hidden className="scan pointer-events-none absolute inset-0 z-20">
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--accent) 12%, var(--accent) 88%, transparent)",
                boxShadow: "0 0 18px 2px var(--accent-glow)",
              }}
            />
          </div>
        </>
      )}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-[120px] sm:left-[22%]"
        style={{ background: "var(--accent-glow)" }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
        animate={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: [0, 1, 0], scale: [0.95, 1.08, 0.95], x: [0, 40, 0] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: GLOW_CYCLE,
                times: [0, GLOW_UP / GLOW_CYCLE, 1],
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <h1>
          <motion.span
            {...rise(0.36)}
            data-xray="<span.label>"
            data-xray-code="{profile.name} — {t(profile.role)}"
            className="label block text-faint"
          >
            {profile.name} — {t(profile.role, locale)}
          </motion.span>

          <motion.span
            {...rise(0.42)}
            data-xray="<h1>"
            data-xray-code={'{t(headline.lead)} <span className="text-accent">{t(headline.accent)}</span>'}
            className="mt-5 block text-display font-semibold text-balance"
          >
            {t(profile.headline.lead, locale)}{" "}
            <span className="text-accent">{t(profile.headline.accent, locale)}</span>
          </motion.span>
        </h1>

        <motion.div {...rise(0.62)} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            data-xray={'<a href="#projects">'}
            data-xray-code="{t(ui.actions.viewWork)} <ArrowRight />"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-contrast transition-colors duration-200 hover:bg-accent-hover"
          >
            {t(ui.actions.viewWork, locale)}
            <ArrowRight
              size={16}
              weight="bold"
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#contact"
            data-xray={'<a href="#contact">'}
            data-xray-code="{t(ui.actions.getInTouch)}"
            className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm font-medium text-text transition-colors duration-200 hover:border-line-strong hover:bg-surface-hover"
          >
            {t(ui.actions.getInTouch, locale)}
          </a>
        </motion.div>
      </div>

      <div aria-hidden className="xray-layer absolute inset-0 z-10 bg-bg">
        <div className="xray-grid absolute inset-0" />
        <Ripples ripples={ripples} />
        {boxes.map((box, index) => {
          const previous = boxes[index - 1];
          const top = previous ? previous.y + previous.h : 0;
          const gap = box.y - top;
          const lineX = box.x - 12;
          const reach = previous ? lineX - (previous.x + previous.w) : 0;
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
                  <div
                    className="absolute w-px bg-accent/50"
                    style={{ left: lineX, top, height: gap }}
                  >
                    <span
                      className={`tnum absolute top-1/2 -translate-y-1/2 font-mono text-[10px] text-accent ${box.end ? "right-2" : "left-2"}`}
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
                  className={`absolute bottom-full mb-1 flex items-center gap-2 ${box.end ? "right-0" : "left-0"}`}
                >
                  {box.low && (
                    <span className="tnum font-mono text-[10px] leading-none text-faint">
                      {box.w}×{box.h}
                    </span>
                  )}
                  <span className="rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[10px] leading-none whitespace-nowrap text-accent-contrast">
                    {box.tag}
                  </span>
                </div>
                <code
                  className={`h-full px-2 font-mono text-[10px] ${
                    box.h < 28
                      ? `flex items-center leading-none whitespace-nowrap ${box.end ? "justify-end" : ""}`
                      : "block overflow-hidden py-1.5 leading-relaxed break-all"
                  }`}
                >
                  <Code source={box.code} />
                </code>
                {!box.low && (
                  <span className="tnum absolute top-full right-0 mt-1 font-mono text-[10px] text-faint">
                    {box.w}×{box.h}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div aria-hidden className="xray-ring absolute z-10" />

      <motion.a
        {...rise(0.8)}
        href="#about"
        aria-label={t(ui.actions.scrollDown, locale)}
        data-xray={'<a href="#about">'}
        data-xray-code="{t(ui.nav.about)} <ArrowDown />"
        className="absolute right-5 bottom-8 hidden items-center gap-2 text-faint transition-colors duration-200 hover:text-accent sm:right-8 sm:flex"
      >
        <span className="label">{t(ui.nav.about, locale)}</span>
        <ArrowDown size={14} weight="bold" aria-hidden className="animate-bounce" />
      </motion.a>
    </section>
  );
}
