import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { profile } from "@/content/site";
import { expertise, pageHref, services } from "@/content/pages";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const groups = [
    { label: t(ui.sections.services, locale), pages: services },
    { label: t(ui.sections.expertise, locale), pages: expertise },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-10 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          {groups.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <p className="label text-faint">{group.label}</p>
              <ul className="mt-5 space-y-3">
                {group.pages.map((page) => (
                  <li key={page.id}>
                    <Link
                      href={pageHref(page, locale)}
                      className="text-sm text-muted transition-colors duration-200 hover:text-accent"
                    >
                      {t(page.name, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-faint">
            © {year} {profile.name} · {t(ui.footer.rights, locale)}
          </p>
          <p className="label text-faint">{t(ui.footer.builtWith, locale)}</p>
        </div>
      </div>
    </footer>
  );
}
