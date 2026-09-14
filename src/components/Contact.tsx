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

      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="label text-faint">{t(ui.sections.contact, locale)}</span>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 id="contact-title" className="mt-10 max-w-3xl text-display font-semibold text-balance">
            {t(ui.contact.headline, locale)}
            <span className="text-accent">.</span>
          </h2>
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
    </section>
  );
}
