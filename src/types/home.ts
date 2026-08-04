export interface HomeHeroData {
  announcementLabel: string;
  announcementText: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HomeTrustedCompaniesData {
  eyebrow: string;
  companies: string[];
}

export interface HomePillarData {
  icon: string;
  title: string;
  description: string;
}

export interface HomePillarsSectionData {
  eyebrow: string;
  title: string;
  pillars: HomePillarData[];
}

export interface HomePlatformBannerData {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  complianceText: string;
}

export interface HomePowerData {
  title: string;
  description: string;
}

export interface HomePlatformPowersData {
  eyebrow: string;
  title: string;
  powers: HomePowerData[];
}

export interface HomeMetricData {
  value: string;
  caption: string;
}

export interface HomeDsmCardData {
  name: string;
  description: string;
  metrics: HomeMetricData[];
}

export interface HomeDsmSectionData {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  cards: HomeDsmCardData[];
}

export interface HomeMarketplaceData {
  eyebrow: string;
  title: string;
  description: string;
  chips: string[];
}

export interface HomeCeoFeatureData {
  eyebrow: string;
  title: string;
  description: string[];
}

export interface HomeNewsCardData {
  title: string;
  description: string;
}

export interface HomeNewsSectionData {
  eyebrow: string;
  title: string;
  description: string;
  cards: HomeNewsCardData[];
}

export interface HomeFinalCtaData {
  title: string;
  highlight: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HomePageSeoData {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  openGraphTitle: string;
  openGraphDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  shareImageUrl?: string;
}

export interface HomePageContent {
  data: HomePageData;
  seo: HomePageSeoData;
}

export interface HomePageData {
  hero: HomeHeroData;
  trustedCompanies: HomeTrustedCompaniesData;
  pillars: HomePillarsSectionData;
  platformBanner: HomePlatformBannerData;
  platformPowers: HomePlatformPowersData;
  dsm: HomeDsmSectionData;
  marketplace: HomeMarketplaceData;
  ceoFeature: HomeCeoFeatureData;
  news: HomeNewsSectionData;
  finalCta: HomeFinalCtaData;
}
