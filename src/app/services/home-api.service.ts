import { apiClient } from "../lib/api/http-client";
import type { HomeApiResponse } from "@/types/home-api";

const HOME_ENDPOINT = "/home?populate[Section][populate]=*";

export async function getHomePage() {
    return apiClient.get<HomeApiResponse>(HOME_ENDPOINT);
}