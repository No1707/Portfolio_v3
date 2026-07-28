"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { profile } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LangToggle";

const SECTIONS = ["about", "experience", "projects", "stack", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

const SPY_OFFSET = 96;

export function Header({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<SectionId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

      let current: SectionId | null = null;
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
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
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
          <a
            href="#top"
            className="label flex items-center gap-2 text-text"
            aria-label={profile.name}
          >
            <span
              aria-hidden
              className="inline-block size-1.5 rounded-full bg-accent"
            />
            {profile.name}
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {SECTIONS.map((id) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`label relative rounded-full px-3 py-2 transition-colors duration-200 ${
                        isActive ? "text-text" : "text-faint hover:text-muted"
                      }`}
                    >
                      {t(ui.nav[id], locale)}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle locale={locale} />
            <ThemeToggle locale={locale} />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t(ui.actions.openMenu, locale)}
              aria-expanded={menuOpen}
              className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-line-strong hover:text-text md:hidden"
            >
              <List size={17} weight="bold" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-xl md:hidden"
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

            <nav aria-label="Primary" className="px-5 pt-6">
              <ul className="flex flex-col gap-1">
                {SECTIONS.map((id, index) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index + 0.05, duration: 0.3, ease: "easeOut" }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-4 border-b border-line py-4 text-h3 text-text"
                    >
                      <span className="label text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {t(ui.nav[id], locale)}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
