"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { profile } from "@/content/site";
import { HEADER_RIPPLES_ID, Ripples, useXrayBoxes, XrayBoxes, type Ripple } from "./Xray";

const GLOW_UP = 16;
const GLOW_DOWN = 12;
const GLOW_CYCLE = GLOW_UP + GLOW_DOWN;

const within = (box: DOMRect, x: number, y: number) =>
  x >= box.left && x < box.right && y >= box.top && y < box.bottom;

export function Hero({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const spotlight = useRef<HTMLDivElement>(null);
  const rippleId = useRef(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const { boxes, measure } = useXrayBoxes(section);

  const rise = (delay: number) => ({
    "data-rise": "",
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  useEffect(() => {
    const hero = section.current;
    if (!hero) return;
    const hosts = [...document.querySelectorAll<HTMLElement>(".xray-host")];
    let pointer: { x: number; y: number } | null = null;
    let inside = false;

    const setAll = (key: "pointer" | "hover" | "xray", value: string) =>
      hosts.forEach((host) => {
        if (host.dataset[key] !== value) host.dataset[key] = value;
      });

    const place = (heroBox: DOMRect, x: number, y: number) =>
      hosts.forEach((host) => {
        const box = host === hero ? heroBox : host.getBoundingClientRect();
        host.style.setProperty("--mx", `${x - box.left}px`);
        host.style.setProperty("--my", `${y - box.top}px`);
        host.style.setProperty("--gy", `${heroBox.top - box.top}px`);
      });

    const leave = () => {
      inside = false;
      setAll("pointer", "off");
      setAll("hover", "off");
      setAll("xray", "idle");
      if (spotlight.current) spotlight.current.dataset.active = "false";
    };

    const update = (target: () => Element | null) => {
      if (!pointer) return;
      const heroBox = hero.getBoundingClientRect();
      if (!within(heroBox, pointer.x, pointer.y)) {
        if (inside) leave();
        return;
      }
      if (!inside) measure.current();
      inside = true;
      place(heroBox, pointer.x, pointer.y);
      setAll("pointer", "on");
      setAll("hover", target()?.closest("a, button, [data-menu]") ? "on" : "off");
      if (spotlight.current) spotlight.current.dataset.active = "true";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      update(() => event.target as Element);
    };

    const onScroll = () => {
      const at = pointer;
      if (at) update(() => document.elementFromPoint(at.x, at.y));
    };

    const onOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      pointer = null;
      if (inside) leave();
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      if ((event.target as Element).closest("a, button, dialog, [role=dialog], [data-menu]")) return;
      const heroBox = hero.getBoundingClientRect();
      if (!within(heroBox, event.clientX, event.clientY)) return;
      event.preventDefault();
      place(heroBox, event.clientX, event.clientY);
      setAll("xray", "expanded");
      if (reduceMotion) return;
      const header = document.getElementById(HEADER_RIPPLES_ID)?.getBoundingClientRect();
      const x = event.clientX - heroBox.left;
      const y = event.clientY - heroBox.top;
      const hy = header ? event.clientY - header.top : y;
      setRipples((list) => [...list.slice(-3), { id: ++rippleId.current, x, y, hy }]);
    };

    const onUp = () => setAll("xray", "idle");

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerout", onOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerout", onOut);
    };
  }, [measure, reduceMotion]);

  const removeRipple = (id: number) =>
    setRipples((list) => list.filter((item) => item.id !== id));

  const headerRipples = ripples.length > 0 ? document.getElementById(HEADER_RIPPLES_ID) : null;

  return (
    <section
      id="top"
      ref={section}
      data-pointer="off"
      data-hover="off"
      data-xray="idle"
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
        <motion.h1
          {...rise(0.36)}
          data-xray="<h1>"
          data-xray-code={'{profile.name} — <span className="text-accent">{t(profile.role)}</span>'}
          className="text-display font-semibold text-balance"
        >
          {profile.name} — <span className="text-accent">{t(profile.role, locale)}</span>
        </motion.h1>

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
        <XrayBoxes boxes={boxes} />
      </div>
      <div aria-hidden className="xray-ring absolute z-10" />
      {headerRipples &&
        createPortal(
          <Ripples ripples={ripples.map((ripple) => ({ ...ripple, y: ripple.hy }))} />,
          headerRipples,
        )}

      <motion.a
        {...rise(0.8)}
        href="#about"
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
