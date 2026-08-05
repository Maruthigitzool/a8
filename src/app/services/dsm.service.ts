import { apiClient } from "@/app/lib/api/http-client";
import { DsmSection } from "@/types/dsm";

interface HomeResponse {
    data: {
        Section: DsmSection[];
    };
}

export async function getDsmSection(): Promise<DsmSection | null> {
    const response = await apiClient.get<HomeResponse>(
        "/home?populate[Section][on][section-dsm.section-dsm][populate][SectionHeader]=*&populate[Section][on][section-dsm.section-dsm][populate][DimondCards][populate][DimondCard][populate][TextCard]=*"
    );

    return (
        response.data.Section.find(
            (section) =>
                section.__component === "section-dsm.section-dsm"
        ) ?? null
    );
}