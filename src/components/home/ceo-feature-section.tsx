import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionAnimator } from "./section-animator";
import { LazyYoutube } from "./lazy-youtube";
import type { HomeSectionApi } from "@/types/home-api";

function richTextToString(
  blocks: {
    children?: {
      text?: string;
    }[];
  }[] = [],
) {
  return blocks
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text ?? "")
    .join("\n\n");
}

type CeoFeatureSectionProps = {
  section: HomeSectionApi | null;
};

export function CeoFeatureSection({ section }: CeoFeatureSectionProps) {
  if (!section) {
    return null;
  }

  return (
    <Section>
      <Container>
        <SectionAnimator animation="split">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-lg" data-gsap-media>
              <LazyYoutube
                src={section.VideoUrl ?? ""}
                title={
                  section.SectionHeader?.Title ??
                  "Articul8 product demo video"
                }
              />
            </div>

            <div data-gsap-content>
              <SectionHeading
                eyebrow={section.SectionHeader?.SubTitle ?? ""}
                title={section.SectionHeader?.Title ?? ""}
                description={richTextToString(
                  section.SectionHeader?.Description,
                )}
                className="text-left"
              />
            </div>
          </div>
        </SectionAnimator>
      </Container>
    </Section>
  );
}
