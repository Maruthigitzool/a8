import { apiClient } from "@/app/lib/api/http-client";
import type { ClientApiResponse } from "@/types/client";

const CLIENT_ENDPOINT = "/a8-clients";

export async function getClients() {
    return apiClient.get<ClientApiResponse>(CLIENT_ENDPOINT);
}