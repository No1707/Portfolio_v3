import type { I18nString } from "@/lib/i18n";

/* ===============================================================
   ALL SITE CONTENT LIVES HERE.
   Every string is `{ en: "...", fr: "..." }`.
   Anything marked TODO is still waiting on real content.
   =============================================================== */

export type TechKey =
  // languages & core
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "node"
  // frameworks & libraries
  | "react"
  | "nextjs"
  | "vue"
  | "nuxt"
  | "angular"
  | "pinia"
  | "vuetify"
  | "threejs"
  | "motion"
  | "i18next"
  | "zod"
  // styling & UI
  | "tailwind"
  | "sass"
  | "bootstrap"
  | "shadcn"
  | "styledcomponents"
  | "figma"
  | "webflow"
  | "wordpress"
  | "shopify"
  // tooling & platforms
  | "git"
  | "github"
  | "gitlab"
  | "webstorm"
  | "vite"
  | "eslint"
  | "cypress"
  | "docker"
  | "supabase"
  | "sanity"
  | "firebase"
  | "vercel"
  | "notion";

export interface Profile {
  name: string;
  role: I18nString;
  email: string;
  /** The big hero statement: `accent` is the highlighted half. */
  headline: { lead: I18nString; accent: I18nString };
  /** Short line under the hero headline. */
  tagline: I18nString;
  available: boolean;
  availability: I18nString;
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
    lead: { en: "I turn ideas into", fr: "Je transforme des idées en" },
    accent: { en: "functional interfaces.", fr: "interfaces fonctionnelles." },
  },
  tagline: {
    en: "Seven years turning designs into fast, accessible, carefully-built web interfaces.",
    fr: "Sept ans à transformer des maquettes en interfaces web rapides, accessibles et soignées.",
  },
  available: true,
  availability: {
    en: "Open to new opportunities",
    fr: "Ouvert aux opportunités",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/No1707", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nolan-boisel/", icon: "linkedin" },
    { label: "Email", href: "mailto:nolanwebpro@gmail.com", icon: "mail" },
  ],
};

/* --------------------------------------------------------------- About */

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
      en: "Staying somewhere that long taught me things a series of short projects never could: how a codebase ages, why a component written in a hurry costs you six months later, and how much a team gains from conventions everyone actually agrees on.",
      fr: "Rester aussi longtemps au même endroit m'a appris ce qu'une série de projets courts n'enseigne pas : comment une base de code vieillit, pourquoi un composant écrit dans l'urgence se paie six mois plus tard, et tout ce qu'une équipe gagne à se mettre d'accord sur des conventions.",
    },
    {
      en: "What interests me is code that holds up over time: reusable components, strict typing, performance that's measured rather than assumed, and a codebase a colleague can pick up without a manual.",
      fr: "Ce qui m'intéresse, c'est le code qui tient dans le temps : des composants réutilisables, un typage strict, des performances mesurées plutôt que supposées, et une base de code qu'un collègue peut reprendre sans mode d'emploi.",
    },
  ] satisfies I18nString[],
  stats: [
    {
      value: "7",
      label: { en: "Years in front-end", fr: "Ans de front-end" },
    },
    {
      value: "4",
      label: { en: "Years in the same team", fr: "Ans dans la même équipe" },
    },
  ] satisfies { value: string; label: I18nString }[],
};

/* ---------------------------------------------------------- Experience */

export interface ExperienceEntry {
  period: I18nString;
  role: I18nString;
  organisation: string;
  /** "Full-time", "Work-study", "Degree"… */
  kind: I18nString;
  description: I18nString;
  tech: TechKey[];
}

