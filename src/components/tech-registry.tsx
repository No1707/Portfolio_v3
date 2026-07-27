import {
  SiAngular,
  SiBootstrap,
  SiCss,
  SiCypress,
  SiDocker,
  SiEslint,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiI18next,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiNuxt,
  SiPinia,
  SiReact,
  SiSanity,
  SiSass,
  SiShadcnui,
  SiShopify,
  SiStyledcomponents,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
  SiVuetify,
  SiWebflow,
  SiWebstorm,
  SiWordpress,
  SiZod,
} from "@icons-pack/react-simple-icons";
import type { TechKey } from "@/content/site";

type IconComponent = typeof SiReact;

export const techRegistry: Record<TechKey, { name: string; Icon: IconComponent; hex: string }> = {
  // Languages
  html: { name: "HTML5", Icon: SiHtml5, hex: "#E34F26" },
  css: { name: "CSS", Icon: SiCss, hex: "#663399" },
  javascript: { name: "JavaScript", Icon: SiJavascript, hex: "#F7DF1E" },
  typescript: { name: "TypeScript", Icon: SiTypescript, hex: "#3178C6" },
  node: { name: "Node.js", Icon: SiNodedotjs, hex: "#5FA04E" },

  // Frameworks
  react: { name: "React", Icon: SiReact, hex: "#61DAFB" },
  nextjs: { name: "Next.js", Icon: SiNextdotjs, hex: "#9A9AA5" },
  vue: { name: "Vue.js", Icon: SiVuedotjs, hex: "#4FC08D" },
  nuxt: { name: "Nuxt", Icon: SiNuxt, hex: "#00DC82" },
  angular: { name: "Angular", Icon: SiAngular, hex: "#DD0031" },
  pinia: { name: "Pinia", Icon: SiPinia, hex: "#FFD859" },
  vuetify: { name: "Vuetify", Icon: SiVuetify, hex: "#1867C0" },
  threejs: { name: "Three.js", Icon: SiThreedotjs, hex: "#9A9AA5" },
  motion: { name: "Motion", Icon: SiFramer, hex: "#9A9AA5" },
  i18next: { name: "i18n", Icon: SiI18next, hex: "#26A69A" },
  zod: { name: "Zod", Icon: SiZod, hex: "#3E67B1" },

  // Styling
  tailwind: { name: "Tailwind CSS", Icon: SiTailwindcss, hex: "#06B6D4" },
  sass: { name: "Sass", Icon: SiSass, hex: "#CC6699" },
  bootstrap: { name: "Bootstrap", Icon: SiBootstrap, hex: "#7952B3" },
  shadcn: { name: "shadcn/ui", Icon: SiShadcnui, hex: "#9A9AA5" },
  styledcomponents: { name: "styled-components", Icon: SiStyledcomponents, hex: "#DB7093" },
  figma: { name: "Figma", Icon: SiFigma, hex: "#F24E1E" },
  webflow: { name: "Webflow", Icon: SiWebflow, hex: "#146EF5" },
  wordpress: { name: "WordPress", Icon: SiWordpress, hex: "#5A96BD" },
  shopify: { name: "Shopify", Icon: SiShopify, hex: "#7AB55C" },

  // Tooling
  git: { name: "Git", Icon: SiGit, hex: "#F05032" },
  github: { name: "GitHub", Icon: SiGithub, hex: "#9A9AA5" },
  gitlab: { name: "GitLab", Icon: SiGitlab, hex: "#FC6D26" },
  webstorm: { name: "WebStorm", Icon: SiWebstorm, hex: "#7D6BE8" },
  vite: { name: "Vite", Icon: SiVite, hex: "#646CFF" },
  eslint: { name: "ESLint", Icon: SiEslint, hex: "#7A79E0" },
  cypress: { name: "Cypress", Icon: SiCypress, hex: "#9A9AA5" },
  docker: { name: "Docker", Icon: SiDocker, hex: "#2496ED" },
  supabase: { name: "Supabase", Icon: SiSupabase, hex: "#3FCF8E" },
  sanity: { name: "Sanity", Icon: SiSanity, hex: "#F03E2F" },
  firebase: { name: "Firebase", Icon: SiFirebase, hex: "#FFCA28" },
  vercel: { name: "Vercel", Icon: SiVercel, hex: "#9A9AA5" },
  notion: { name: "Notion", Icon: SiNotion, hex: "#9A9AA5" },
};

export function techName(key: TechKey) {
  return techRegistry[key].name;
}
