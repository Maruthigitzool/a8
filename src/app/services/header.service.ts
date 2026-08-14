import { cache } from "react";

import { apiClient } from "@/app/lib/api/http-client";
import type { Locale } from "@/app/lib/locale";
import type { HeaderResponse } from "@/types/header";

export const getHeader = cache(async (locale: Locale = "en") => {
  const url = `/header?locale=${locale}&populate[Section][populate]=*`;

  return apiClient.get<HeaderResponse>(url);
});