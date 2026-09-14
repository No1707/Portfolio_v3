import type { I18nString } from "@/lib/i18n";

export type TechKey =
  // Languages
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "node"
  // Frameworks
  | "react"
  | "nextjs"
  | "vue"
  | "nuxt"
  | "angular"
  | "vuetify"
  | "threejs"
  | "motion"
  | "zod"
  // Styling
  | "tailwind"
  | "sass"
  | "bootstrap"
  | "shadcn"
  | "styledcomponents"
  | "figma"
  | "webflow"
  | "wordpress"
  | "shopify"
  // Tooling
  | "git"
  | "gitlab"
  | "vite"
  | "cypress"
  | "docker"
  | "supabase"
  | "sanity"
  | "vercel"
  | "notion";

export interface Profile {
  name: string;
  role: I18nString;
  email: string;
  headline: { lead: I18nString; accent: I18nString };
  tagline: I18nString;
  socials: { label: string; href: string; icon: "github" | "linkedin" | "mail" }[];
}

export const profile: Profile = {
  name: "Nolan",
  role: {
    en: "Front-end developer",
    fr: "Développeur front-end",
  },
  email: "nolanwebpro@gmail.com",
  headline: {
    lead: { en: "Turning your ideas into", fr: "Transformer vos idées en" },
    accent: { en: "functional interfaces.", fr: "interfaces fonctionnelles." },
  },
  tagline: {
    en: "Seven years turning designs into fast, accessible, carefully-built web interfaces.",
    fr: "Sept ans à transformer des maquettes en interfaces web rapides, accessibles et soignées.",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/No1707", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nolan-boisel/", icon: "linkedin" },
    { label: "Email", href: "mailto:nolanwebpro@gmail.com", icon: "mail" },
  ],
};

/* About */

export const about = {
  intro: {
    en: "Hi, I'm Nolan.",
    fr: "Bonjour, je suis Nolan.",
  } satisfies I18nString,
  paragraphs: [
    {
      en: "I'm a French front-end web developer with seven years of experience, four of them building and maintaining production interfaces inside the same company.",
      fr: "Je suis un développeur web front-end français avec sept ans d'expérience, dont quatre à construire et faire vivre des interfaces en production au sein de la même entreprise.",
    },
    {
      en: "Staying somewhere that long taught me things a series of short projects never could: the weight of the details that separate a good product from an exceptional one, how code written in a hurry costs you six months later, and how much a team gains from clear communication.",
      fr: "Rester aussi longtemps au même endroit m'a appris ce qu'une série de projets courts n'enseigne pas : l'importance des détails qui séparent un bon produit d'un produit exceptionnel, comment du code écrit dans l'urgence se paie six mois plus tard, et tout ce qu'une équipe gagne avec une communication claire.",
    },
    {
      en: "I'm interested in modern, reliable, pixel-perfect user interfaces. Reusable code that holds up over time. And also MMORPGs, tennis and motorcycles.",
      fr: "Je m'intéresse aux interfaces utilisateur modernes, fiables, pixel-perfect. Au code réutilisable et qui tient dans le temps. Et aussi aux MMORPG, au tennis et à la moto.",
    },
  ] satisfies I18nString[],
};

/* Experience */

export interface EntryPointer {
  target: string;
  phrase: I18nString;
  label: I18nString;
}

export interface ExperienceEntry {
  period: I18nString;
  role: I18nString;
  organisation: string;
  kind: I18nString;
  description: I18nString;
  tech: TechKey[];
  pointsTo?: EntryPointer;
}

export const experience: ExperienceEntry[] = [
  {
    period: { en: "2022 — Present", fr: "2022 — Aujourd'hui" },
    role: { en: "Front-end Developer", fr: "Développeur front-end" },
    organisation: "Codoc",
    kind: { en: "Full-time", fr: "CDI" },
    description: {
      en: "Within a product & tech team, I spent four years working on a medical application used by doctors and researchers from around twenty partner health institutions. The goal is the analysis of patient data to help diagnose rare diseases. There, I built new features, improved and maintained the codebase, modernised the application by moving it from an old version of its technology to the latest one, and evolved the design system. I also had the opportunity to contribute to technical decisions, to improving development practices, and to mentoring interns.",
      fr: "Au sein d'une équipe produit & tech, j'ai participé pendant quatre ans au développement d'une application médicale utilisée par des médecins et des chercheurs issus d'une vingtaine d'établissements de santé partenaires. L'objectif est l'analyse de données patients afin de contribuer au diagnostic de maladies rares. J'y ai développé de nouvelles fonctionnalités, amélioré et maintenu le code, modernisé l'application en la faisant passer d'une ancienne version de sa technologie à la plus récente et fait évoluer le design system. J'ai également eu l'occasion de contribuer aux choix techniques, à l'amélioration des pratiques de développement et à l'encadrement de stagiaires.",
    },
    tech: [
      "vue",
      "typescript",
      "shadcn",
      "tailwind",
      "vuetify",
      "gitlab",
      "cypress",
      "docker",
      "figma",
      "notion",
    ],
  },
  {
    period: { en: "2020 — 2021", fr: "2020 — 2021" },
    role: { en: "Front-end Developer", fr: "Développeur front-end" },
    organisation: "Kawalearn",
    kind: { en: "Work-study", fr: "Alternance" },
    description: {
      en: "A year inside an e-learning company. I started by building their remote-course interfaces, then went on to improve their WordPress site and to create and maintain their Shopify store.",
      fr: "Une année au sein d'une entreprise d'e-learning. J'ai commencé par intégrer leurs interfaces de cours à distance, pour ensuite améliorer leur site WordPress puis créer et maintenir leur site e-commerce Shopify.",
    },
    tech: ["html", "css", "javascript", "sass", "git", "wordpress", "shopify"],
  },
  {
    period: { en: "2018 — 2021", fr: "2018 — 2021" },
    role: { en: "Web Development Degree", fr: "Formation développement web" },
    organisation: "École Multimédia",
    kind: { en: "Degree", fr: "Diplôme" },
    description: {
      en: "Three years covering web fundamentals, with a focus on front-end and project management — the final year spent in work-study.",
      fr: "Trois années couvrant les fondamentaux du web, focus sur le front-end et la conduite de projet — la dernière année passée en alternance.",
    },
    tech: ["html", "css", "javascript", "threejs", "react", "git", "bootstrap"],
    pointsTo: {
      target: "Kawalearn",
      phrase: { en: "in work-study", fr: "en alternance" },
      label: {
        en: "Highlight the work-study year at Kawalearn, above",
        fr: "Mettre en évidence l'alternance chez Kawalearn, ci-dessus",
      },
    },
  },
];

