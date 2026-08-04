import { cache } from "react";
import type { Metadata } from "next";
import { homePageData } from "@/data/home";
import type {
  HomeCeoFeatureData,
  HomeDsmSectionData,
  HomeFinalCtaData,
  HomeHeroData,
  HomeMarketplaceData,
  HomeMetricData,
  HomeNewsCardData,
  HomeNewsSectionData,
  HomePageContent,
  HomePageSeoData,
  HomePillarData,
  HomePillarsSectionData,
  HomePlatformBannerData,
  HomePlatformPowersData,
  HomePowerData,
  HomeTrustedCompaniesData,
} from "@/types/home";
import { fetchStrapi } from "./strapi-client";
import {
  normalizeText,
  resolveStrapiMediaUrl,
  unwrapStrapiEntity,
} from "./strapi-mappers";

const STRAPI_BASE_URL =
  process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://127.0.0.1:1337";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const defaultSeo: HomePageSeoData = {
  metaTitle: "Articul8 | The GenAI platform that simply works.",
  metaDescription:
    "Domain-Specific GenAI Platform purpose-built for your data and mission. From data chaos to hyper-personalized GenAI enterprise outcomes.",
  canonicalUrl: SITE_URL,
  openGraphTitle: "Articul8 | The GenAI platform that simply works.",
  openGraphDescription:
    "Domain-Specific GenAI Platform purpose-built for your data and mission. From data chaos to hyper-personalized GenAI enterprise outcomes.",
  twitterTitle: "Articul8 | The GenAI platform that simply works.",
  twitterDescription:
    "Domain-Specific GenAI Platform purpose-built for your data and mission. From data chaos to hyper-personalized GenAI enterprise outcomes.",
};

type StrapiTextItem = {
  value?: string | null;
};

type StrapiFeatureCard = {
  icon?: string | null;
  title?: string | null;
  description?: string | null;
};

type FeatureCardModel = {
  icon?: string;
  title: string;
  description: string;
};

type StrapiMetric = {
  value?: string | null;
  caption?: string | null;
};

type StrapiHomeHero = {
  announcementLabel?: string | null;
  announcementText?: string | null;
  title?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

type StrapiHomeTrustedCompanies = {
  eyebrow?: string | null;
  companies?: Array<StrapiTextItem | { attributes?: StrapiTextItem }> | null;
};

type StrapiHomePillars = {
  eyebrow?: string | null;
  title?: string | null;
  pillars?: Array<StrapiFeatureCard | { attributes?: StrapiFeatureCard }> | null;
};

type StrapiHomePlatformBanner = {
  title?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  complianceText?: string | null;
};

type StrapiHomePlatformPowers = {
  eyebrow?: string | null;
  title?: string | null;
  powers?: Array<StrapiFeatureCard | { attributes?: StrapiFeatureCard }> | null;
};

type StrapiHomeDsmCard = {
  name?: string | null;
  description?: string | null;
  metrics?: Array<StrapiMetric | { attributes?: StrapiMetric }> | null;
};

type StrapiHomeDsmSection = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  note?: string | null;
  cards?: Array<StrapiHomeDsmCard | { attributes?: StrapiHomeDsmCard }> | null;
};

type StrapiHomeMarketplace = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  chips?: Array<StrapiTextItem | { attributes?: StrapiTextItem }> | null;
};

type StrapiHomeCeoFeature = {
  eyebrow?: string | null;
  title?: string | null;
  description?: Array<StrapiTextItem | { attributes?: StrapiTextItem }> | null;
};

type StrapiHomeNewsSection = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  cards?: Array<StrapiFeatureCard | { attributes?: StrapiFeatureCard }> | null;
};

type StrapiHomeFinalCta = {
  title?: string | null;
  highlight?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

type StrapiHomeSeo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  openGraphTitle?: string | null;
  openGraphDescription?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  shareImage?: unknown;
};

type StrapiHomePageDocument = {
  seo?: StrapiHomeSeo | { attributes?: StrapiHomeSeo } | null;
  hero?: StrapiHomeHero | { attributes?: StrapiHomeHero } | null;
  trustedCompanies?: StrapiHomeTrustedCompanies | { attributes?: StrapiHomeTrustedCompanies } | null;
  pillars?: StrapiHomePillars | { attributes?: StrapiHomePillars } | null;
  platformBanner?: StrapiHomePlatformBanner | { attributes?: StrapiHomePlatformBanner } | null;
  platformPowers?: StrapiHomePlatformPowers | { attributes?: StrapiHomePlatformPowers } | null;
  dsm?: StrapiHomeDsmSection | { attributes?: StrapiHomeDsmSection } | null;
  marketplace?: StrapiHomeMarketplace | { attributes?: StrapiHomeMarketplace } | null;
  ceoFeature?: StrapiHomeCeoFeature | { attributes?: StrapiHomeCeoFeature } | null;
  news?: StrapiHomeNewsSection | { attributes?: StrapiHomeNewsSection } | null;
  finalCta?: StrapiHomeFinalCta | { attributes?: StrapiHomeFinalCta } | null;
};

