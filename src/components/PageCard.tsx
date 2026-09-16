import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { pageHref, type DetailPage } from "@/content/pages";

export function PageCard({
  page,
  locale,
  label,
}: {
  page: DetailPage;
  locale: Locale;
  label: string;
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface sm:p-7">
      <span className="label tnum text-accent">{label}</span>
      <h3 className="mt-5 text-h3 font-medium">
        <Link
          href={pageHref(page, locale)}
          className="after:absolute after:inset-0 after:rounded-2xl"
        >
          {t(page.name, locale)}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-muted">{t(page.summary, locale)}</p>
      <span
        aria-hidden
        className="label mt-6 inline-flex items-center gap-2 text-faint transition-colors duration-200 group-hover:text-accent"
      >
        {t(ui.services.more, locale)}
        <ArrowRight
          size={12}
          weight="bold"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </article>
  );
}