/* Projects */

export interface Project {
  title: string;
  summary: I18nString;
  description: I18nString;
  year: string;
  tech: TechKey[];
  links: { live?: string };
}

export const projects: Project[] = [
  {
    title: "TheVirtuose",
    summary: { en: "Website", fr: "Site web" },
    description: {
      en: "A showcase site for a video editing studio.",
      fr: "Une vitrine pour un studio de montage vidéo.",
    },
    year: "2026",
    tech: ["nextjs", "typescript", "sanity", "motion", "styledcomponents", "vercel"],
    links: { live: "https://the-virtuose-rho.vercel.app/en" },
  },
  {
    title: "FitForge",
    summary: { en: "Web app", fr: "Application web" },
    description: {
      en: "A training app with AI-assisted workout program generation.",
      fr: "Une application de training avec génération de programmes de sport assistée par IA.",
    },
    year: "2026",
    tech: ["nuxt", "vue", "typescript", "tailwind", "supabase", "zod"],
    links: { live: "https://fit-forge-five.vercel.app/" },
  },
  {
    title: "Codoc",
    summary: { en: "Website", fr: "Site web" },
    description: {
      en: "My company's public website.",
      fr: "Le site public de mon entreprise.",
    },
    year: "2025",
    tech: ["webflow", "html", "css", "javascript"],
    links: { live: "https://codoc.co" },
  },
  {
    title: "Crypto Dashboard",
    summary: { en: "Web app", fr: "Application web" },
    description: {
      en: "A cryptocurrency dashboard tracking prices and market movement.",
      fr: "Un dashboard de cryptomonnaies suivant les cours et les mouvements du marché.",
    },
    year: "2022",
    tech: ["vue", "tailwind", "javascript"],
    links: { live: "https://crypto-dashboard-two-lovat.vercel.app/" },
  },
  {
    title: "MacroNutrients",
    summary: { en: "Web app", fr: "Application web" },
    description: {
      en: "A calculator that works out daily macronutrient needs from a few personal inputs.",
      fr: "Un calculateur qui détermine les besoins quotidiens en macronutriments à partir de quelques données personnelles.",
    },
    year: "2022",
    tech: ["angular", "typescript", "html", "css"],
    links: { live: "https://macronutrients-needs.vercel.app/" },
  },
  {
    title: "Lab — The Strokes",
    summary: { en: "Website", fr: "Site web" },
    description: {
      en: "My final school project: a band tribute site written in plain HTML, CSS and JavaScript.",
      fr: "Mon dernier projet d'école : un site hommage à un groupe, écrit en HTML, CSS et JavaScript purs.",
    },
    year: "2021",
    tech: ["html", "css", "javascript"],
    links: { live: "https://lab-the-strokes.vercel.app/index.html" },
  },
];

/* Technologies */

export interface TechGroup {
  label: I18nString;
  items: TechKey[];
}

export const techGroups: TechGroup[] = [
  {
    label: { en: "Languages & core", fr: "Langages & bases" },
    items: ["html", "css", "javascript", "typescript", "node"],
  },
  {
    label: { en: "Frameworks & libraries", fr: "Frameworks & librairies" },
    items: ["react", "nextjs", "vue", "nuxt", "motion"],
  },
  {
    label: { en: "Styling & UI", fr: "Styles & UI" },
    items: ["tailwind", "sass", "shadcn", "vuetify", "styledcomponents"],
  },
  {
    label: { en: "Tooling & platforms", fr: "Outils & plateformes" },
    items: ["git", "vite", "cypress", "supabase", "sanity", "vercel", "webflow"],
  },
];
