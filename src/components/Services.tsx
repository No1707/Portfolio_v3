import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { pageHref, services } from "@/content/pages";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ServicesCarousel } from "./ServicesCarousel";

export function Services({ locale }: { locale: Locale }) {
  const slides = services.map((page) => ({
    id: page.id,
    href: pageHref(page, locale),
    name: t(page.name, locale),
    summary: t(page.summary, locale),
  }));

  return (
    <Section id="services" title={t(ui.sections.services, locale)}>
      <Reveal>
        <ServicesCarousel slides={slides} locale={locale} />
      </Reveal>
    </Section>
  );
}
