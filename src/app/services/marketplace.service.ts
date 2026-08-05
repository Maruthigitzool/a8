import { apiClient } from "@/app/lib/api/http-client";
import { MarketplaceSection } from "@/types/marketplace";

interface HomeResponse {
    data: {
        Section: Array<MarketplaceSection>;
    };
}

export async function getMarketplaceSection(): Promise<MarketplaceSection | null> {
    const response = await apiClient.get<HomeResponse>(
        "/home?populate[Section][on][section-marketplace.section-marketplace][populate][SectionHeader]=*&populate[Section][on][section-marketplace.section-marketplace][populate][MarketPlaceProduct][populate]=*"
    );
    console.log("marketservcie file resposne", response.data); // Log the entire response for debugging
    return (
        response.data.Section.find(
            (section) =>
                section.__component ===
                "section-marketplace.section-marketplace"
        ) ?? null
    );
}