import { Container } from "@/components/ui/container";
import { getHomePage } from "@/app/services/home-api.service";
import { SectionHeading } from "@/components/ui/section-heading";

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
  const { data } = await getHomePage();

  const marketplaceSection = data.Section.find(
    (section) =>
      section.__component === "section-marketplace.section-marketplace"
  );

  if (!marketplaceSection) {
    return null;
  }
  return (
    <section className="bg-surface/95 py-[88px] text-center">
      <Container>
        <SectionHeading
          eyebrow={marketplaceSection.SectionHeader?.SubTitle ?? ""}
          title={marketplaceSection.SectionHeader?.Title ?? ""}
          description={richTextToString(
            marketplaceSection.SectionHeader?.Description
          )}
          className={"flex flex-col items-center"}
        />

        {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
          {data.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-xl border border-line bg-white px-7 py-4 font-display text-[16px] font-semibold text-foreground"
            >
              {chip}
            </span>
          ))}
        </div> */}
      </Container>
    </section>
  );
}
