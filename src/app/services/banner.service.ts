import type { Locale } from "@/app/lib/locale";
import type { Banner } from "@/types/banner";

import { getHomePage } from "./home-api.service";

export async function getBanner(
  locale: Locale = "en",
): Promise<Banner | null> {
  const { data } = await getHomePage(locale);

  const found = data.Section.find(
    (item) => item.__component === "home-components.banner",
  );

  if (!found) {
    return null;
  }

  return found as unknown as Banner;
}