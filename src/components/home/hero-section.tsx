import { Container } from "@/components/ui/container";
import { Announcement } from "./announcement";
import { Banner } from "../ui/Banner";
import { TrustedClients } from "./trusted-clients";
import { SectionAnimator } from "./section-animator";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-6 pt-16 text-center sm:pt-20">
      <Container>
        <SectionAnimator animation="hero">
          <div data-gsap-hero-root className="relative">
            <div data-gsap-hero-wrapper className="relative z-10">
              <Announcement />
              <Banner />
            </div>

            <div className="mt-16" data-gsap-hero-trusted-shell>
              <TrustedClients />
            </div>
          </div>
        </SectionAnimator>
      </Container>
    </section>
  );
}
