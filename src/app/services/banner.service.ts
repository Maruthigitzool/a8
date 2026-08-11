import { getHomePage } from "./home-api.service";
import type { Banner } from "@/types/banner";

export async function getBanner(): Promise<Banner | null> {
    const { data } = await getHomePage();

    const found = data.Section.find((item) => item.__component === "home-components.banner");

    const banner = found ? (found as unknown as Banner) : null;

    return banner;
}