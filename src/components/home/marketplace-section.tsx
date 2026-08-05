import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getMarketplaceSection } from "@/app/services/marketplace.service";
import { SectionAnimator } from "./section-animator";

function richTextToString(
  blocks: {
    children?: {
      text?: string;
    }[];
  }[] = []
) {
  return blocks
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text ?? "")
    .join(" ");
}

export async function MarketplaceSection() {
  const marketplaceSection = await getMarketplaceSection();
  if (!marketplaceSection) {
    return null;
  }

  return (
    <section className="bg-surface/95 py-[88px] text-center">
      <Container>
        <SectionAnimator animation="stack">
          <SectionHeading
            eyebrow={marketplaceSection.SectionHeader.SubTitle}
            title={marketplaceSection.SectionHeader.Title}
            description={richTextToString(
              marketplaceSection.SectionHeader.Description
            )}
            className="flex flex-col items-center"
          />

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {marketplaceSection.MarketPlaceProduct.Product.map((product) => (
              <span
                key={product.id}
                className="rounded-xl border border-line bg-white px-7 py-4 font-display text-[16px] font-semibold text-foreground"
                data-gsap-item
              >
                {product.Title}
              </span>
            ))}
          </div>
        </SectionAnimator>
      </Container>
    </section>
  );
}
