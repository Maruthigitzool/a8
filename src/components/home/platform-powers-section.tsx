import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionAnimator } from "./section-animator";
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
    .join(" ");
}

type PlatformPowersSectionProps = {
  section: HomeSectionApi | null;
};

export function PlatformPowersSection({ section }: PlatformPowersSectionProps) {
  if (!section) {
    return null;
  }

  const header =
    (section.SectionHeader as { SubTitle?: string; Title?: string; Description?: { children?: { text?: string }[] }[] }[] | undefined)?.[0] ??
    (section.SectionHeader as {
      SubTitle?: string;
      Title?: string;
      Description?: { children?: { text?: string }[] }[];
    });

  const textCards =
    (section as HomeSectionApi & {
      TextCard?: Array<{
        id: number;
        Title: string;
        Description: { children?: { text?: string }[] }[];
      }>;
    }).TextCard ?? [];

  return (
    <Section tone="muted" id="platform-powers">
      <Container>
        <SectionAnimator animation="stack">
          <SectionHeading
            eyebrow={header?.SubTitle ?? ""}
            title={header?.Title ?? ""}
            description={
              header?.Description ? richTextToString(header.Description) : ""
            }
          />

          <div className="mt-block grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {textCards.map((card) => (
              <div
                key={card.id}
                className="card p-card-lg"
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
    </Section>
  );
}
