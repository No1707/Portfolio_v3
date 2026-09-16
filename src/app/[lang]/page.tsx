import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { absolute } from "@/lib/site-url";
import { ui } from "@/content/ui";
import { buildMenu } from "@/content/nav";
import { experience, fullName, profile } from "@/content/site";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { TechMarquee } from "@/components/TechMarquee";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    givenName: profile.name,
    familyName: profile.lastName,
    jobTitle: t(profile.role, locale),
    knowsAbout: profile.expertise,
    description: t(profile.tagline, locale),
    email: `mailto:${profile.email}`,
    url: absolute(`/${locale}`),
    image: absolute("/nolan.jpg"),
    knowsLanguage: ["fr", "en"],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: experience[experience.length - 1].organisation,
    },
    sameAs: profile.socials
      .filter((social) => social.icon !== "mail")
      .map((social) => social.href),
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd(lang)).replace(/</g, "\\u003c"),
        }}
      />

      <a
        href="#main"
        className="label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-3 focus:text-accent-contrast"
      >
        {t(ui.actions.skipToContent, lang)}
      </a>

      <Header locale={lang} menu={buildMenu(lang)} />

      <main id="main">
        <Hero locale={lang} />
        <About locale={lang} />
        <Services locale={lang} />
        <Projects locale={lang} />
        <TechMarquee locale={lang} />
        <Contact locale={lang} />
      </main>

      <Footer locale={lang} />
    </>
  );
}
