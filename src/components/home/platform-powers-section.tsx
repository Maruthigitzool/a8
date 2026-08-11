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
    .join(" ");
}

export async function PlatformPowersSection() {
  const { data } = await getHomePage();

  const platformCapability = data.Section.find(
    (section) =>
      section.__component ===
      "section-platform-capability.section-platform-capability"
  );

  if (!platformCapability) {
    return null;
  }

  const header = (platformCapability.SectionHeader as any)?.[0] ?? (platformCapability.SectionHeader as any);

  return (
    <section className="bg-surface/95 py-[88px]" id="platform-powers">
      <Container>
        <SectionAnimator animation="stack">
          <SectionHeading
            eyebrow={header?.SubTitle ?? ""}
            title={header?.Title ?? ""}
            description={header?.Description ? richTextToString(header.Description) : ""}
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(platformCapability as any).TextCard.map((card: any) => (
              <div
                key={card.id}
                className="rounded-2xl border border-line bg-white p-8"
                data-gsap-item
              >
                <h3 className="mb-4 font-display text-3xl font-bold text-brand">
                  {card.Title}
                </h3>

                <p className="text-muted">
                  {richTextToString(card.Description)}
                </p>
              </div>
            ))}
          </div>
        </SectionAnimator>
      </Container>
    </section>
  );
}
