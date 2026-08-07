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
import { FeatureHighlightsSection } from "@/components/home/feature-highlights";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Articul8",
      url: "https://articul8.ai",
      logo: "https://articul8.ai/logo.png",
      sameAs: ["https://www.linkedin.com/company/articul8ai"],
    },
    {
      "@type": "WebSite",
      url: "https://articul8.ai",
      name: "Articul8",
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return getHomePageMetadata();
}

export default async function Home() {
  const { data: homePageData } = await getHomePage();

  return (
    <>
      {/* JSON-LD structured data for Organization + WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <FeatureHighlightsSection></FeatureHighlightsSection>
      <PlatformBannerSection data={homePageData.platformBanner} />
      <PlatformPowersSection />
      <DsmSection />
      <MarketplaceSection />
      <CeoFeatureSection />
      <NewsSection />
      <CtaSection />
    </>
  );
}