type StrapiSingleResponse<T> = {
  data?: T | { attributes?: T } | null;
};

function mapTextItemList(
  items: Array<StrapiTextItem | { attributes?: StrapiTextItem }> | null | undefined,
  fallback: readonly string[],
) {
  const values =
    items
      ?.map((item) => unwrapStrapiEntity<StrapiTextItem>(item)?.value?.trim())
      .filter((value): value is string => Boolean(value)) ?? [];

  return values.length > 0 ? values : [...fallback];
}

function mapFeatureCards(
  items: Array<StrapiFeatureCard | { attributes?: StrapiFeatureCard }> | null | undefined,
  fallback: readonly (HomePillarData | HomePowerData | HomeNewsCardData)[],
): FeatureCardModel[] {
  const fallbackCard = {
    icon: undefined as string | undefined,
    title: "",
    description: "",
  };

  const cards: FeatureCardModel[] =
    items?.map((item, index) => {
      const normalized = unwrapStrapiEntity<StrapiFeatureCard>(item);
      const base = fallback[index] ?? fallback[fallback.length - 1] ?? fallbackCard;

      return {
        icon: normalizeText(normalized?.icon, "icon" in base ? base.icon ?? "" : ""),
        title: normalizeText(normalized?.title, base.title),
        description: normalizeText(normalized?.description, base.description),
      };
    }) ?? [];

  return cards.length > 0
    ? cards
    : fallback.map((item) => ({
        icon: "icon" in item ? item.icon : undefined,
        title: item.title,
        description: item.description,
      }));
}

function mapMetricItems(
  items: Array<StrapiMetric | { attributes?: StrapiMetric }> | null | undefined,
  fallback: readonly HomeMetricData[],
): HomeMetricData[] {
  const fallbackMetric = {
    value: "",
    caption: "",
  };

  const metrics =
    items?.map((item, index) => {
      const normalized = unwrapStrapiEntity<StrapiMetric>(item);
      const base = fallback[index] ?? fallback[fallback.length - 1] ?? fallbackMetric;

      return {
        value: normalizeText(normalized?.value, base.value),
        caption: normalizeText(normalized?.caption, base.caption),
      };
    }) ?? [];

  return metrics.length > 0 ? metrics : fallback.map((item) => ({ ...item }));
}

function mapHero(
  hero: StrapiHomeHero | { attributes?: StrapiHomeHero } | null | undefined,
): HomeHeroData {
  const normalized = unwrapStrapiEntity<StrapiHomeHero>(hero);

  return {
    announcementLabel: normalizeText(normalized?.announcementLabel, homePageData.hero.announcementLabel),
    announcementText: normalizeText(normalized?.announcementText, homePageData.hero.announcementText),
    title: normalizeText(normalized?.title, homePageData.hero.title),
    description: normalizeText(normalized?.description, homePageData.hero.description),
    ctaLabel: normalizeText(normalized?.ctaLabel, homePageData.hero.ctaLabel),
    ctaHref: normalizeText(normalized?.ctaHref, homePageData.hero.ctaHref),
  };
}

function mapTrustedCompanies(
  trustedCompanies:
    | StrapiHomeTrustedCompanies
    | { attributes?: StrapiHomeTrustedCompanies }
    | null
    | undefined,
): HomeTrustedCompaniesData {
  const normalized = unwrapStrapiEntity<StrapiHomeTrustedCompanies>(trustedCompanies);

  return {
    eyebrow: normalizeText(normalized?.eyebrow, homePageData.trustedCompanies.eyebrow),
    companies: mapTextItemList(normalized?.companies, homePageData.trustedCompanies.companies),
  };
}

function mapPillars(
  pillars: StrapiHomePillars | { attributes?: StrapiHomePillars } | null | undefined,
): HomePillarsSectionData {
  const normalized = unwrapStrapiEntity<StrapiHomePillars>(pillars);
  const fallbackPillars = homePageData.pillars.pillars;

  return {
    eyebrow: normalizeText(normalized?.eyebrow, homePageData.pillars.eyebrow),
    title: normalizeText(normalized?.title, homePageData.pillars.title),
    pillars: mapFeatureCards(normalized?.pillars, fallbackPillars).map((item, index) => ({
      icon: item.icon || fallbackPillars[index]?.icon,
      title: item.title,
      description: item.description,
    })),
  };
}

