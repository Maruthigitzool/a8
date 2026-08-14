import { cache } from "react";

import { apiClient } from "@/app/lib/api/http-client";
import type { Locale } from "@/app/lib/locale";
import type { AnnouncementApiResponse } from "@/types/announcement";

const ANNOUNCEMENT_ENDPOINT = "/a8-announcements";

export const getAnnouncements = cache(async (locale: Locale = "en") => {
  return apiClient.get<AnnouncementApiResponse>(
    `${ANNOUNCEMENT_ENDPOINT}?locale=${locale}&populate=*`,
  );
});