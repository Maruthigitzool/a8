import { Button } from "@/components/ui/button";
import { richTextToString } from "@/app/utils/rich-text";
import { getBanner } from "@/app/services/banner.service";

export async function Banner() {
    const banner = await getBanner();

    if (!banner) return null;

    return (
        <>
            <h1 className="mx-auto max-w-5xl font-display text-[clamp(2.375rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-brand" data-gsap-item>
                {banner.Title}
            </h1>

            <p className=" mt-6  text-[clamp(18px,2vw,24px)]  max-w-[640px] mx-auto mb-10 text-muted" data-gsap-item>
                {richTextToString(banner.Description)}
            </p>

            <div className="mt-10">
                <Button href={banner.Button.ButtonUrl} variant="outline" className="text-brand font-semibold text-[17px] py-4 px-[34px]" dataGsap="hero-button">
                    {banner.Button.ButtonText}
                </Button>
            </div>
        </>
    );
}
