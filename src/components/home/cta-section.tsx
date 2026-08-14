import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionAnimator } from "./section-animator";

type CtaSectionProps = {
  cta: {
    Title?: string;
    Description?: string;
    Button?: {
      ButtonText?: string;
      ButtonUrl?: string;
    };
  } | null;
};

export function CtaSection({ cta }: CtaSectionProps) {
  if (!cta) return null;

  return (
    <Section tone="white" id="cta">
      <Container>
        <SectionAnimator animation="panel">
          <div className="panel panel-dark" data-gsap-panel>
            <div
              className="type-display [&_.text-accent]:text-accent"
              aria-label={(cta.Title ?? "").replace(/<[^>]*>/g, "")}
              dangerouslySetInnerHTML={{
                __html: cta.Title ?? "",
              }}
              data-gsap-item
            />

            <p className="mx-auto mt-4 text-lg text-white/72" data-gsap-item>
              {cta.Description}
            </p>

            <div className="mt-8">
              <Button
                href={cta.Button?.ButtonUrl ?? "#"}
                variant="accent"
                size="lg"
                dataGsap="cta-button"
              >
                {cta.Button?.ButtonText}
              </Button>
            </div>
          </div>
        </SectionAnimator>
      </Container>
    </Section>
  );
}