function mapPlatformBanner(
  platformBanner:
    | StrapiHomePlatformBanner
    | { attributes?: StrapiHomePlatformBanner }
    | null
    | undefined,
): HomePlatformBannerData {
  const normalized = unwrapStrapiEntity<StrapiHomePlatformBanner>(platformBanner);

  return {
    title: normalizeText(normalized?.title, homePageData.platformBanner.title),
    description: normalizeText(normalized?.description, homePageData.platformBanner.description),
    ctaLabel: normalizeText(normalized?.ctaLabel, homePageData.platformBanner.ctaLabel),
    ctaHref: normalizeText(normalized?.ctaHref, homePageData.platformBanner.ctaHref),
    complianceText: normalizeText(
      normalized?.complianceText,
      homePageData.platformBanner.complianceText,
    ),
  };
}

function mapPlatformPowers(
  platformPowers:
    | StrapiHomePlatformPowers
    | { attributes?: StrapiHomePlatformPowers }
    | null
    | undefined,
): HomePlatformPowersData {
  const normalized = unwrapStrapiEntity<StrapiHomePlatformPowers>(platformPowers);
  const fallbackPowers = homePageData.platformPowers.powers;

  return {
    eyebrow: normalizeText(normalized?.eyebrow, homePageData.platformPowers.eyebrow),
    title: normalizeText(normalized?.title, homePageData.platformPowers.title),
    powers: mapFeatureCards(normalized?.powers, fallbackPowers).map(
      ({ title, description }) => ({ title, description }),
    ),
  };
}

function mapDsm(
  dsm: StrapiHomeDsmSection | { attributes?: StrapiHomeDsmSection } | null | undefined,
): HomeDsmSectionData {
  const normalized = unwrapStrapiEntity<StrapiHomeDsmSection>(dsm);
  const fallbackCards = homePageData.dsm.cards;

  return {
    eyebrow: normalizeText(normalized?.eyebrow, homePageData.dsm.eyebrow),
    title: normalizeText(normalized?.title, homePageData.dsm.title),
    description: normalizeText(normalized?.description, homePageData.dsm.description),
    note: normalizeText(normalized?.note, homePageData.dsm.note),
    cards: (normalized?.cards?.length ? normalized.cards : fallbackCards).map((card, index) => {
      const fallbackCard = fallbackCards[index] ?? fallbackCards[fallbackCards.length - 1];
      const normalizedCard = unwrapStrapiEntity<StrapiHomeDsmCard>(card);

      return {
        name: normalizeText(normalizedCard?.name, fallbackCard.name),
        description: normalizeText(normalizedCard?.description, fallbackCard.description),
        metrics: mapMetricItems(normalizedCard?.metrics, fallbackCard.metrics),
      };
    }),
  };
}

function mapMarketplace(
  marketplace: StrapiHomeMarketplace | { attributes?: StrapiHomeMarketplace } | null | undefined,
): HomeMarketplaceData {
  const normalized = unwrapStrapiEntity<StrapiHomeMarketplace>(marketplace);

  return {
    eyebrow: normalizeText(normalized?.eyebrow, homePageData.marketplace.eyebrow),
    title: normalizeText(normalized?.title, homePageData.marketplace.title),
    description: normalizeText(normalized?.description, homePageData.marketplace.description),
    chips: mapTextItemList(normalized?.chips, homePageData.marketplace.chips),
  };
}

function mapCeoFeature(
  ceoFeature: StrapiHomeCeoFeature | { attributes?: StrapiHomeCeoFeature } | null | undefined,
): HomeCeoFeatureData {
  const normalized = unwrapStrapiEntity<StrapiHomeCeoFeature>(ceoFeature);

  return {
    eyebrow: normalizeText(normalized?.eyebrow, homePageData.ceoFeature.eyebrow),
    title: normalizeText(normalized?.title, homePageData.ceoFeature.title),
    description:
      mapTextItemList(normalized?.description, homePageData.ceoFeature.description),
  };
}

function mapNews(
  news: StrapiHomeNewsSection | { attributes?: StrapiHomeNewsSection } | null | undefined,
): HomeNewsSectionData {
  const normalized = unwrapStrapiEntity<StrapiHomeNewsSection>(news);

  return {
    eyebrow: normalizeText(normalized?.eyebrow, homePageData.news.eyebrow),
    title: normalizeText(normalized?.title, homePageData.news.title),
    description: normalizeText(normalized?.description, homePageData.news.description),
    cards: mapFeatureCards(normalized?.cards, homePageData.news.cards).map(
      ({ title, description }) => ({ title, description }),
    ),
  };
}

