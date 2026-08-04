import { apiClient } from "@/app/lib/api/http-client";
import type { AnnouncementApiResponse } from "@/types/announcement";

const ANNOUNCEMENT_ENDPOINT = "/a8-announcements";

export async function getAnnouncements() {
    return apiClient.get<AnnouncementApiResponse>(ANNOUNCEMENT_ENDPOINT);
}