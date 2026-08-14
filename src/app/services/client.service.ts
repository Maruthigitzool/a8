import { cache } from "react";

import { apiClient } from "@/app/lib/api/http-client";
import type { ClientApiResponse } from "@/types/client";

const CLIENT_ENDPOINT = "/a8-clients";

export const getClients = cache(async () => {
  return apiClient.get<ClientApiResponse>(`${CLIENT_ENDPOINT}?populate=*`);
});