export const experience: ExperienceEntry[] = [
  {
    period: { en: "2022 — Present", fr: "2022 — Aujourd'hui" },
    role: { en: "Front-end Developer", fr: "Développeur front-end" },
    organisation: "Codoc",
    kind: { en: "Full-time", fr: "CDI" },
    description: {
      en: "Within a product & tech team, I spent four years working on a medical application used by doctors and researchers from around twenty partner health institutions. The goal: analysing data to help diagnose rare diseases. I built new features, improved and maintained the codebase, and took part in modernising the application — notably by leading the migration from Vue.js 2 to Vue.js 3 and the evolution of the design system. I also contributed to technical decisions, to improving development practices, and to mentoring interns.",
      fr: "Au sein d'une équipe produit & tech, j'ai participé pendant quatre ans au développement d'une application médicale utilisée par des médecins et des chercheurs issus d'une vingtaine d'établissements de santé partenaires. L'objectif : analyser des données afin de contribuer au diagnostic de maladies rares. J'ai développé de nouvelles fonctionnalités, amélioré et maintenu le code, et participé à la modernisation de l'application — notamment en menant la migration de Vue.js 2 vers Vue.js 3 et l'évolution du design system. J'ai également contribué aux choix techniques, à l'amélioration des pratiques de développement et à l'encadrement de stagiaires.",
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
    period: { en: "2021 — 2022", fr: "2021 — 2022" },
    role: { en: "Front-end Developer", fr: "Développeur front-end" },
    organisation: "Kawalearn",
    kind: { en: "Work-study", fr: "Alternance" },
    description: {
      en: "A year inside an e-learning company. I started by building their remote-course interfaces, then went on to improve their WordPress site and to create and maintain their Shopify store.",
      fr: "Une année au sein d'une entreprise d'e-learning. J'ai commencé par intégrer leurs interfaces de cours à distance, pour ensuite améliorer leur site WordPress et créer puis maintenir leur site e-commerce Shopify.",
    },
    tech: ["html", "css", "javascript", "sass", "git", "wordpress", "shopify"],
  },
  {
    period: { en: "2019 — 2022", fr: "2019 — 2022" },
    role: { en: "Web Development Degree", fr: "Formation développement web" },
    organisation: "École Multimédia",
    kind: { en: "Three-year degree", fr: "Bac +3" },
    description: {
      en: "Three years covering web fundamentals, with a focus on front-end and project management — the final year spent in work-study.",
      fr: "Trois années couvrant les fondamentaux du web, focus sur le front-end et la conduite de projet — la dernière année passée en alternance.",
    },
    tech: ["html", "css", "javascript", "threejs", "react", "git", "bootstrap"],
  },
];

/* ------------------------------------------------------------ Projects */

export interface Project {
  title: string;
  /** One-line "what is it". */
  summary: I18nString;
  description: I18nString;
  year: string;
  tech: TechKey[];
  /** Live URL only — no repositories are linked from this site. */
  links: { live?: string };
}

export const projects: Project[] = [
  {
    title: "TheVirtuose",
    summary: { en: "Studio website", fr: "Site de studio" },
    description: {
      en: "A showcase site for a video editing studio.",
      fr: "Une vitrine pour un studio de montage vidéo.",
    },
    year: "2026",
    tech: ["nextjs", "typescript", "sanity", "motion", "styledcomponents", "vercel"],
    links: {}, // TODO: live URL once deployed
  },
  {
    title: "FitForge",
    summary: { en: "Training app", fr: "Application de training" },
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
    summary: { en: "Company website", fr: "Site d'entreprise" },
    description: {
      en: "The company's public website.",
      fr: "Le site public de l'entreprise.",
    },
    year: "2025",
    tech: ["webflow", "html", "css", "javascript"],
    links: { live: "https://codoc.co" },
  },
  {
    title: "Crypto Dashboard",
    summary: { en: "Market dashboard", fr: "Dashboard de marché" },
    description: {
      en: "A cryptocurrency dashboard tracking prices and market movement.",
      fr: "Un dashboard de cryptomonnaies suivant les cours et les mouvements du marché.",
    },
    year: "2022",
    tech: ["vue", "tailwind", "javascript"],
    links: { live: "https://crypto-dashboard-nine-xi.vercel.app/" },
  },
  {
    title: "MacroNutrients",
    summary: { en: "Nutrition calculator", fr: "Calculateur nutritionnel" },
    description: {
      en: "A calculator that works out daily macronutrient needs from a few personal inputs.",
      fr: "Un calculateur qui détermine les besoins quotidiens en macronutriments à partir de quelques données personnelles.",
    },
    year: "2022",
    tech: ["angular", "typescript", "html", "css"],
    links: {}, // TODO: live URL once deployed
  },
  {
    title: "Lab — The Strokes",
    summary: { en: "School project", fr: "Projet d'école" },
    description: {
      en: "My final school project: a band tribute site written in plain HTML, CSS and JavaScript.",
      fr: "Mon dernier projet d'école : un site hommage à un groupe, écrit en HTML, CSS et JavaScript purs.",
    },
    year: "2021",
    tech: ["html", "css", "javascript"],
    links: { live: "https://lab-the-strokes.vercel.app/index.html" },
  },
];

/* -------------------------------------------------------- Technologies */

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
    items: ["react", "nextjs", "vue", "nuxt", "angular", "pinia", "motion", "i18next"],
  },
  {
    label: { en: "Styling & UI", fr: "Styles & UI" },
    items: ["tailwind", "sass", "bootstrap", "shadcn", "figma", "webflow"],
  },
  {
    label: { en: "Tooling & platforms", fr: "Outils & plateformes" },
    items: [
      "git",
      "github",
      "gitlab",
      "webstorm",
      "vite",
      "eslint",
      "cypress",
      "docker",
      "supabase",
      "sanity",
      "firebase",
      "vercel",
    ],
  },
];
