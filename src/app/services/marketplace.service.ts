import { apiClient } from "@/app/lib/api/http-client";
import type { Locale } from "@/app/lib/locale";
import { MarketplaceSection } from "@/types/marketplace";

interface HomeResponse {
  data: {
    Section: Array<MarketplaceSection>;
  };
}

export async function getMarketplaceSection(
  locale: Locale = "en",
): Promise<MarketplaceSection | null> {
  const response = await apiClient.get<HomeResponse>(
    `/home?locale=${locale}&populate[Section][on][section-marketplace.section-marketplace][populate][SectionHeader]=*&populate[Section][on][section-marketplace.section-marketplace][populate][MarketPlaceProduct][populate]=*`,
  );

  const found = response.data.Section.find(
    (section) =>
      (section as { __component?: string }).__component ===
      "section-marketplace.section-marketplace",
  );

  return found ? (found as unknown as MarketplaceSection) : null;
}