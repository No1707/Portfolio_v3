"use client";

import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { profile } from "@/content/site";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="label text-faint">
          © {year} {profile.name} · {t(ui.footer.rights, locale)}
        </p>
        <p className="label text-faint">{t(ui.footer.builtWith, locale)}</p>
      </div>
    </footer>
  );
}
