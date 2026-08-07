import { Button } from "@/components/ui/button";
import { richTextToString } from "@/app/utils/rich-text";
import { getBanner } from "@/app/services/banner.service";

function splitHeadlineWords(headline: string) {
    return headline
        .split(" ")
        .filter(Boolean)
        .map((word) => word.trim());
}

function splitCopySegments(text: string) {
    return text
        .split(/(?<=[.!?])\s+/g)
        .filter(Boolean)
        .map((segment) => segment.trim());
}

export async function Banner() {
    const banner = await getBanner();

    if (!banner) return null;

    const titleWords = splitHeadlineWords(banner.Title);
    const descriptionSegments = splitCopySegments(richTextToString(banner.Description));

    return (
        <>
            <h1
                className="mx-auto max-w-5xl font-display text-[clamp(2.375rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-brand"
                data-gsap-hero-title
            >
                {titleWords.map((word, index) => (
                    <span
                        key={`${word}-${index}`}
                        className={`inline-flex overflow-hidden whitespace-nowrap ${index === titleWords.length - 1 ? "" : "mr-1"}`}
                    >
                        <span className="inline-block" data-gsap-hero-word>
                            {word}
                        </span>
                    </span>
                ))}
            </h1>

            <div className="mt-6 max-w-[640px] mx-auto mb-10 text-muted text-[clamp(18px,2vw,24px)]" data-gsap-hero-description>
                {descriptionSegments.map((segment, index) => (
                    <p key={`description-segment-${index}`} className={index > 0 ? "mt-4" : ""} data-gsap-hero-copy>
                        {segment}
                    </p>
                ))}
            </div>

            <div className="mt-10 inline-flex">
                <Button
                    href={banner.Button.ButtonUrl}
                    variant="outline"
                    className="text-brand font-semibold text-[17px] py-4 px-[34px]"
                    dataGsap="hero-button"
                >
                    {banner.Button.ButtonText}
                </Button>
            </div>
        </>
    );
}
