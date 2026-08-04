import { apiClient } from "@/app/lib/api/http-client";
import type { FooterResponse } from "@/types/footer";

const FOOTER_ENDPOINT =
  "/footer?populate[Section][populate]=*";

export async function getFooter() {
  return apiClient.get<FooterResponse>(FOOTER_ENDPOINT);
}