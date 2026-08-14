import { richTextToString } from "@/app/utils/rich-text";
import { homePageData } from "@/data/home";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { HomePlatformBannerData } from "@/types/home";
import { SectionAnimator } from "./section-animator";

type CtaSectionItem = {
  Title?: string | Parameters<typeof richTextToString>[0];
  Description?: string | Parameters<typeof richTextToString>[0];
  ComplianceText?: string;
  Button?: {
    ButtonText?: string;
    ButtonUrl?: string;
  };
};

type PlatformBannerSectionProps = {
  cta: CtaSectionItem | null;
};

function toPlainText(
  value?: string | Parameters<typeof richTextToString>[0],
): string {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value.replace(/<[^>]*>/g, "");
  }

  return richTextToString(value);
}

function mapPlatformBanner(section: CtaSectionItem): HomePlatformBannerData {
  return {
    title: toPlainText(section.Title),
    description: toPlainText(section.Description),
    ctaLabel: section.Button?.ButtonText ?? "",
    ctaHref: section.Button?.ButtonUrl ?? "#",
    complianceText: section.ComplianceText ?? "",
  };
}

export function PlatformBannerSection({ cta }: PlatformBannerSectionProps) {
  const bannerData = cta
    ? mapPlatformBanner(cta)
    : homePageData.platformBanner;

  return (
    <Section tone="white" size="none" className="pb-22 pt-0" id="platform">
      <Container>
        <SectionAnimator animation="panel">
          <div className="panel panel-brand" data-gsap-panel>
            <h2
              className="type-heading-lg mb-4"
              data-gsap-item
            >
              {bannerData.title}
            </h2>
            <p
              className="mx-auto mb-8 max-w-3xl text-lg text-white/86"
              data-gsap-item
            >
              {bannerData.description}
            </p>
            <Button
              href={bannerData.ctaHref}
              variant="inverted"
              dataGsap="platform-banner-button"
            >
              {bannerData.ctaLabel}
            </Button>
            {bannerData.complianceText ? (
              <div
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/80"
                data-gsap-item
              >
                <span className="h-2 w-2 rounded-full bg-success" />
                <span>{bannerData.complianceText}</span>
              </div>
            ) : null}
          </div>
        </SectionAnimator>
      </Container>
    </Section>
  );
}
