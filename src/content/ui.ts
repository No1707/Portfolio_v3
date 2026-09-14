import type { I18nString } from "@/lib/i18n";

export const ui = {
  nav: {
    about: { en: "About", fr: "À propos" },
    experience: { en: "Experience", fr: "Parcours" },
    projects: { en: "Projects", fr: "Projets" },
    stack: { en: "Stack", fr: "Stack" },
    contact: { en: "Contact", fr: "Contact" },
  } satisfies Record<string, I18nString>,

  navigation: {
    primary: { en: "Main navigation", fr: "Navigation principale" },
    menu: { en: "Menu", fr: "Menu" },
  } satisfies Record<string, I18nString>,

  sections: {
    about: { en: "About", fr: "À propos" },
    experience: { en: "Experience", fr: "Parcours" },
    projects: { en: "Projects", fr: "Projets" },
    stack: { en: "Technologies", fr: "Technologies" },
    contact: { en: "Contact", fr: "Contact" },
  } satisfies Record<string, I18nString>,

  actions: {
    viewWork: { en: "See my work", fr: "Voir mes projets" },
    getInTouch: { en: "Get in touch", fr: "Me contacter" },
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
    copy: { en: "Copy email address", fr: "Copier l'adresse e-mail" },
    copied: { en: "Email address copied", fr: "Adresse e-mail copiée" },
  },

  form: {
    name: { en: "Name", fr: "Nom" },
    email: { en: "Email", fr: "E-mail" },
    message: { en: "Message", fr: "Message" },
    send: { en: "Send", fr: "Envoyer" },
    sending: { en: "Sending…", fr: "Envoi…" },
    sent: {
      en: "Thanks, your message is on its way.",
      fr: "Merci, votre message est bien parti.",
    },
    error: {
      en: "Sending failed. Try again or write to me directly at",
      fr: "L'envoi a échoué. Réessayez ou écrivez-moi directement à",
    },
    close: { en: "Close", fr: "Fermer" },
  },

  notFound: {
    title: { en: "Page not found", fr: "Page introuvable" },
    text: {
      en: "This page doesn't exist or has been moved.",
      fr: "Cette page n'existe pas ou a été déplacée.",
    },
    back: { en: "Back to home", fr: "Retour à l'accueil" },
  },

  footer: {
    builtWith: {
      en: "Designed and built with Next.js, Tailwind CSS and Motion.",
      fr: "Conçu et développé avec Next.js, Tailwind CSS et Motion.",
    },
    rights: { en: "All rights reserved.", fr: "Tous droits réservés." },
  },
};
