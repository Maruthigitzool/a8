import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionAnimator } from "./section-animator";
import { getDsmSection } from "@/app/services/dsm.service";

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

export async function DsmSection() {
  const dsmSection = await getDsmSection();

  if (!dsmSection) {
    return null;
  }

  return (
    <section className="py-[88px]">
      <Container>
        <SectionAnimator animation="dsm">
          <div className="mb-12">
            <SectionHeading
              eyebrow={dsmSection.SectionHeader.SubTitle}
              title={dsmSection.SectionHeader.Title}
              description={richTextToString(
                dsmSection.SectionHeader.Description
              )}
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {dsmSection.DimondCards.DimondCard.map((card) => (
              <article
                key={card.id}
                className="flex flex-col gap-4 rounded-[16px] border border-line bg-white p-7"
                data-gsap-dsm-card
              >

                <div className="font-display text-[24px] font-bold text-foreground">
                  {card.Title}
                </div>

                <p className="text-[15px] text-muted">
                  {richTextToString(card.Description)}
                </p>

                <div className="grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
                  {(card.TextCard ?? []).map((textCard) => (
                    <div key={textCard.id}>
                      <div className="font-display text-[22px] font-bold leading-tight text-brand">
                        {textCard.Title}
                      </div>

                      <div className="mt-1 text-[12.5px] text-muted">
                        {richTextToString(textCard.Description)}
                      </div>
                    </div>
                  ))}
                </div>

                {card.ButtonUrl && (
                  <a
                    href={card.ButtonUrl}
                    className="font-display text-[14px] font-semibold text-brand hover:text-accent"
                    data-gsap-dsm-link
                  >
                    Read More <span aria-hidden="true">→</span>
                  </a>
                )}
              </article>
            ))}
          </div>

          <p
            className="mx-auto mt-9 max-w-3xl text-center text-[15px] text-muted"
            data-gsap-item
          >
            {dsmSection.FooterText}
          </p>
        </SectionAnimator>
      </Container>
    </section>
  );
}