function mapFinalCta(
  finalCta: StrapiHomeFinalCta | { attributes?: StrapiHomeFinalCta } | null | undefined,
): HomeFinalCtaData {
  const normalized = unwrapStrapiEntity<StrapiHomeFinalCta>(finalCta);

  return {
    title: normalizeText(normalized?.title, homePageData.finalCta.title),
    highlight: normalizeText(normalized?.highlight, homePageData.finalCta.highlight),
    description: normalizeText(normalized?.description, homePageData.finalCta.description),
    ctaLabel: normalizeText(normalized?.ctaLabel, homePageData.finalCta.ctaLabel),
    ctaHref: normalizeText(normalized?.ctaHref, homePageData.finalCta.ctaHref),
  };
}

function mapSeo(
  seo: StrapiHomeSeo | { attributes?: StrapiHomeSeo } | null | undefined,
): HomePageSeoData {
  const normalized = unwrapStrapiEntity<StrapiHomeSeo>(seo);

  return {
    metaTitle: normalizeText(normalized?.metaTitle, defaultSeo.metaTitle),
    metaDescription: normalizeText(normalized?.metaDescription, defaultSeo.metaDescription),
    canonicalUrl: normalizeText(normalized?.canonicalUrl, defaultSeo.canonicalUrl),
    openGraphTitle: normalizeText(normalized?.openGraphTitle, defaultSeo.openGraphTitle),
    openGraphDescription: normalizeText(
      normalized?.openGraphDescription,
      defaultSeo.openGraphDescription,
    ),
    twitterTitle: normalizeText(normalized?.twitterTitle, defaultSeo.twitterTitle),
    twitterDescription: normalizeText(
      normalized?.twitterDescription,
      defaultSeo.twitterDescription,
    ),
    shareImageUrl: resolveStrapiMediaUrl(normalized?.shareImage, STRAPI_BASE_URL),
  };
}

function mapHomePageDocument(
  document: StrapiHomePageDocument | { attributes?: StrapiHomePageDocument } | null | undefined,
): HomePageContent {
  const normalized = unwrapStrapiEntity<StrapiHomePageDocument>(document);

  return {
    data: {
      hero: mapHero(normalized?.hero),
      trustedCompanies: mapTrustedCompanies(normalized?.trustedCompanies),
      pillars: mapPillars(normalized?.pillars),
      platformBanner: mapPlatformBanner(normalized?.platformBanner),
      platformPowers: mapPlatformPowers(normalized?.platformPowers),
      dsm: mapDsm(normalized?.dsm),
      marketplace: mapMarketplace(normalized?.marketplace),
      ceoFeature: mapCeoFeature(normalized?.ceoFeature),
      news: mapNews(normalized?.news),
      finalCta: mapFinalCta(normalized?.finalCta),
    },
    seo: mapSeo(normalized?.seo),
  };
}

function buildHomeMetadata(seo: HomePageSeoData): Metadata {
  const title = seo.metaTitle || defaultSeo.metaTitle;
  const description = seo.metaDescription || defaultSeo.metaDescription;
  const canonical = seo.canonicalUrl || defaultSeo.canonicalUrl;
  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: seo.openGraphTitle || title,
      description: seo.openGraphDescription || description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: seo.shareImageUrl ? "summary_large_image" : "summary",
      title: seo.twitterTitle || title,
      description: seo.twitterDescription || description,
    },
  };

  if (seo.shareImageUrl) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [seo.shareImageUrl],
    };

    metadata.twitter = {
      ...metadata.twitter,
      images: [seo.shareImageUrl],
    };
  }

  return metadata;
}

const loadHomePage = cache(async (): Promise<HomePageContent> => {
  try {
    const response = await fetchStrapi<StrapiSingleResponse<StrapiHomePageDocument>>(
      "/api/home-page",
      {
        query: {
          "populate[seo][populate][shareImage]": "*",
        },
        revalidate: 300,
      },
    );

    return mapHomePageDocument(response.data);
  } catch {
    return {
      data: homePageData,
      seo: defaultSeo,
    };
  }
});

export async function getHomePage() {
  return loadHomePage();
}

export async function getHomePageMetadata() {
  const { seo } = await loadHomePage();
  return buildHomeMetadata(seo);
}

export async function getHero() {
  const { data } = await loadHomePage();
  return data.hero;
}
