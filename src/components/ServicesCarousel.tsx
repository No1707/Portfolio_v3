"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  ChartLineUp,
  CloudArrowUp,
  Code,
  PaintBrush,
  Target,
  type Icon,
} from "@phosphor-icons/react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";

export type ServiceSlide = {
  id: string;
  href: string;
  name: string;
  summary: string;
};

const AUTOPLAY_MS = 4500;

const ICONS: Record<string, Icon> = {
  website: Code,
  seo: ChartLineUp,
  hosting: CloudArrowUp,
  updates: PaintBrush,
  ads: Target,
};

export function ServicesCarousel({ slides, locale }: { slides: ServiceSlide[]; locale: Locale }) {
  const count = slides.length;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  const playing = !reduceMotion && inView && !hovered && !focused;

  const go = (step: number) => setActive((current) => (current + step + count) % count);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % count),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [playing, active, count]);

  const offset = (index: number) => {
    const distance = (index - active + count) % count;
    return distance > count / 2 ? distance - count : distance;
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t(ui.services.carousel, locale)}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div
        ref={stage}
        aria-live={playing ? "off" : "polite"}
        className="relative h-[26rem] overflow-hidden [perspective:1400px] sm:h-[24rem]"
      >
        {slides.map((slide, index) => {
          const position = offset(index);
          const distance = Math.abs(position);
          const centered = position === 0;
          const SlideIcon = ICONS[slide.id];

          return (
            <motion.div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${count}`}
              initial={false}
              animate={{
                x: `${position * 80}%`,
                scale: 1 - distance * 0.14,
                rotateY: position * 22,
                opacity: distance < 2 ? 1 - distance * 0.4 : 0,
              }}
              transition={
                reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 30 }
              }
              style={{ zIndex: count - distance }}
              className="absolute inset-y-4 left-1/2 w-[min(23rem,76vw)] -translate-x-1/2"
            >
              <Link
                href={slide.href}
                tabIndex={centered ? undefined : -1}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-surface p-7 transition-colors duration-300 sm:p-8 ${
                  centered ? "border-line-strong" : "pointer-events-none border-line"
                }`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -bottom-20 size-60 scale-50 rounded-full opacity-0 blur-[80px] transition-[opacity,scale] duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
                  style={{ background: "var(--accent-glow)" }}
                />
                {SlideIcon && (
                  <SlideIcon
                    size={96}
                    weight="thin"
                    aria-hidden
                    className="pointer-events-none absolute top-5 right-5 text-line-strong"
                  />
                )}
                <div className="relative mt-auto">
                  <h3 className="text-h2 font-semibold text-balance">{slide.name}</h3>
                  <p className="mt-4 text-muted">{slide.summary}</p>
                  <span className="label mt-7 inline-flex items-center gap-2 text-faint transition-colors duration-200 group-hover:text-accent">
                    {t(ui.services.more, locale)}
                    <ArrowRight
                      size={12}
                      weight="bold"
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={t(ui.services.previous, locale)}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-line-strong hover:text-text"
        >
          <CaretLeft size={17} weight="bold" aria-hidden />
        </button>

        <div className="flex items-center">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${t(ui.services.goTo, locale)} ${slide.name}`}
              aria-current={index === active ? "true" : undefined}
              className="group grid h-8 cursor-pointer place-items-center px-1.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  index === active ? "w-6 bg-accent" : "w-1.5 bg-line-strong group-hover:bg-faint"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label={t(ui.services.next, locale)}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-line-strong hover:text-text"
        >
          <CaretRight size={17} weight="bold" aria-hidden />
        </button>
      </div>
    </div>
  );
}
