// Client-side search index for the site's header search box.
//
// This is a small, hand-maintained array (the site only has 18 real routes) rather than a
// generated build-time index: each entry's title and excerpt are pulled from that route's
// actual page.tsx content (see git history / AGENTS.md route table), not invented copy. Update
// this file when page copy changes meaningfully.
//
// Deliberately excludes the Odoo backend/utility routes (/web/login, /website/*, blog RSS feeds)
// that were removed from this clone; see AGENTS.md "Deliberately excluded" section.

export type SearchEntry = {
  href: string;
  title: string;
  excerpt: string;
  /** Extra searchable terms that appear on the page but aren't worth spelling out in the
   *  short excerpt shown in results (e.g. "email" for the page with info@ahneta.nl in its
   *  footer, "zzp" for pages that mention "eenmanszaak (ZZP'er)"). */
  keywords?: string[];
};

export const SEARCH_INDEX: SearchEntry[] = [
  {
    href: "/",
    title: "Home",
    excerpt:
      "Ahneta Advies: bewust persoonlijk. Voldoende tijd voor persoonlijk advies aan bedrijven en particulieren, met aantrekkelijke tarieven door lage overheadkosten.",
  },
  {
    href: "/aangifte-ib",
    title: "Aangifte IB",
    excerpt:
      "Aangifte inkomstenbelasting: advisering en afhandeling van de aangifte inkomstenbelasting, box 1, box 2, box 3, en bezwaar- en beroepschriften.",
  },
  {
    href: "/administratie",
    title: "Administratie",
    excerpt:
      "Complete bedrijfsboekhouding, controle van uw boekhouding, opstellen van jaarrekeningen en de aangifte VPB voor besloten vennootschappen (B.V.).",
  },
  {
    href: "/bedrijven",
    title: "Bedrijven",
    excerpt:
      "Diensten voor bedrijven: financiële administratie en advies, belastingadvies, salarisadministratie en afdeling juridische zaken voor het MKB. Ook voor de eenmanszaak (ZZP'er) of de V.O.F.",
    keywords: ["zzp", "zzp'er", "eenmanszaak", "vof", "v.o.f."],
  },
  {
    href: "/blog",
    title: "Blog",
    excerpt: "Blogposts van Ahneta Advies, onderverdeeld in Reis en Success Stories.",
  },
  {
    href: "/blog/reis-1",
    title: "Reis",
    excerpt: "Vakantie tips: blogpost uit de categorie Reis op de Ahneta blog.",
  },
  {
    href: "/blog/success-stories-2",
    title: "Success Stories",
    excerpt: "Success Stories: blogpost uit de categorie Success Stories op de Ahneta blog.",
  },
  {
    href: "/contactus",
    title: "Contact",
    excerpt:
      "Neem contact op met Ahneta Adviesgroep B.V. Beantwoord enkele vragen over uw situatie en wij nemen gericht contact met u op. info@ahneta.nl.",
    keywords: ["email", "e-mail", "mail", "mailen", "bellen", "telefoon", "adres", "locatie"],
  },
  {
    href: "/cookie-policy",
    title: "Cookiebeleid",
    excerpt:
      "Cookiebeleid: welke cookiecategorieen, doelen en voorbeelden Ahneta gebruikt, waaronder voorkeuren, interactiegeschiedenis en analytics cookies.",
  },
  {
    href: "/estate-planning",
    title: "Estate Planning",
    excerpt:
      "Estate Planning (vermogensplanning): advisering bij successierecht, schenkingsrechten, testamenten en het recht van successie. Aangiftebiljetten worden per post of per email toegezonden.",
    keywords: ["email", "e-mail"],
  },
  {
    href: "/ondernemersplan",
    title: "Ondernemersplan",
    excerpt:
      "Ondernemersplan (businessplan) laten opstellen voor starters en bestaande ondernemingen, inclusief marktonderzoek en financieringsmogelijkheden.",
  },
  {
    href: "/onze-diensten",
    title: "Diensten",
    excerpt:
      "Alle diensten van Ahneta Advies voor bedrijven en particulieren, waaronder advisering bij bedrijfsovernames, bezwaar- en beroepschriften en de eenmanszaak (ZZP'er).",
    keywords: ["zzp", "zzp'er", "eenmanszaak"],
  },
  {
    href: "/over-ons",
    title: "Over ons",
    excerpt:
      "Over Ahneta Advies: een modulair opgebouwd dienstenportfolio. Kamil Akyol, oprichter en eigenaar.",
  },
  {
    href: "/particulieren",
    title: "Particulieren",
    excerpt:
      "Diensten voor particulieren: aangifte inkomstenbelasting, estate planning en advisering en afhandeling van bezwaar- en beroepschriften.",
  },
  {
    href: "/pricing",
    title: "Prijs",
    excerpt: "Prijzen en pakketten: Eenvoudig, Professioneel en Deskundige, met directe installatie en tevredenheid of geld terug.",
  },
  {
    href: "/privacy",
    title: "Privacy Policy",
    excerpt:
      "Algemene voorwaarden en privacybeleid van Ahneta: servicevoorwaarden, toepasselijkheid en totstandkoming van de overeenkomst.",
  },
  {
    href: "/start",
    title: "Start uw traject",
    excerpt: "Start uw traject bij Ahneta Advies via de onboarding wizard.",
  },
  {
    href: "/startende-ondernemer",
    title: "Startende Ondernemer",
    excerpt:
      "Op maat gesneden dienstenpakket voor startende ondernemers, inclusief gratis manuren dienstverlening in het tweede jaar van de onderneming.",
  },
];
