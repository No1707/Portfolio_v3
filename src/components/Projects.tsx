"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { projects } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { TechChips } from "./TechChips";

export function Projects({ locale }: { locale: Locale }) {
  return (
    <Section id="projects" index="03" title={t(ui.sections.projects, locale)}>
      <ul className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => {
          const primaryHref = project.links.live;

          return (
            <li key={project.title}>
              <Reveal delay={(index % 2) * 70 + Math.floor(index / 2) * 60}>
                <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="label tnum text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="label tnum text-faint">{project.year}</span>
                  </div>

                  <h3 className="mt-5 text-h3 font-medium">
                    {primaryHref ? (
                      <a
                        href={primaryHref}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-start gap-1.5 transition-colors duration-200 hover:text-accent"
                      >
                        {project.title}
                        <ArrowUpRight
                          size={17}
                          weight="bold"
                          aria-hidden
                          className="mt-1 shrink-0 text-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                        />
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>

                  <p className="label mt-2 text-faint">{t(project.summary, locale)}</p>

                  <p className="mt-4 flex-1 text-muted">{t(project.description, locale)}</p>

                  <div className="mt-6">
                    <TechChips items={project.tech} />
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
