import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getHomePage } from "@/app/services/home-api.service";
import { SectionAnimator } from "./section-animator";

export async function CtaSection() {
  const { data } = await getHomePage();

  const cta = data.Section.find(
    (item) => item.__component === "common.cta"
  );

  if (!cta) return null;

  return (
    <section className="bg-white py-[88px]" id="cta">
      <Container>
        <SectionAnimator animation="panel">
          <div className="rounded-[24px] bg-foreground px-5 py-16 text-center text-white sm:px-10 sm:py-18" data-gsap-panel>
            <div
              className="font-display max-w-[580px] mx-auto text-[clamp(30px,4vw,52px)] font-bold leading-[1.05] tracking-tight [&_.text-accent]:text-accent"
              dangerouslySetInnerHTML={{
                __html: cta.Title ?? "",
              }}
              data-gsap-item
            />

            <p className="mx-auto mt-4  text-[18px] text-white/72" data-gsap-item>
              {cta.Description}
            </p>

            <div className="mt-8">
              <Button
                href={cta.Button?.ButtonUrl ?? "#"}
                variant="accent"
                className="rounded-xl px-[34px] py-4 text-[17px] font-semibold transition-colors duration-150"
                dataGsap="cta-button"
              >
                {cta.Button?.ButtonText}
              </Button>
            </div>
          </div>
        </SectionAnimator>
      </Container>
    </section>
  );
}
