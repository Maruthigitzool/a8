import { cache } from "react";

import { apiClient } from "../lib/api/http-client";
import type { Locale } from "@/app/lib/locale";
import type { HomeApiResponse } from "@/types/home-api";

const HOME_POPULATE_QUERY = [
  "populate[Section][on][home-components.banner][populate]=*",
  "populate[Section][on][section-feature-highlights.section-feature-highlights][populate][SectionHeader]=*",
  "populate[Section][on][section-feature-highlights.section-feature-highlights][populate][IconCard][populate]=*",
  "populate[Section][on][section-platform-capability.section-platform-capability][populate][SectionHeader]=*",
  "populate[Section][on][section-platform-capability.section-platform-capability][populate][TextCard]=*",
  "populate[Section][on][section-dsm.section-dsm][populate][SectionHeader]=*",
  "populate[Section][on][section-dsm.section-dsm][populate][DimondCards][populate][DimondCard][populate][TextCard]=*",
  "populate[Section][on][section-marketplace.section-marketplace][populate][SectionHeader]=*",
  "populate[Section][on][section-marketplace.section-marketplace][populate][MarketPlaceProduct][populate]=*",
  "populate[Section][on][section-spotlight.section-spotlight][populate][SectionHeader]=*",
  "populate[Section][on][section-news.section-news][populate][SectionHeader]=*",
  "populate[Section][on][common.cta][populate]=*",
].join("&");

export const getHomePage = cache(async function getHomePage(
  locale: Locale = "en",
): Promise<HomeApiResponse> {
  const url = `/home?locale=${locale}&${HOME_POPULATE_QUERY}`;

  return apiClient.get<HomeApiResponse>(url);
});
