// Source: ported from clients/ahneta-client/website/components/onboarding/types.ts,
// trimmed to the 5 services that actually exist as routes on this site.

export type Audience = "bedrijven" | "particulieren";

export type WizardContact = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

export type WizardData = {
  audience: Audience | null;
  serviceSlugs: string[];
  situation: string;
  urgency: string;
  bookkeeping: string;
  contact: WizardContact;
};

export const initialWizardData: WizardData = {
  audience: null,
  serviceSlugs: [],
  situation: "",
  urgency: "",
  bookkeeping: "",
  contact: { name: "", email: "", phone: "", company: "" },
};

export const STEP_LABELS = ["Type klant", "Diensten", "Uw situatie", "Contact"] as const;

export type WizardOption = { value: string; label: string };

export type ServiceOption = {
  slug: string;
  title: string;
  category: Audience;
  summary: string;
};

export const SERVICES: ServiceOption[] = [
  {
    slug: "ondernemersplan",
    title: "Ondernemersplan",
    category: "bedrijven",
    summary: "Een ondernemingsplan is het samenspel van u als ondernemer en van Ahneta als adviseur.",
  },
  {
    slug: "administratie",
    title: "Administratie",
    category: "bedrijven",
    summary: "Complete bedrijfsboekhouding, jaarrekeningen, loonadministratie en periodieke aangiftes.",
  },
  {
    slug: "startende-ondernemer",
    title: "Startende Ondernemer",
    category: "bedrijven",
    summary: "Een op maat gesneden dienstenpakket met een aantal voordelen voor de startende ondernemer.",
  },
  {
    slug: "aangifte-ib",
    title: "Aangifte Inkomstenbelasting",
    category: "particulieren",
    summary: "Verzorging van de aangifte inkomstenbelasting en de afhandeling van bezwaar- en beroepsschriften.",
  },
  {
    slug: "estate-planning",
    title: "Estate Planning",
    category: "particulieren",
    summary: "Advies op het gebied van vermogensplanning, schenking en erfenis.",
  },
];

export const SITUATION_OPTIONS: Record<Audience, WizardOption[]> = {
  bedrijven: [
    { value: "starter", label: "Ik ben net gestart of ga binnenkort starten" },
    { value: "bestaand", label: "Ik heb een lopende onderneming" },
    { value: "orienterend", label: "Ik oriënteer me nog op ondernemerschap" },
  ],
  particulieren: [
    { value: "jaarlijkse-aangifte", label: "Jaarlijkse aangifte inkomstenbelasting" },
    { value: "vermogen-erfenis", label: "Vermogen, schenking of erfenis" },
    { value: "anders", label: "Een andere fiscale vraag" },
  ],
};

export const URGENCY_OPTIONS: WizardOption[] = [
  { value: "spoed", label: "Zo snel mogelijk" },
  { value: "maand", label: "Binnen een maand" },
  { value: "orienterend", label: "Ik oriënteer me nog, geen haast" },
];

export const BOOKKEEPING_OPTIONS: WizardOption[] = [
  { value: "zelf", label: "Ik doe de boekhouding zelf" },
  { value: "ander-kantoor", label: "Bij een ander administratiekantoor" },
  { value: "niets", label: "Nog geen administratie opgezet" },
];
