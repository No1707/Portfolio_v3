import type { DetailPage } from "./pages";

export const services: DetailPage[] = [
  {
    id: "website",
    kind: "service",
    slug: { en: "services/website-development", fr: "services/creation-site-web" },
    name: { en: "Website development", fr: "Création de site web" },
    title: { en: "Website development in Paris", fr: "Création de site web à Paris" },
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
      en: "Your website is often the first contact between you and your clients. As a freelance web developer in Paris, I design and build custom websites, from showcase sites and online stores to web apps, with as much care for the visual result as for the quality of the code.",
      fr: "Un site web est souvent le premier contact entre vous et vos clients. Développeur web freelance à Paris, je conçois et développe des sites sur mesure, du site vitrine à la boutique en ligne ou l'application web, avec le même soin pour le rendu visuel que pour la qualité du code.",
    },
    sections: [
      {
        title: { en: "What I build", fr: "Ce que je crée" },
        items: [
          {
            en: "Showcase websites to present your business, services and work",
            fr: "Des sites vitrines pour présenter votre activité, vos services et vos réalisations",
          },
          {
            en: "Landing pages for an offer, a launch or an ad campaign",
            fr: "Des landing pages pour une offre, un lancement ou une campagne publicitaire",
          },
          {
            en: "Online stores to sell your products, with Shopify or custom-built",
            fr: "Des sites e-commerce pour vendre vos produits en ligne, avec Shopify ou sur mesure",
          },
          {
            en: "Multilingual websites, with content adapted to each language",
            fr: "Des sites multilingues, avec un contenu adapté à chaque langue",
          },
          {
            en: "Custom web apps: client areas, dashboards, business tools",
            fr: "Des applications web sur mesure : espaces clients, tableaux de bord, outils métier",
          },
          {
            en: "Pixel-perfect integration of your Figma designs",
            fr: "L'intégration de vos maquettes Figma au pixel près",
          },
        ],
      },
      {
        title: { en: "The right technology for your project", fr: "Les technologies adaptées à votre projet" },
        paragraphs: [
          {
            en: "I mainly work with Vue.js and Nuxt, or React and Next.js. These frameworks make it possible to build very fast websites that rank well and are easy to evolve as your needs change.",
            fr: "Je développe principalement avec Vue.js et Nuxt, ou React et Next.js. Ces frameworks permettent de construire des sites très rapides, bien référencés et faciles à faire évoluer au fil de vos besoins.",
          },
          {
            en: "If you want to edit your content yourself, I add a CMS such as Sanity. For simpler needs, I also work with WordPress, Webflow and Shopify.",
            fr: "Si vous souhaitez modifier vos contenus en autonomie, j'ajoute un CMS comme Sanity. Pour des besoins plus simples, je travaille aussi avec WordPress, Webflow ou Shopify.",
          },
        ],
      },
      {
        title: { en: "How a project runs", fr: "Comment se déroule un projet" },
        items: [
          {
            en: "A first conversation to understand your business, goals and constraints",
            fr: "Un premier échange pour comprendre votre activité, vos objectifs et vos contraintes",
          },
          {
            en: "A detailed proposal: pages, features, schedule and quote",
            fr: "Une proposition détaillée : pages, fonctionnalités, planning et devis",
          },
          {
            en: "The design, based on your mockups or created together",
            fr: "Le design, à partir de votre maquette ou conçu ensemble",
          },
          {
            en: "Development, with regular check-ins to validate progress",
            fr: "Le développement, avec des points réguliers pour valider l'avancement",
          },
          {
            en: "Going live: domain name, hosting and SEO basics",
            fr: "La mise en ligne : nom de domaine, hébergement et référencement de base",
          },
          {
            en: "Follow-up after launch for adjustments and new features",
            fr: "Un suivi après le lancement pour les ajustements et les évolutions",
          },
        ],
      },
      {
        title: { en: "A website built to last", fr: "Un site pensé pour durer" },
        paragraphs: [
          {
            en: "Every website is responsive, accessible and optimised for loading speed, which matters to your visitors as much as to Google. The code is structured to stay easy to maintain, whether by me or by another team.",
            fr: "Chaque site est responsive, accessible et optimisé pour la vitesse de chargement, un critère important pour vos visiteurs comme pour Google. Le code est structuré pour rester simple à maintenir, que ce soit par moi ou par une autre équipe.",
          },
        ],
      },
    ],
    tech: ["vue", "nuxt", "react", "nextjs", "typescript", "tailwind", "sanity"],
    related: ["seo", "vue", "react"],
  },
  {
    id: "seo",
    kind: "service",
    slug: { en: "services/seo", fr: "services/referencement-seo" },
    name: { en: "SEO", fr: "Référencement SEO" },
    title: { en: "SEO for your website", fr: "Référencement naturel (SEO) pour votre site web" },
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
      en: "A beautiful website is of little use if nobody finds it. I work on your website's SEO where a developer is most useful: the technical side, performance and the structure of your content.",
      fr: "Un beau site ne sert pas à grand-chose si personne ne le trouve. Je travaille le référencement naturel de votre site là où un développeur est le plus utile : la technique, la performance et la structure des contenus.",
    },
    sections: [
      {
        title: { en: "Auditing your website", fr: "L'audit de votre site" },
        paragraphs: [
          {
            en: "I start by analysing your website: indexing, tags, loading speed, mobile version, page structure and target keywords. You get a clear list of issues and priorities.",
            fr: "Je commence par analyser votre site : indexation, balises, vitesse de chargement, version mobile, structure des pages et mots-clés visés. Vous obtenez une liste claire des problèmes et des priorités.",
          },
        ],
      },
      {
        title: { en: "Technical optimisation", fr: "Les optimisations techniques" },
        items: [
          {
            en: "Title tags, meta descriptions and a clear heading hierarchy",
            fr: "Balises title, meta descriptions et titres de page bien hiérarchisés",
          },
          {
            en: "Loading speed and Core Web Vitals",
            fr: "Vitesse de chargement et Core Web Vitals",
          },
          {
            en: "Sitemap, robots.txt, clean URLs and redirects",
            fr: "Sitemap, robots.txt, URL propres et redirections",
          },
          {
            en: "Structured data to help Google understand your business",
            fr: "Données structurées pour aider Google à comprendre votre activité",
          },
          {
            en: "Hreflang tags for multilingual websites",
            fr: "Balises hreflang pour les sites multilingues",
          },
          {
            en: "Optimised images and alternative text",
            fr: "Images optimisées et textes alternatifs",
          },
        ],
      },
      {
        title: { en: "Content and local SEO", fr: "Les contenus et le référencement local" },
        paragraphs: [
          {
            en: "To be found by clients near you, each important service deserves its own page, with copy that answers your clients' questions and mentions the area you cover. I help you define that structure and implement it properly.",
            fr: "Pour être trouvé par des clients près de chez vous, chaque service important mérite sa propre page, avec des textes qui répondent aux questions de vos clients et mentionnent votre zone d'intervention. Je vous aide à définir cette structure et à l'intégrer proprement.",
          },
        ],
      },
      {
        title: { en: "Tracking in Google Search Console", fr: "Le suivi dans Google Search Console" },
        paragraphs: [
          {
            en: "I set up Google Search Console to track indexing, the searches that bring visitors and any errors. SEO builds up over several months: this tracking lets us adjust the work over time.",
            fr: "Je configure Google Search Console pour suivre l'indexation, les recherches qui amènent des visiteurs et les éventuelles erreurs. Le référencement se construit sur plusieurs mois : ce suivi permet d'ajuster les actions au fil du temps.",
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
      en: "Domain name, DNS, certificates, deployments: putting a website online takes a lot of technical setup. I take care of it so your website is fast, secure and available.",
      fr: "Nom de domaine, DNS, certificats, déploiements : la mise en ligne d'un site demande de nombreux réglages techniques. Je m'en occupe pour que votre site soit rapide, sécurisé et disponible.",
    },
    sections: [
      {
        title: { en: "What I take care of", fr: "Ce que je prends en charge" },
        items: [
          {
            en: "Choosing hosting suited to your website and budget",
            fr: "Le choix d'un hébergement adapté à votre site et à votre budget",
          },
          {
            en: "Buying or transferring your domain name and configuring DNS",
            fr: "L'achat ou le transfert du nom de domaine et la configuration des DNS",
          },
          {
            en: "HTTPS certificate and redirects",
            fr: "Le certificat HTTPS et les redirections",
          },
          {
            en: "Email addresses on your domain",
            fr: "Les adresses e-mail liées à votre nom de domaine",
          },
          {
            en: "Automatic deployment every time the website is updated",
            fr: "Le déploiement automatique à chaque mise à jour du site",
          },
          {
            en: "Backups and uptime monitoring",
            fr: "Les sauvegardes et la surveillance de la disponibilité",
          },
        ],
      },
      {
        title: { en: "Hosting that fits your website", fr: "Un hébergement adapté à votre site" },
        paragraphs: [
          {
            en: "A Next.js or Nuxt website gets the most out of platforms like Vercel or Netlify, which serve it from close to your visitors. A WordPress website is better suited to a traditional host such as OVHcloud, IONOS or o2switch. I recommend the most relevant option, without unnecessary costs.",
            fr: "Un site Next.js ou Nuxt profite pleinement de plateformes comme Vercel ou Netlify, qui le distribuent au plus près de vos visiteurs. Un site WordPress sera plutôt hébergé chez un hébergeur classique comme OVHcloud, IONOS ou o2switch. Je vous conseille la solution la plus pertinente, sans surcoût inutile.",
          },
        ],
      },
      {
        title: { en: "You stay the owner", fr: "Vous restez propriétaire" },
        paragraphs: [
          {
            en: "The domain name, the hosting and the source code are in your name. You stay in control of your website and can change provider whenever you want.",
            fr: "Le nom de domaine, l'hébergement et le code source sont à votre nom. Vous gardez la main sur votre site et pouvez changer de prestataire quand vous le souhaitez.",
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
      en: "Your website already exists but its design has aged or it needs to evolve? I take over existing websites to modernise their design, fix them or add new pages and features, however they were built.",
      fr: "Votre site existe déjà mais son design a vieilli ou il doit évoluer ? Je reprends des sites existants pour moderniser leur design, les corriger ou y ajouter de nouvelles pages et fonctionnalités, quelle que soit la façon dont ils ont été construits.",
    },
    sections: [
      {
        title: { en: "What I can do on your website", fr: "Ce que je peux faire sur votre site" },
        items: [
          {
            en: "Modernise the design, content or pages",
            fr: "Moderniser le design, les contenus ou les pages",
          },
          {
            en: "Add new pages and features",
            fr: "Ajouter de nouvelles pages et fonctionnalités",
          },
          {
            en: "Fix bugs and display issues on mobile",
            fr: "Corriger les bugs et les problèmes d'affichage sur mobile",
          },
          {
            en: "Improve loading speed and accessibility",
            fr: "Améliorer la vitesse de chargement et l'accessibilité",
          },
          {
            en: "Update frameworks, plugins and dependencies",
            fr: "Mettre à jour les frameworks, extensions et dépendances",
          },
          {
            en: "Migrate to a more recent version of the technology",
            fr: "Migrer vers une version plus récente de la technologie",
          },
        ],
      },
      {
        title: { en: "All kinds of websites", fr: "Tous types de sites" },
        paragraphs: [
          {
            en: "I work on websites built with Vue.js, Nuxt, React or Next.js, as well as WordPress, Webflow and Shopify. Before changing anything, I take the time to understand the existing code so nothing breaks.",
            fr: "J'interviens sur des sites en Vue.js, Nuxt, React ou Next.js, mais aussi sur WordPress, Webflow ou Shopify. Avant toute modification, je prends le temps de comprendre le code existant pour ne rien casser.",
          },
        ],
      },
      {
        title: { en: "Long-term maintenance experience", fr: "Une expérience de la maintenance sur la durée" },
        paragraphs: [
          {
            en: "For four years, I evolved a medical application in production: new features, code maintenance, design system evolution and a Vue.js migration. I know how to move a project forward without compromising its stability.",
            fr: "Pendant quatre ans, j'ai fait évoluer une application médicale en production : nouvelles fonctionnalités, maintenance du code, évolution du design system et migration de Vue.js. Je sais faire avancer un projet sans compromettre sa stabilité.",
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
    name: { en: "Web acquisition", fr: "Acquisition web" },
    title: { en: "Web acquisition: Google Ads campaigns", fr: "Acquisition web : campagnes Google Ads" },
    metaTitle: {
      en: "Web acquisition and Google Ads campaigns in Paris",
      fr: "Acquisition web et campagnes Google Ads à Paris",
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
      en: "SEO takes time. Google Ads puts you at the top of the results as soon as the campaign starts, on the exact searches of your future clients, and you only pay when someone clicks your ad.",
      fr: "Le référencement naturel prend du temps. Google Ads permet d'apparaître en haut des résultats dès le lancement de la campagne, sur les recherches précises de vos futurs clients, en ne payant que lorsqu'on clique sur votre annonce.",
    },
    sections: [
      {
        title: { en: "Setting up campaigns", fr: "La mise en place des campagnes" },
        items: [
          {
            en: "Research into the keywords your clients type",
            fr: "La recherche des mots-clés tapés par vos clients",
          },
          {
            en: "Campaign and ad group structure",
            fr: "La structure des campagnes et des groupes d'annonces",
          },
          { en: "Ad copywriting", fr: "La rédaction des annonces" },
          {
            en: "Geographic targeting, for example Paris and Île-de-France",
            fr: "Le ciblage géographique, par exemple Paris et l'Île-de-France",
          },
          {
            en: "Budget and bidding strategy",
            fr: "La définition du budget et des enchères",
          },
        ],
      },
      {
        title: { en: "Measuring what works", fr: "Mesurer ce qui fonctionne" },
        paragraphs: [
          {
            en: "I set up conversion tracking (contact requests, calls, purchases) with Google Tag Manager and Google Analytics. You know exactly what each campaign brings in, and the budget can go to what works.",
            fr: "Je configure le suivi des conversions (demandes de contact, appels, achats) avec Google Tag Manager et Google Analytics. Vous savez précisément ce que chaque campagne vous rapporte, et le budget peut être orienté vers ce qui fonctionne.",
          },
        ],
      },
      {
        title: { en: "Pages that convert", fr: "Des pages qui convertissent" },
        paragraphs: [
          {
            en: "An ad leads to a page on your website. As a developer, I can create or improve that landing page so it is fast, clear and designed to turn visitors into clients.",
            fr: "Une annonce renvoie vers une page de votre site. En tant que développeur, je peux créer ou améliorer cette page d'atterrissage pour qu'elle soit rapide, claire et pensée pour transformer les visiteurs en clients.",
          },
        ],
      },
      {
        title: { en: "Monitoring and optimisation", fr: "Le suivi et l'optimisation" },
        paragraphs: [
          {
            en: "Once live, campaigns are monitored and adjusted: keywords to exclude, ads to improve, budget to reallocate. I regularly send you a clear update on the results.",
            fr: "Une fois lancées, les campagnes sont suivies et ajustées : mots-clés à exclure, annonces à améliorer, budget à redistribuer. Je vous transmets régulièrement un point clair sur les résultats.",
          },
        ],
      },
    ],
    related: ["seo", "website", "updates"],
  },
];
