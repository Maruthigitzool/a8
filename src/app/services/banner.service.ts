import { getHomePage } from "./home-api.service";
import type { Banner } from "@/types/banner";

export async function getBanner(): Promise<Banner | null> {
    const { data } = await getHomePage();

    const banner = data.Section.find(
        (item): item is Banner =>
            item.__component === "home-components.banner"
    );

    return banner ?? null;
}