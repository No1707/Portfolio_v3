import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";
import { ContactDialog } from "./ContactDialog";
import { CopyEmail } from "./CopyEmail";

export function Contact({ locale }: { locale: Locale }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 left-1/2 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-[110px]"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="mx-auto max-w-6xl px-5 py-15 sm:px-8 sm:py-22.5">
        <Reveal>
          <div className="flex items-center gap-4">
            <h2 id="contact-title" className="text-h2 font-semibold">
              {t(ui.sections.contact, locale)}
            </h2>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16">
          <Reveal delay={80}>
            <p className="max-w-3xl text-display font-semibold text-balance">
              {t(ui.contact.headline, locale)}
              <span className="text-accent">.</span>
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
              <ContactDialog locale={locale} />
              <CopyEmail locale={locale} />
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10">
              <SocialLinks size={20} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
