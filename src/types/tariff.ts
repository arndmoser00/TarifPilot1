export type TariffCategory = 'mobile' | 'sim-only' | 'broadband' | 'unlimited';

export type NetworkType =
  | 'Telekom (D1)'
  | 'Vodafone (D2)'
  | 'o2 / Telefónica'
  | '1&1 5G'
  | 'Glasfaser (FTTH)'
  | 'Kabel-Glasfaser'
  | 'DSL / VDSL';

export type OfferBadge =
  | 'Testsieger'
  | 'Preis-Tipp'
  | 'Top-Deal'
  | 'Bestseller'
  | 'Effektiv-Kracher'
  | 'Flex-Tipp';

export interface ProviderFAQ {
  question: string;
  answer: string;
}

export interface Provider {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  brandColor: string;
  brandBgLight: string;
  networkSummary: string;
  rating: number;
  reviewCount: number;
  connectTestGrade: string;
  headquarters: string;
  founded: string;
  customerServiceHours: string;
  hotline: string;
  officialDomain: string;
  description: string;
  longDescription: string;
  highlights: string[];
  pros: string[];
  cons: string[];
  categories: TariffCategory[];
  faqs: ProviderFAQ[];
}

export interface TariffSpecItem {
  label: string;
  value: string;
}

export interface TariffOffer {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  providerSlug: string;
  category: TariffCategory;
  network: NetworkType;
  technology: string;
  monthlyPrice: number;
  promoMonthlyPrice?: number;
  promoMonths?: number;
  effectiveMonthlyPrice: number;
  oneTimeSetupFee: number;
  shippingFee: number;
  hardwareName?: string;
  hardwareOneTimePrice?: number;
  hardwareRetailValue?: number;
  switchingBonus: number;
  cashback: number;
  dataVolumeGb: number | 'unlimited';
  downloadSpeedMbps: number;
  uploadSpeedMbps: number;
  contractMonths: 1 | 12 | 24;
  noticePeriod: string;
  euRoaming: boolean;
  allnetFlat: boolean;
  eSimReady: boolean;
  fiveGIncluded: boolean;
  badge?: OfferBadge;
  score: number;
  features: string[];
  tarifDetails: TariffSpecItem[];
  costSummaryNote: string;
  validUntil: string;
}

export interface CategoryMeta {
  id: TariffCategory;
  slug: string;
  label: string;
  shortLabel: string;
  headline: string;
  subheadline: string;
  seoTitle: string;
  seoDescription: string;
}
