"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";

export function ThemeToggle({ locale }: { locale: Locale }) {
  const { resolvedTheme, setTheme } = useTheme();
  const label = t(ui.actions.toggleTheme, locale);

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-line-strong hover:text-text"
    >
      <Sun size={17} weight="bold" aria-hidden className="hidden dark:block" />
      <Moon size={17} weight="bold" aria-hidden className="block dark:hidden" />
    </button>
  );
}
