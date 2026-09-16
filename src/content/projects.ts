import type { I18nString } from "@/lib/i18n";
import type { TechKey } from "./site";

export interface Project {
  id: string;
  name: string;
  category: I18nString;
  summary: I18nString;
  tech: TechKey[];
  year: string;
  live: string;
  image: string;
  handle: string;
}

export const projects: Project[] = [
  {
    id: "the-virtuose",
    name: "The Virtuose",
    category: { en: "Website", fr: "Site web" },
    summary: {
      en: "A showcase site for a video editing studio.",
      fr: "Une vitrine pour un studio de montage vidéo.",
    },
    tech: ["nextjs", "react", "typescript", "sanity", "motion", "styledcomponents"],
    year: "2026",
    live: "https://the-virtuose-rho.vercel.app/en",
    image: "/projects/the-virtuose.webp",
    handle: "the-virtuose",
  },
  {
    id: "fitforge",
    name: "FitForge",
    category: { en: "Web app", fr: "Application web" },
    summary: {
      en: "A sports app with AI-assisted workout generation.",
      fr: "Une application de sport avec génération de workouts assistée par IA.",
    },
    tech: ["nuxt", "vue", "typescript", "tailwind", "supabase", "zod"],
    year: "2026",
    live: "https://fit-forge-five.vercel.app/",
    image: "/projects/fitforge.webp",
    handle: "fit-forge",
  },
  {
    id: "codoc",
    name: "Codoc",
    category: { en: "Website", fr: "Site web" },
    summary: {
      en: "Codoc's public website.",
      fr: "Le site public de Codoc.",
    },
    tech: ["webflow", "html", "css", "javascript"],
    year: "2025",
    live: "https://codoc.co",
    image: "/projects/codoc.webp",
    handle: "codoc",
  },
];
