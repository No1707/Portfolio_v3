"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { profile } from "@/content/site";
import { SocialLinks } from "./SocialLinks";

const GLOW_UP = 16;
const GLOW_DOWN = 12;
const GLOW_CYCLE = GLOW_UP + GLOW_DOWN;

export function Hero({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const spotlight = useRef<HTMLDivElement>(null);
  const rippleId = useRef(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    const el = spotlight.current;
    if (!el || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - box.left}px`);
    el.style.setProperty("--my", `${event.clientY - box.top}px`);
    el.dataset.active = "true";
  };

  const hideSpotlight = () => {
    if (spotlight.current) spotlight.current.dataset.active = "false";
  };

  const dropRipple = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.button !== 0) return;
    if ((event.target as Element).closest("a, button")) return;
    const box = event.currentTarget.getBoundingClientRect();
    const ripple = {
      id: ++rippleId.current,
      x: event.clientX - box.left,
      y: event.clientY - box.top,
    };
    setRipples((list) => [...list.slice(-3), ripple]);
  };

  return (
    <section
      id="top"
      onPointerMove={trackPointer}
      onPointerLeave={hideSpotlight}
      onPointerDown={dropRipple}
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden pt-16"
    >
      <div aria-hidden className="grid-backdrop absolute inset-0 -z-10" />
      <div
        ref={spotlight}
        aria-hidden
        data-active="false"
        className="grid-spotlight pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 data-[active=true]:opacity-100"
      />
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden
          className="grid-ripple pointer-events-none absolute inset-0 -z-10"
          style={{ "--cx": `${ripple.x}px`, "--cy": `${ripple.y}px` } as CSSProperties}
          onAnimationEnd={() =>
            setRipples((list) => list.filter((item) => item.id !== ripple.id))
          }
        />
      ))}

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
          <motion.span {...rise(0.36)} className="label block text-faint">
            {profile.name} — {t(profile.role, locale)}
          </motion.span>

          <motion.span
            {...rise(0.42)}
            className="mt-5 block text-display font-semibold text-balance"
          >
            {t(profile.headline.lead, locale)}{" "}
            <span className="text-accent">{t(profile.headline.accent, locale)}</span>
          </motion.span>
        </h1>

        <motion.div {...rise(0.62)} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
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
            className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm font-medium text-text transition-colors duration-200 hover:border-line-strong hover:bg-surface-hover"
          >
            {t(ui.actions.getInTouch, locale)}
          </a>
        </motion.div>

        <motion.div {...rise(0.68)} className="mt-10">
          <SocialLinks />
        </motion.div>
      </div>

      <motion.a
        {...rise(0.8)}
        href="#about"
        aria-label={t(ui.actions.scrollDown, locale)}
        className="absolute right-5 bottom-8 hidden items-center gap-2 text-faint transition-colors duration-200 hover:text-accent sm:right-8 sm:flex"
      >
        <span className="label">{t(ui.nav.about, locale)}</span>
        <ArrowDown size={14} weight="bold" aria-hidden className="animate-bounce" />
      </motion.a>
    </section>
  );
}
