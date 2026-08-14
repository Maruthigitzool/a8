import { apiClient } from "@/app/lib/api/http-client";
import type { Locale } from "@/app/lib/locale";
import { DsmSection } from "@/types/dsm";

interface HomeResponse {
  data: {
    Section: DsmSection[];
  };
}

export async function getDsmSection(
  locale: Locale = "en",
): Promise<DsmSection | null> {
  const response = await apiClient.get<HomeResponse>(
    `/home?locale=${locale}&populate[Section][on][section-dsm.section-dsm][populate][SectionHeader]=*&populate[Section][on][section-dsm.section-dsm][populate][DimondCards][populate][DimondCard][populate][TextCard]=*`,
  );

  return (
    response.data.Section.find(
      (section) => section.__component === "section-dsm.section-dsm",
    ) ?? null
  );
}