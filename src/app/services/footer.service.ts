import { cache } from "react";

import { apiClient } from "@/app/lib/api/http-client";
import type { Locale } from "@/app/lib/locale";
import type { FooterResponse } from "@/types/footer";

const FOOTER_ENDPOINT = "/footer";

export const getFooter = cache(async (locale: Locale = "en") => {
  const url = `${FOOTER_ENDPOINT}?locale=${locale}&populate[Section][populate]=*`;

  return apiClient.get<FooterResponse>(url);
});
