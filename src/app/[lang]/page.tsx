import { notFound } from "next/navigation";
import { isLocale, t } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { TechMarquee } from "@/components/TechMarquee";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <a
        href="#main"
        className="label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-3 focus:text-accent-contrast"
      >
        {t(ui.actions.skipToContent, lang)}
      </a>

      <Header locale={lang} />

      <main id="main">
        <Hero locale={lang} />
        <About locale={lang} />
        <Experience locale={lang} />
        <Projects locale={lang} />
        <TechMarquee locale={lang} />
        <Contact locale={lang} />
      </main>

      <Footer locale={lang} />
    </>
  );
}
