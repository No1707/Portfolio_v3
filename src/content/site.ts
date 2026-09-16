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
  lastName: string;
  expertise: string[];
  role: I18nString;
  location: I18nString;
  email: string;
  tagline: I18nString;
  socials: { label: string; href: string; icon: "github" | "linkedin" | "mail" }[];
}

export const profile: Profile = {
  name: "Nolan",
  lastName: "Boisel",
  expertise: [
    "React",
    "Next.js",
    "Vue.js",
    "Nuxt",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
  ],
  role: {
    en: "Freelance web developer",
    fr: "Développeur web freelance",
  },
  location: {
    en: "based in Paris",
    fr: "basé à Paris",
  },
  email: "nolanwebpro@gmail.com",
  tagline: {
    en: "Freelance web developer in Paris specialising in Vue.js and React. Seven years building fast, pixel-perfect custom websites and web apps.",
    fr: "Développeur web freelance à Paris, spécialisé en Vue.js et React. Sept ans d'expérience à créer des sites et applications web sur mesure, rapides et pixel-perfect.",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/No1707", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nolan-boisel/", icon: "linkedin" },
    { label: "Email", href: "mailto:nolanwebpro@gmail.com", icon: "mail" },
  ],
};

export const fullName = `${profile.name} ${profile.lastName}`;

/* About */

export const about = {
  intro: {
    en: "Hi, I'm Nolan.",
    fr: "Bonjour, je suis Nolan.",
  } satisfies I18nString,
  paragraphs: [
    {
      en: "As a freelance web developer in Paris, I help companies, agencies and individuals build and evolve their web interfaces.",
      fr: "Développeur web freelance à Paris, j'accompagne les entreprises, les agences et les particuliers dans la création et l'évolution de leurs interfaces web.",
    },
    {
      en: "Over seven years of development, four of them on a medical application in production, I've learned to build polished interfaces and code that stays easy to evolve. I pay as much attention to visual details as to reliability and clear communication with the team.",
      fr: "En sept ans de développement, dont quatre sur une application médicale en production, j'ai appris à construire des interfaces soignées et du code qui reste facile à faire évoluer. J'accorde autant d'attention aux détails visuels qu'à la fiabilité et à la clarté de la communication avec l'équipe.",
    },
    {
      en: "I'm interested in modern, reliable, modular, pixel-perfect user interfaces. And also MMORPGs, tennis and motorcycles.",
      fr: "Je m'intéresse aux interfaces utilisateur modernes, fiables, modulaires et pixel-perfect. Et aussi aux MMORPG, au tennis et à la moto.",
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
      en: "For four years, I built and evolved a medical application used by doctors and researchers from around twenty partner institutions, to help diagnose rare diseases.\nBuilding new features, migrating Vue.js, improving and maintaining the codebase, evolving the design system, writing and maintaining tickets, and mentoring interns.",
      fr: "Pendant quatre ans, j'ai développé et fait évoluer une application médicale utilisée par des médecins et chercheurs d'une vingtaine d'établissements partenaires, pour aider au diagnostic de maladies rares.\nDéveloppement de nouvelles fonctionnalités, migration de Vue.js, amélioration et maintenance du code, évolution du design system, écriture et maintenance de tickets et encadrement de stagiaires.",
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
