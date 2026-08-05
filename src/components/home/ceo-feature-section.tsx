import { getHomePage } from "@/app/services/home-api.service";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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
    .join("\n\n");
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
        <SectionAnimator animation="split">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* YouTube Video */}
            <div className="overflow-hidden rounded-3xl shadow-lg" data-gsap-media>
              <iframe
                className="aspect-video w-full"
                src={spotlightSection.VideoUrl}
                title="Articul8 Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Content */}
            <div data-gsap-content>
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
        </SectionAnimator>
      </Container>
    </section>
  );
}
