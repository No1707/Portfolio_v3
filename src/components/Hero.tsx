"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { profile } from "@/content/site";
import { SocialLinks } from "./SocialLinks";
import { ViewportBadge } from "./ViewportBadge";

const GLOW_UP = 16;
const GLOW_DOWN = 12;
const GLOW_CYCLE = GLOW_UP + GLOW_DOWN;

export function Hero({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden pt-16"
    >
      <div aria-hidden className="grid-backdrop absolute inset-0 -z-10" />

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
        <motion.p
          {...rise(0.3)}
          className="label inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/50 px-3 py-2 text-muted"
        >
          <span className="relative flex size-1.5" aria-hidden>
            {profile.available && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            )}
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          {t(profile.availability, locale)}
        </motion.p>

        <h1 className="mt-8">
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
        className="absolute bottom-8 left-5 hidden items-center gap-2 text-faint transition-colors duration-200 hover:text-accent sm:left-8 sm:flex"
      >
        <ArrowDown size={14} weight="bold" aria-hidden className="animate-bounce" />
        <span className="label">{t(ui.nav.about, locale)}</span>
      </motion.a>

      <ViewportBadge />
    </section>
  );
}
