import type { I18nString } from "@/lib/i18n";

export const ui = {
  nav: {
    home: { en: "Home", fr: "Accueil" },
    about: { en: "About", fr: "À propos" },
    services: { en: "Services", fr: "Services" },
    experience: { en: "Experience", fr: "Parcours" },
    projects: { en: "Projects", fr: "Projets" },
    stack: { en: "Stack", fr: "Stack" },
    contact: { en: "Contact", fr: "Contact" },
  } satisfies Record<string, I18nString>,

  navigation: {
    primary: { en: "Main navigation", fr: "Navigation principale" },
    menu: { en: "Menu", fr: "Menu" },
    expertise: { en: "{name} expertise", fr: "Expertise {name}" },
  } satisfies Record<string, I18nString>,

  sections: {
    about: { en: "About", fr: "À propos" },
    services: { en: "Services", fr: "Services" },
    experience: { en: "Experience", fr: "Parcours" },
    projects: { en: "Projects", fr: "Projets" },
    stack: { en: "Technologies", fr: "Technologies" },
    contact: { en: "Contact", fr: "Contact" },
    expertise: { en: "Expertise", fr: "Expertises" },
  } satisfies Record<string, I18nString>,

  services: {
    more: { en: "Learn more", fr: "En savoir plus" },
    carousel: { en: "Services offered", fr: "Services proposés" },
    previous: { en: "Previous service", fr: "Service précédent" },
    next: { en: "Next service", fr: "Service suivant" },
    goTo: { en: "Show service", fr: "Afficher le service" },
  },

  projectCard: {
    visit: { en: "Visit the website", fr: "Voir le site" },
    screenshot: { en: "Homepage of", fr: "Page d'accueil de" },
  },

  detail: {
    home: { en: "Home", fr: "Accueil" },
    breadcrumb: { en: "Breadcrumb", fr: "Fil d'Ariane" },
    service: { en: "Service", fr: "Service" },
    expertise: { en: "Expertise", fr: "Expertise" },
    related: { en: "See also", fr: "À voir aussi" },
  },

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
