import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionAnimator } from "./section-animator";
import type { MarketplaceSection as MarketplaceSectionData } from "@/types/marketplace";

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
    .join(" ");
}

type MarketplaceSectionProps = {
  section: MarketplaceSectionData | null;
};

export function MarketplaceSection({ section }: MarketplaceSectionProps) {
  if (!section) {
    return null;
  }

  return (
    <Section tone="muted" className="text-center">
      <Container>
        <SectionAnimator animation="stack">
          <SectionHeading
            eyebrow={section.SectionHeader.SubTitle}
            title={section.SectionHeader.Title}
            description={richTextToString(
              section.SectionHeader.Description,
            )}
            className="flex flex-col items-center"
          />

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {(section.MarketPlaceProduct?.Product ?? []).map((product) => (
              <span key={product.id} className="pill" data-gsap-item>
                {product.Title}
              </span>
            ))}
          </div>
        </SectionAnimator>
      </Container>
    </Section>
  );
}
