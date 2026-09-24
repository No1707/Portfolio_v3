"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUp, CaretDown, List, X } from "@phosphor-icons/react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import type { MenuItem, MenuSection } from "@/content/nav";
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LangToggle";
import { HEADER_RIPPLES_ID, useXrayBoxes, XrayBoxes } from "./Xray";

const SECTIONS = ["about", "services", "projects", "stack", "contact"] as const;

const SPY_OFFSET = 96;

const RESUME = "/CV_Nolan_Boisel.pdf";

export function Header({
  locale,
  menu,
  home = true,
  paths,
  section,
  currentHref,
}: {
  locale: Locale;
  menu: MenuItem[];
  home?: boolean;
  paths?: Record<Locale, string>;
  section?: MenuSection;
  currentHref?: string;
}) {
  const [active, setActive] = useState<MenuSection | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [past, setPast] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const host = useRef<HTMLElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { boxes } = useXrayBoxes(host);

  const hrefFor = (id: MenuItem["id"]) => {
    if (id === "home") return home ? "#top" : `/${locale}`;
    return home ? `#${id}` : `/${locale}#${id}`;
  };

  const isActive = (id: MenuItem["id"]) =>
    id === "home" ? home && active === null : (home ? active : section) === id;

  const showTop = active !== null || past;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let frame = 0;

    function measure() {
      frame = 0;
      setScrolled(window.scrollY > 12);
      setPast(window.scrollY > window.innerHeight);

      let current: MenuSection | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= SPY_OFFSET) current = id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      setActive(atBottom ? SECTIONS[SECTIONS.length - 1] : current);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const trigger = menuButton.current;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
      const dialog = mobileMenu.current;
      if (event.key !== "Tab" || !dialog) return;

      const items = [...dialog.querySelectorAll<HTMLElement>("a[href], button")];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      const current = document.activeElement;
      if (!dialog.contains(current)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [menuOpen]);

  return (
    <header
      ref={host}
      data-pointer="off"
      data-hover="off"
      data-xray="idle"
      className="xray-host fixed inset-x-0 top-0 z-50"
    >
      <div aria-hidden className="bg-bg">
        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-accent"
        />
      </div>

      <div
        className={`transition-colors duration-300 ${
          scrolled
            ? "border-b border-line bg-bg/75 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <nav aria-label={t(ui.navigation.primary, locale)} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {menu.map((item, index) => {
                const href = hrefFor(item.id);
                const current = isActive(item.id);
                return (
                  <li key={item.id} className="group/menu relative">
                    <a
                      href={href}
                      aria-current={current ? "true" : undefined}
                      data-xray={`<a href="${href}">`}
                      data-xray-code="{label}"
                      data-xray-align="center"
                      data-xray-row={index % 2 ? "2" : undefined}
                      className={`label relative inline-flex items-center gap-1.5 rounded-full px-3 py-2 transition-colors duration-200 ${
                        current ? "text-text" : "text-faint hover:text-muted"
                      }`}
                    >
                      {item.label}
                      {item.children && (
                        <CaretDown
                          size={9}
                          weight="bold"
                          aria-hidden
                          className="transition-transform duration-200 group-focus-within/menu:rotate-180 group-hover/menu:rotate-180"
                        />
                      )}
                      {current && (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </a>

                    {item.children && (
                      <div
                        data-menu
                        className="invisible absolute top-full left-1/2 z-20 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-[opacity,visibility,translate] duration-200 group-focus-within/menu:visible group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100"
                      >
                        <ul className="min-w-60 rounded-2xl border border-line bg-bg/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl">
                          {item.children.map((child) => {
                            const here = child.href === currentHref;
                            return (
                              <li key={child.id}>
                                <Link
                                  href={child.href}
                                  aria-current={here ? "page" : undefined}
                                  className={`block rounded-xl px-3.5 py-2.5 text-sm whitespace-nowrap transition-colors duration-200 hover:bg-surface-hover hover:text-text ${
                                    here ? "text-accent" : "text-muted"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={RESUME}
              target="_blank"
              rel="noreferrer noopener"
              title={t(ui.actions.openResume, locale)}
              data-xray="<a>"
              data-xray-code="{CV}"
              data-xray-align="center"
              className="label flex h-11 items-center rounded-full border border-line px-3.5 text-muted transition-colors duration-200 hover:border-line-strong hover:text-text"
            >
              {t(ui.actions.resume, locale)}
            </a>
            <LangToggle locale={locale} paths={paths} />
            <ThemeToggle locale={locale} />
            <button
              ref={menuButton}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t(ui.actions.openMenu, locale)}
              aria-expanded={menuOpen}
              data-xray="<button>"
              data-xray-code="<List />"
              data-xray-align="center"
              className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-line-strong hover:text-text md:hidden"
            >
              <List size={17} weight="bold" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div aria-hidden className="xray-layer absolute inset-x-0 top-0 -bottom-12 z-10">
        <div className="absolute inset-x-0 top-0 bottom-12 bg-bg">
          <div className="xray-grid absolute inset-0" />
          <div id={HEADER_RIPPLES_ID} className="absolute inset-0 overflow-hidden" />
        </div>
        <XrayBoxes boxes={boxes} compact />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="xray-ring xray-ring-flat absolute" />
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0 })}
        aria-label={t(ui.actions.backToTop, locale)}
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        className={`fixed right-5 bottom-5 grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-bg/75 text-muted backdrop-blur-xl transition-[opacity,translate,color,border-color] duration-300 hover:border-line-strong hover:text-text sm:right-8 sm:bottom-8 ${
          showTop ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp size={17} weight="bold" aria-hidden />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            ref={mobileMenu}
            role="dialog"
            aria-modal="true"
            aria-label={t(ui.navigation.menu, locale)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 overflow-y-auto bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-16 items-center justify-end px-5">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t(ui.actions.closeMenu, locale)}
                autoFocus
                className="grid size-11 place-items-center rounded-full border border-line text-muted"
              >
                <X size={17} weight="bold" aria-hidden />
              </button>
            </div>

            <nav aria-label={t(ui.navigation.primary, locale)} className="px-5 pt-2 pb-10">
              <ul className="flex flex-col">
                {menu.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index + 0.05, duration: 0.3, ease: "easeOut" }}
                    className="border-b border-line"
                  >
                    <a
                      href={hrefFor(item.id)}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-4 py-4 text-h3 text-text"
                    >
                      <span className="label text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                    {item.children && (
                      <ul className="-mt-1 space-y-0.5 pb-4 pl-10">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.href}
                              onClick={() => setMenuOpen(false)}
                              aria-current={child.href === currentHref ? "page" : undefined}
                              className={`block py-1.5 text-sm ${
                                child.href === currentHref ? "text-accent" : "text-muted"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * menu.length + 0.05, duration: 0.3, ease: "easeOut" }}
                  className="border-b border-line"
                >
                  <a
                    href={RESUME}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-4 text-h3 text-text"
                  >
                    <span className="label text-faint">
                      {String(menu.length + 1).padStart(2, "0")}
                    </span>
                    {t(ui.actions.resume, locale)}
                  </a>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
