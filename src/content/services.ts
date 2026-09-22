import type { DetailPage } from "./pages";

export const services: DetailPage[] = [
  {
    id: "website",
    kind: "service",
    slug: { en: "services/website-development", fr: "services/creation-site-web" },
    name: { en: "Website development", fr: "Création de site web" },
    title: { en: "Website development", fr: "Création de site web" },
    metaTitle: { en: "Custom website development in Paris", fr: "Création de site web sur mesure à Paris" },
    description: {
      en: "Freelance web developer in Paris: I build showcase websites, online stores and custom web apps with Vue.js, Nuxt, React or Next.js that are fast, responsive and search-engine friendly.",
      fr: "Développeur web freelance à Paris, je crée des sites vitrines, sites e-commerce et applications web sur mesure en Vue.js, Nuxt, React ou Next.js : rapides, responsive et bien référencés.",
    },
    summary: {
      en: "Showcase websites, landing pages, web apps, e-commerce. Turnkey, with editable content if needed.",
      fr: "Sites vitrines, landing pages, applications web, e-commerce. Clés en main avec, si besoin, contenu modifiable.",
    },
    lead: {
      en: "Your website is often the first contact between you and your clients. As a freelance web developer in Paris, I design and build custom websites, from showcase sites and online stores to web apps, with the same rigour for the visual result as for the quality of the code.",
      fr: "Un site web est souvent le premier contact entre vous et vos clients. En tant que développeur web freelance à Paris, je conçois et développe des sites sur mesure, du site vitrine à la boutique en ligne ou l'application web, avec la même rigueur pour le rendu visuel que pour la qualité du code.",
    },
    sections: [
      {
        title: { en: "What I build", fr: "Ce que je crée" },
        items: [
          {
            en: "Showcase websites, portfolios, landing pages",
            fr: "Sites vitrines, portfolios, landing pages",
          },
          {
            en: "E-commerce websites (with or without Shopify)",
            fr: "Sites e-commerce (avec ou sans Shopify)",
          },
          { en: "Web apps and tools", fr: "Applications et outils web" },
          { en: "Custom Figma mockups", fr: "Maquettes Figma sur mesure" },
        ],
      },
      {
        title: { en: "Tailored to your needs", fr: "Adaptation à vos besoins" },
        paragraphs: [
          {
            en: "Vue.js + Nuxt or React + Next.js are my main tools, but I can adapt if these frameworks don't fit your needs. WordPress, Webflow and Shopify are also tools I master.",
            fr: "Vue.js + Nuxt ou React + Next.js sont mes outils principaux, mais je saurai m'adapter si ces frameworks ne correspondent pas à votre besoin. WordPress, Webflow ou encore Shopify sont des outils que je maîtrise.",
          },
          {
            en: "My websites are delivered turnkey with, if needed, the option to edit your content yourself through a simple, clear interface.",
            fr: "Mes sites sont livrés clés en main avec, si besoin, la possibilité de modifier vos contenus vous-même sur une interface simple et claire.",
          },
        ],
      },
    ],
    related: ["seo", "vue", "react"],
  },
  {
    id: "seo",
    kind: "service",
    slug: { en: "services/seo", fr: "services/referencement-seo" },
    name: { en: "SEO", fr: "Référencement SEO" },
    title: { en: "Search engine optimisation (SEO)", fr: "Référencement naturel (SEO)" },
    metaTitle: { en: "Website SEO in Paris", fr: "Référencement SEO de site web à Paris" },
    description: {
      en: "Improve your website's visibility on Google: audit, technical SEO, performance, content structure and structured data, by a freelance web developer in Paris.",
      fr: "Améliorez la visibilité de votre site sur Google : audit, SEO technique, performance, structure des contenus et données structurées, par un développeur web freelance à Paris.",
    },
    summary: {
      en: "Audit and technical optimisation so that your website ranks well on Google.",
      fr: "Audit et optimisation technique afin que votre site soit bien référencé par Google.",
    },
    lead: {
      en: "A beautiful website is of little use if nobody finds it. I work on your website's SEO so that you show up on the searches that matter to your business.",
      fr: "Un beau site ne sert pas à grand-chose si personne ne le trouve. Je travaille le référencement naturel de votre site pour que vous soyez présent sur les recherches stratégiques.",
    },
    sections: [
      {
        title: { en: "What I do", fr: "Ce que je fais" },
        items: [
          { en: "Technical SEO", fr: "Référencement technique" },
          { en: "Optimised performance", fr: "Performances optimisées" },
          { en: "Structured content", fr: "Contenu structuré" },
          { en: "Google ranking", fr: "Positionnement Google" },
        ],
      },
      {
        title: { en: "Local visibility and tracking", fr: "Visibilité locale et suivi" },
        paragraphs: [
          {
            en: "To be found by clients near you, each important service deserves its own page, with copy that answers their questions and mentions the area you cover. I then set up Google Search Console to track indexing and the searches that bring you visitors: SEO builds up over several months, and this tracking lets us adjust the work over time.",
            fr: "Pour être trouvé par des clients près de chez vous, chaque service important mérite sa propre page, avec des textes qui répondent à leurs questions et mentionnent votre zone d'intervention. Je configure ensuite Google Search Console pour suivre l'indexation et les recherches qui vous amènent des visiteurs : le référencement se construit sur plusieurs mois, et ce suivi permet d'ajuster les actions au fil du temps.",
          },
        ],
      },
    ],
    related: ["website", "ads", "updates"],
  },
  {
    id: "hosting",
    kind: "service",
    slug: { en: "services/website-hosting", fr: "services/hebergement-site-web" },
    name: { en: "Hosting", fr: "Hébergement" },
    title: { en: "Website hosting and going live", fr: "Hébergement et mise en ligne de site web" },
    metaTitle: { en: "Website hosting and deployment", fr: "Hébergement et mise en ligne de site web" },
    description: {
      en: "Getting your website online: choosing a host, domain name, DNS, HTTPS, deployments and backups, handled by a freelance web developer in Paris.",
      fr: "Mise en ligne et hébergement de votre site : choix de l'hébergeur, nom de domaine, DNS, HTTPS, déploiements et sauvegardes, gérés par un développeur web freelance à Paris.",
    },
    summary: {
      en: "Choosing a host, domain name, HTTPS certificate and deployments.",
      fr: "Choix de l'hébergeur, nom de domaine, certificat HTTPS et déploiements.",
    },
    lead: {
      en: "Putting a website online takes a lot of technical setup. I take care of it so your website is fast, secure and available.",
      fr: "La mise en ligne d'un site demande de nombreux réglages techniques. Je m'en occupe pour que votre site soit rapide, sécurisé et disponible.",
    },
    sections: [
      {
        title: { en: "What I take care of", fr: "Ce que je prends en charge" },
        items: [
          {
            en: "Hosting suited to your website and budget",
            fr: "Hébergeur adapté à votre site et à votre budget",
          },
          {
            en: "Domain name purchase or transfer and DNS setup",
            fr: "Achat ou transfert de nom de domaine et configuration DNS",
          },
          { en: "HTTPS certificate and redirects", fr: "Certificat HTTPS et redirections" },
          { en: "Email addresses on your domain", fr: "Adresses e-mail liées au domaine" },
          {
            en: "Backups and uptime monitoring",
            fr: "Sauvegardes et surveillance de la disponibilité",
          },
        ],
      },
      {
        title: { en: "The right setup, and it stays yours", fr: "La bonne solution, qui reste la vôtre" },
        paragraphs: [
          {
            en: "A Next.js or Nuxt website gets the most out of platforms like Vercel or Netlify, while a WordPress website is better suited to a host such as OVHcloud, IONOS or o2switch. I recommend the most relevant option without unnecessary costs, and everything stays in your name: domain name, hosting and source code. You keep control of your website and can change provider whenever you want.",
            fr: "Un site Next.js ou Nuxt profite pleinement de plateformes comme Vercel ou Netlify, tandis qu'un site WordPress sera plutôt hébergé chez OVHcloud, IONOS ou o2switch. Je vous conseille la solution la plus pertinente, sans surcoût inutile, et tout reste à votre nom : nom de domaine, hébergement et code source. Vous gardez la main sur votre site et pouvez changer de prestataire quand vous le souhaitez.",
          },
        ],
      },
    ],
    related: ["website", "updates", "seo"],
  },
  {
    id: "updates",
    kind: "service",
    slug: { en: "services/website-updates", fr: "services/mise-a-jour-site-web" },
    name: { en: "Updates and maintenance", fr: "Mise à jour et maintenance" },
    title: {
      en: "Updates and maintenance for your website",
      fr: "Mise à jour et maintenance de votre site web",
    },
    metaTitle: {
      en: "Website updates and maintenance in Paris",
      fr: "Mise à jour et maintenance de site web à Paris",
    },
    description: {
      en: "Design modernisation, new pages, bug fixes and technical updates: a freelance web developer in Paris to evolve your existing website.",
      fr: "Modernisation du design, nouvelles pages, corrections de bugs et mises à jour techniques : un développeur web freelance à Paris pour faire évoluer votre site existant.",
    },
    summary: {
      en: "Modernisation, new pages, fixes and technical updates.",
      fr: "Modernisation, nouvelles pages, corrections et mises à jour techniques.",
    },
    lead: {
      en: "Already have a website but feel it deserves a refresh? I help you keep it modern, reliable and suited to your needs, whether that means evolving it, improving it or simply making sure it keeps running smoothly.",
      fr: "Vous avez déjà un site mais vous pensez qu'il mériterait un coup de neuf ? Je vous accompagne pour le garder moderne, fiable et adapté à vos besoins, qu'il s'agisse de le faire évoluer, de l'améliorer ou simplement de veiller à son bon fonctionnement.",
    },
    sections: [
      {
        title: { en: "What I offer", fr: "Ce que je propose" },
        items: [
          { en: "Modernise the design", fr: "Moderniser le design" },
          {
            en: "Add new pages and features",
            fr: "Ajout de nouvelles pages et fonctionnalités",
          },
          { en: "Fix UI and UX bugs", fr: "Corriger les bugs d'UI et d'UX" },
          { en: "Improve performance", fr: "Améliorer les performances" },
          {
            en: "Update the technologies used",
            fr: "Mise à jour des technologies utilisées",
          },
        ],
      },
      {
        title: { en: "Starting with a review", fr: "Un état des lieux pour commencer" },
        paragraphs: [
          {
            en: "Every engagement starts with a review of your website: design, performance, technologies and pain points. You get a list of priorities with a quote, and you choose what we improve, all at once or step by step.",
            fr: "Chaque intervention commence par un état des lieux de votre site : design, performances, technologies et points bloquants. Vous recevez une liste de priorités chiffrée, et vous choisissez ce que l'on améliore, en une fois ou petit à petit.",
          },
        ],
      },
    ],
    related: ["website", "hosting", "vue"],
  },
  {
    id: "ads",
    kind: "service",
    slug: { en: "services/google-ads", fr: "services/google-ads" },
    name: { en: "Visibility and acquisition", fr: "Visibilité et acquisition" },
    title: {
      en: "Google Ads: visibility and acquisition",
      fr: "Google Ads : visibilité et acquisition",
    },
    metaTitle: {
      en: "Google Ads in Paris: visibility and acquisition",
      fr: "Google Ads à Paris : visibilité et acquisition",
    },
    description: {
      en: "Grow your reach and your leads: Google Ads campaign setup and management, conversion tracking and landing pages, by a freelance web developer in Paris.",
      fr: "Augmentez votre portée et vos prospects : mise en place et suivi de campagnes Google Ads, suivi des conversions et pages d'atterrissage, par un développeur web freelance à Paris.",
    },
    summary: {
      en: "Ad campaigns to grow your reach and your leads.",
      fr: "Des campagnes de pub pour augmenter votre portée et vos prospects.",
    },
    lead: {
      en: "Quickly gain visibility by appearing at the top of the results for people searching for your services. I help you set up Google Ads campaigns designed to attract relevant traffic and generate new opportunities for your business.",
      fr: "Gagnez rapidement en visibilité en apparaissant en haut des résultats auprès des personnes qui recherchent vos services. Je vous accompagne dans la mise en place de campagnes Google Ads pensées pour attirer un trafic pertinent et générer de nouvelles opportunités pour votre activité.",
    },
    sections: [
      {
        title: { en: "What I set up", fr: "Ce que je mets en place" },
        items: [
          {
            en: "Research into the keywords your clients use",
            fr: "Recherche des mots-clés utilisés par vos clients",
          },
          {
            en: "Launch of your Google ad campaign",
            fr: "Lancement de la campagne de publicité Google",
          },
          { en: "Ad copywriting", fr: "Rédaction des annonces" },
          { en: "Geographic targeting", fr: "Ciblage géographique" },
        ],
      },
      {
        title: { en: "Measure, adjust, convert", fr: "Mesurer, ajuster, convertir" },
        paragraphs: [
          {
            en: "I set up conversion tracking (contact requests, calls, purchases) so you know exactly what each campaign brings in. Campaigns are then monitored and adjusted over time: keywords to exclude, ads to improve, budget to reallocate. And since an ad leads to your website, I can also create or improve the landing page to turn visitors into clients.",
            fr: "Je configure le suivi des conversions (demandes de contact, appels, achats) pour savoir précisément ce que rapporte chaque campagne. Les campagnes sont ensuite suivies et ajustées dans le temps : mots-clés à exclure, annonces à améliorer, budget à redistribuer. Et comme une annonce mène vers votre site, je peux aussi créer ou améliorer la page d'atterrissage pour transformer les visiteurs en clients.",
          },
        ],
      },
    ],
    related: ["seo", "website", "updates"],
  },
];
