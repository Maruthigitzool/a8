import { Button } from "@/components/ui/button";
import { richTextToString } from "@/app/utils/rich-text";
import type { Banner as BannerData } from "@/types/banner";

function splitHeadlineWords(headline: string) {
  return headline.split(/\s+/).filter(Boolean);
}

function splitCopySegments(text: string) {
  return text
    .split(/(?<=[.!?])\s+/g)
    .filter(Boolean)
    .map((segment) => segment.trim());
}

type BannerProps = {
  banner: BannerData | null;
};

export function Banner({ banner }: BannerProps) {
  if (!banner) {
    return null;
  }

  const titleWords = splitHeadlineWords(banner.Title);
  const descriptionSegments = splitCopySegments(
    richTextToString(banner.Description),
  );

  return (
    <>
      <h1 className="type-hero" data-gsap-hero-title>
        {titleWords.map((word, index) => (
          <span className="hero-word-mask" key={`${word}-${index}`}>
            <span className="hero-word" data-gsap-hero-word>
              {word}
            </span>
          </span>
        ))}
      </h1>

      <div
        className="mx-auto mb-4 mt-6 max-w-[640px] text-[length:var(--ds-text-hero-copy)] text-muted lg:mb-10"
        data-gsap-hero-description
      >
        {descriptionSegments.map((segment, index) => (
          <p
            key={`description-segment-${index}`}
            className={`hero-copy-mask ${index > 0 ? "mt-4" : ""}`}
          >
            <span className="hero-copy" data-gsap-hero-copy>
              {segment}
            </span>
          </p>
        ))}
      </div>

      <div className="mt-10 inline-flex" data-gsap-hero-cta>
        <Button
          href={banner.Button.ButtonUrl}
          variant="outline"
          size="lg"
          dataGsap="hero-button"
        >
          {banner.Button.ButtonText}
        </Button>
      </div>
    </>
  );
}
