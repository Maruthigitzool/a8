import { getHomePage } from "@/app/services/home-api.service";
import { Container } from "@/components/ui/container";
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
    .join("\n\n\n");
}

export async function CeoFeatureSection() {
  const { data } = await getHomePage();

  const spotlightSection = data.Section.find(
    (section) =>
      section.__component === "section-spotlight.section-spotlight"
  );

  if (!spotlightSection) {
    return null;
  }

  return (
    <section className="py-[88px]">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Video Placeholder */}
          <div className="aspect-video rounded-3xl bg-slate-900" />

          {/* Content */}
          <div>
            <SectionHeading
              eyebrow={spotlightSection.SectionHeader?.SubTitle ?? ""}
              title={spotlightSection.SectionHeader?.Title ?? ""}
              description={richTextToString(
                spotlightSection.SectionHeader?.Description
              )}
              align="left"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}