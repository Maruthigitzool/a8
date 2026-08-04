import { apiClient } from "@/app/lib/api/http-client";
import type { HeaderResponse } from "@/types/header";

const HEADER_ENDPOINT = "/header?populate[Section][populate]=*";

export async function getHeader() {
    return apiClient.get<HeaderResponse>(HEADER_ENDPOINT);
}