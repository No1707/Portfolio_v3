import Image from "next/image";
import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { about } from "@/content/site";
import { expertise, pageHref } from "@/content/pages";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function About({ locale }: { locale: Locale }) {
  return (
    <Section id="about" title={t(ui.sections.about, locale)}>
      <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-20">
        <Reveal>
          <div className="relative aspect-square w-40 overflow-hidden rounded-2xl border border-line bg-surface/40 sm:w-44">
            <Image
              src="/nolan.jpg"
              alt={t(ui.about.portraitAlt, locale)}
              fill
              sizes="(min-width: 640px) 11rem, 10rem"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="max-w-2xl">
          <Reveal>
            <p className="text-h3 font-medium">{t(about.intro, locale)}</p>
          </Reveal>

          <div className="mt-6 space-y-5 text-lead text-muted">
            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={index} as="p" delay={60 + index * 70}>
                {t(paragraph, locale)}
              </Reveal>
            ))}
          </div>

          <Reveal delay={60 + about.paragraphs.length * 70}>
            <div className="mt-10">
              <p className="label text-accent">{t(ui.sections.expertise, locale)}</p>
              <ul className="mt-5 flex flex-col gap-6 sm:flex-row sm:gap-14">
                {expertise.map((page) => {
                  const name = t(page.name, locale);
                  const keyword = page.keyword ?? name;
                  const [before = "", after = ""] = name.split(keyword);

                  return (
                    <li key={page.id}>
                      <Link
                        href={pageHref(page, locale)}
                        className="flex cursor-default flex-wrap items-baseline gap-x-1.5"
                      >
                        <span className="label order-1 text-faint">{before.trim()}</span>{" "}
                        <span className="order-3 mt-2 basis-full text-h2 font-semibold">
                          {keyword}
                        </span>{" "}
                        <span className="label order-2 text-faint">{after.trim()}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
