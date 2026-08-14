import type { Locale } from "@/app/lib/locale";
import { findHomeSection, findHomeSections } from "@/app/lib/home-sections";
import { getAnnouncements } from "@/app/services/announcement.service";
import { getClients } from "@/app/services/client.service";
import { getHomePage } from "@/app/services/home-api.service";
import { getNews } from "@/app/services/news.service";
import type { FeatureHighlightsSection } from "@/types/feature-highlights";
import type { DsmSection as DsmSectionData } from "@/types/dsm";
import type { MarketplaceSection as MarketplaceSectionData } from "@/types/marketplace";
import type { Banner } from "@/types/banner";
import type { HomeSectionApi } from "@/types/home-api";

import { CeoFeatureSection } from "@/components/home/ceo-feature-section";
import { CtaSection } from "@/components/home/cta-section";
import { DsmSection } from "@/components/home/dsm-section";
import { FeatureHighlightsSection as FeatureHighlights } from "@/components/home/feature-highlights";
import { HeroSection } from "@/components/home/hero-section";
import { MarketplaceSection } from "@/components/home/marketplace-section";
import { NewsSection } from "@/components/home/news-section";
import { PlatformBannerSection } from "@/components/home/platform-banner-section";
import { PlatformPowersSection } from "@/components/home/platform-powers-section";

type HomePageContentProps = {
  locale: Locale;
};

type CtaSectionItem = HomeSectionApi & {
  ComplianceText?: string;
};

type ClientItem = {
  id: number;
  documentId?: string;
  Title: string;
  Url?: string | null;
};

export async function HomePageContent({ locale }: HomePageContentProps) {
  const [homeResponse, announcementsResponse, newsItems, clientsResponse] =
    await Promise.all([
      getHomePage(locale).catch(() => null),
      getAnnouncements(locale).catch(() => ({
        data: [] as Array<{ Title: string; Url?: string | null }>,
      })),
      getNews(locale).catch(() => []),
      getClients().catch(() => ({ data: [] as ClientItem[] })),
    ]);

  const sections = homeResponse?.data?.Section ?? [];

  const banner = findHomeSection(
    sections,
    "home-components.banner",
  ) as Banner | null;

  const featureHighlights = findHomeSection<FeatureHighlightsSection>(
    sections,
    "section-feature-highlights.section-feature-highlights",
  );

  const platformCapability = findHomeSection(
    sections,
    "section-platform-capability.section-platform-capability",
  );

  const dsmSection = findHomeSection<DsmSectionData>(
    sections,
    "section-dsm.section-dsm",
  );

  const marketplaceSection = findHomeSection<MarketplaceSectionData>(
    sections,
    "section-marketplace.section-marketplace",
  );

  const spotlightSection = findHomeSection(
    sections,
    "section-spotlight.section-spotlight",
  );

  const newsSection = findHomeSection(
    sections,
    "section-news.section-news",
  );

  const ctaSections = findHomeSections<CtaSectionItem>(
    sections,
    "common.cta",
  );

  const platformCta = ctaSections.find((item) =>
    Boolean(item.ComplianceText),
  );

  const finalCta =
    ctaSections.find((item) => !item.ComplianceText) ??
    ctaSections[ctaSections.length - 1];

  const announcement = announcementsResponse.data[0] ?? null;
  const clients = clientsResponse.data ?? [];

  return (
    <div>
      <HeroSection
        banner={banner}
        announcement={announcement}
        clients={clients}
      />

      <FeatureHighlights section={featureHighlights} />

      <PlatformBannerSection cta={platformCta ?? null} />

      <PlatformPowersSection section={platformCapability} />

      <DsmSection section={dsmSection} />

      <MarketplaceSection section={marketplaceSection} />

      <CeoFeatureSection section={spotlightSection} />

      <NewsSection newsSection={newsSection} news={newsItems} />

      <CtaSection cta={finalCta ?? null} />
    </div>
  );
}
