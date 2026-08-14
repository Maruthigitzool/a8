import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionAnimator } from "./section-animator";
import type { DsmSection as DsmSectionData } from "@/types/dsm";

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

type DsmSectionProps = {
  section: DsmSectionData | null;
};

export function DsmSection({ section }: DsmSectionProps) {
  if (!section) {
    return null;
  }

  return (
    <Section>
      <Container>
        <SectionAnimator animation="dsm">
          <div className="mb-block">
            <SectionHeading
              eyebrow={section.SectionHeader.SubTitle}
              title={section.SectionHeader.Title}
              description={richTextToString(
                section.SectionHeader.Description,
              )}
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {(section.DimondCards?.DimondCard ?? []).map((card) => (
              <article
                key={card.id}
                className="card card-padded"
                data-gsap-dsm-card
              >
                <div
                  className="font-display text-2xl font-bold text-foreground"
                  dangerouslySetInnerHTML={{ __html: card.Title }}
                />

                <p className="type-body">
                  {richTextToString(card.Description)}
                </p>

                <div className="grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
                  {(card.TextCard ?? []).map((textCard) => (
                    <div key={textCard.id}>
                      <div className="font-display text-2xl font-bold leading-tight text-brand">
                        {textCard.Title}
                      </div>

                      <div className="mt-1 text-xs text-muted">
                        {richTextToString(textCard.Description)}
                      </div>
                    </div>
                  ))}
                </div>

                {card.ButtonUrl && (
                  <a
                    href={card.ButtonUrl}
                    className="link-brand"
                    data-gsap-dsm-link
                  >
                    Read More <span aria-hidden="true">→</span>
                  </a>
                )}
              </article>
            ))}
          </div>

          <p
            className="type-body mx-auto mt-9 max-w-3xl text-center"
            data-gsap-item
          >
            {section.FooterText}
          </p>
        </SectionAnimator>
      </Container>
    </Section>
  );
}
