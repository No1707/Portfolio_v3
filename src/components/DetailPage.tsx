import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { absolute } from "@/lib/site-url";
import { ui } from "@/content/ui";
import { fullName } from "@/content/site";
import { pageById, pageHref, pagePaths, type DetailPage as Page } from "@/content/pages";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Contact } from "./Contact";
import { Reveal } from "./Reveal";
import { TechChips } from "./TechChips";
import { PageCard } from "./PageCard";
import { ExpertiseVisual } from "./ExpertiseVisual";
import { buildMenu, menuSectionOf } from "@/content/nav";

function parentCrumb(page: Page, locale: Locale) {
  if (page.kind === "service") {
    return { name: t(ui.sections.services, locale), href: `/${locale}#services` };
  }
  return null;
}

function jsonLd(page: Page, locale: Locale) {
  const url = absolute(pageHref(page, locale));
  const person = { "@type": "Person", name: fullName, url: absolute(`/${locale}`) };
  const parent = parentCrumb(page, locale);
  const crumbs = [
    { name: t(ui.detail.home, locale), item: absolute(`/${locale}`) },
    ...(parent ? [{ name: parent.name, item: absolute(parent.href) }] : []),
    { name: t(page.name, locale), item: url },
  ];

  const main = {
    "@type": "Service",
    name: t(page.title, locale),
    serviceType: t(page.name, locale),
    description: t(page.description, locale),
    url,
    provider: person,
    areaServed: { "@type": "City", name: "Paris" },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      main,
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      },
    ],
  };
}

export function DetailPage({ page, locale }: { page: Page; locale: Locale }) {
  const parent = parentCrumb(page, locale);
  const visual = page.id === "react" || page.id === "vue" ? page.id : null;
  const kicker = t(ui.detail[page.kind], locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(page, locale)).replace(/</g, "\\u003c"),
        }}
      />

      <Header
        locale={locale}
        menu={buildMenu(locale)}
        home={false}
        paths={pagePaths(page)}
        section={menuSectionOf[page.kind]}
        currentHref={pageHref(page, locale)}
      />

      <main id="main">
        <section className="relative isolate overflow-hidden border-b border-line pt-16">
          <div aria-hidden className="grid-backdrop absolute inset-0 -z-10" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full blur-[120px] sm:left-[22%]"
            style={{ background: "var(--accent-glow)" }}
          />

          <div className="mx-auto max-w-6xl px-5 pt-14 pb-20 sm:px-8 sm:pt-20 sm:pb-24">
            <nav aria-label={t(ui.detail.breadcrumb, locale)}>
              <ol className="label flex flex-wrap items-center gap-2 text-faint">
                <li>
                  <Link href={`/${locale}`} className="transition-colors duration-200 hover:text-accent">
                    {t(ui.detail.home, locale)}
                  </Link>
                </li>
                {parent && (
                  <li className="flex items-center gap-2">
                    <span aria-hidden>/</span>
                    <Link href={parent.href} className="transition-colors duration-200 hover:text-accent">
                      {parent.name}
                    </Link>
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  <span aria-current="page" className="text-muted">
                    {t(page.name, locale)}
                  </span>
                </li>
              </ol>
            </nav>

            <div
              className={
                visual
                  ? "lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center lg:gap-16"
                  : undefined
              }
            >
              <div>
                <p className="label mt-12 text-accent">{kicker}</p>
                <h1 className="mt-5 max-w-4xl text-h1 font-semibold text-balance">
                  {t(page.title, locale)}
                </h1>
                <p className="mt-8 max-w-2xl text-lead text-muted">{t(page.lead, locale)}</p>

                {page.tech && (
                  <div className="mt-12">
                    <TechChips items={page.tech} />
                  </div>
                )}
              </div>

              {visual && (
                <div className="mt-12 hidden size-80 lg:block">
                  <ExpertiseVisual variant={visual} />
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-3xl space-y-16 sm:space-y-20">
            {page.sections.map((section, index) => (
              <Reveal key={index}>
                <section>
                  <h2 className="text-h2 font-semibold">{t(section.title, locale)}</h2>
                  {section.paragraphs?.map((paragraph, key) => (
                    <p key={key} className="mt-5 text-lead text-muted">
                      {t(paragraph, locale)}
                    </p>
                  ))}
                  {section.items && (
                    <ul className="mt-6 space-y-3.5">
                      {section.items.map((item, key) => (
                        <li key={key} className="flex gap-4 text-lead text-muted">
                          <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-accent" />
                          {t(item, locale)}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>
        </div>

        <section aria-labelledby="related-title">
          <div className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
            <Reveal>
              <div className="flex items-center gap-4">
                <h2 id="related-title" className="text-h2 font-semibold">
                  {t(ui.detail.related, locale)}
                </h2>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>
            </Reveal>
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {page.related.map((id, index) => {
                const related = pageById(id);
                return (
                  <li key={id}>
                    <Reveal delay={index * 70} className="h-full">
                      <PageCard page={related} locale={locale} label={t(ui.detail[related.kind], locale)} />
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
