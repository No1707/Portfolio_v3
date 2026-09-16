import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { projects } from "@/content/projects";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { TechChips } from "./TechChips";
import { BrowserFrame } from "./BrowserFrame";

export function Projects({ locale }: { locale: Locale }) {
  return (
    <Section id="projects" title={t(ui.sections.projects, locale)}>
      <ol className="border-t border-line">
        {projects.map((project, index) => {
          const flipped = index % 2 === 1;

          return (
            <li key={project.id} className="border-b border-line">
              <Reveal delay={index * 80}>
                <article className="group relative">
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  />

                  <div className="grid items-center gap-8 py-10 transition-colors duration-300 group-hover:bg-surface/50 sm:py-12 md:px-5 lg:grid-cols-2 lg:gap-14 lg:px-8">
                    <div className={flipped ? "lg:order-2" : undefined}>
                      <p className="label flex items-center gap-3 text-faint">
                        <span>{t(project.category, locale)}</span>
                        <span aria-hidden>·</span>
                        <span className="tnum">{project.year}</span>
                      </p>

                      <h3 className="mt-5 text-h2 font-semibold">
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="after:absolute after:inset-0"
                        >
                          {project.name}
                        </a>
                      </h3>

                      <p className="mt-4 max-w-md text-lead text-muted">
                        {t(project.summary, locale)}
                      </p>

                      <div className="relative z-10 mt-6">
                        <TechChips items={project.tech} />
                      </div>

                      <span
                        aria-hidden
                        className="label mt-8 inline-flex items-center gap-2 text-faint transition-colors duration-200 group-hover:text-accent"
                      >
                        {t(ui.projectCard.visit, locale)}
                        <ArrowUpRight
                          size={12}
                          weight="bold"
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>

                    <div className={`pointer-events-none ${flipped ? "lg:order-1" : ""}`}>
                      <BrowserFrame
                        src={project.image}
                        alt={`${t(ui.projectCard.screenshot, locale)} ${project.name}`}
                        label={project.handle}
                        sizes="(min-width: 1024px) 34rem, (min-width: 640px) 90vw, 100vw"
                        className="transition-colors duration-300 group-hover:border-line-strong"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
