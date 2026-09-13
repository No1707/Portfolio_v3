import type { I18nString } from "@/lib/i18n";

export const ui = {
  nav: {
    about: { en: "About", fr: "À propos" },
    experience: { en: "Experience", fr: "Parcours" },
    projects: { en: "Projects", fr: "Projets" },
    stack: { en: "Stack", fr: "Stack" },
    contact: { en: "Contact", fr: "Contact" },
  } satisfies Record<string, I18nString>,

  sections: {
    about: { en: "About", fr: "À propos" },
    experience: { en: "Experience", fr: "Parcours" },
    projects: { en: "Selected projects", fr: "Projets sélectionnés" },
    stack: { en: "Technologies", fr: "Technologies" },
    contact: { en: "Contact", fr: "Contact" },
  } satisfies Record<string, I18nString>,

  actions: {
    viewWork: { en: "See my work", fr: "Voir mes projets" },
    getInTouch: { en: "Get in touch", fr: "Me contacter" },
    scrollDown: { en: "Scroll to content", fr: "Aller au contenu" },
    skipToContent: { en: "Skip to content", fr: "Aller au contenu principal" },
    openMenu: { en: "Open menu", fr: "Ouvrir le menu" },
    closeMenu: { en: "Close menu", fr: "Fermer le menu" },
    toggleTheme: { en: "Switch theme", fr: "Changer de thème" },
    switchLanguage: { en: "Switch to French", fr: "Passer en anglais" },
    backToTop: { en: "Back to top", fr: "Retour en haut" },
  } satisfies Record<string, I18nString>,

  about: {
    portraitAlt: { en: "Portrait of Nolan", fr: "Portrait de Nolan" },
  },

  contact: {
    headline: { en: "Let's build something", fr: "Construisons quelque chose" },
    cta: { en: "Write to me", fr: "Discutons" },
    subject: { en: "Hello Nolan", fr: "Bonjour Nolan" },
  },

  footer: {
    builtWith: {
      en: "Designed and built with Next.js, Tailwind CSS and Motion.",
      fr: "Conçu et développé avec Next.js, Tailwind CSS et Motion.",
    },
    rights: { en: "All rights reserved.", fr: "Tous droits réservés." },
  },
};
