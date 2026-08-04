import { apiClient } from "@/app/lib/api/http-client";
import { FeatureHighlightsSection } from "@/types/feature-highlights";

const HOME_ENDPOINT =
    "/home?populate[Section][on][section-feature-highlights.section-feature-highlights][populate][IconCard][populate]=*&populate[Section][on][section-feature-highlights.section-feature-highlights][populate][SectionHeader]=*";

interface HomeResponse {
    data: {
        Section: FeatureHighlightsSection[];
    };
}

export async function getFeatureHighlights(): Promise<FeatureHighlightsSection | null> {
    const response = await apiClient.get<HomeResponse>(HOME_ENDPOINT);
    console.log("API Response:", response.data); // Log the entire response for debugging
    return (
        response.data.Section.find(
            (section) =>
                section.__component ===
                "section-feature-highlights.section-feature-highlights"
        ) ?? null
    );
}