import type { Metadata } from "next";
import { CeoFeatureSection } from "@/components/home/ceo-feature-section";
import { DsmSection } from "@/components/home/dsm-section";
import { CtaSection } from "@/components/home/cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { MarketplaceSection } from "@/components/home/marketplace-section";
import { NewsSection } from "@/components/home/news-section";
import { PlatformBannerSection } from "@/components/home/platform-banner-section";
import { PlatformPowersSection } from "@/components/home/platform-powers-section";

import { getHomePage, getHomePageMetadata } from "@/app/services/home.service";
import { TrustedClients } from "@/components/home/trusted-clients";
import { FeatureHighlightsSection } from "@/components/home/feature-highlights";

export async function generateMetadata(): Promise<Metadata> {
  return getHomePageMetadata();
}

export default async function Home() {
  const { data: homePageData } = await getHomePage();

  return (
    <>
      <HeroSection data={homePageData.hero} />
      <TrustedClients data={homePageData.trustedCompanies}></TrustedClients>
      <FeatureHighlightsSection></FeatureHighlightsSection>
      <PlatformBannerSection data={homePageData.platformBanner} />
      <PlatformPowersSection data={homePageData.platformPowers} />
      <DsmSection data={homePageData.dsm} />
      <MarketplaceSection data={homePageData.marketplace} />
      <CeoFeatureSection data={homePageData.ceoFeature} />
      <NewsSection data={homePageData.news} />
      <CtaSection data={homePageData.cta} />

    </>
  );
}
