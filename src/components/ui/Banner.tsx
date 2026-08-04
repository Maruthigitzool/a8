import { Button } from "@/components/ui/button";
import { richTextToString } from "@/app/utils/rich-text";
import { getBanner } from "@/app/services/banner.service";

export async function Banner() {
    const banner = await getBanner();

    if (!banner) return null;

    return (
        <>
            <h1 className="mx-auto max-w-5xl font-display text-[clamp(2.375rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-brand">
                {banner.Title}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-[clamp(1.125rem,2vw,1.5rem)] text-muted">
                {richTextToString(banner.Description)}
            </p>

            <div className="mt-10">
                <Button href={banner.Button.ButtonUrl} variant="outline" className="text-brand">
                    {banner.Button.ButtonText}
                </Button>
            </div>
        </>
    );
}