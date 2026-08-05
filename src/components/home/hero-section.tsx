import { Container } from "@/components/ui/container";
import { Announcement } from "./announcement";
import { Banner } from "../ui/Banner";
import { SectionAnimator } from "./section-animator";


export function HeroSection() {
  return (
    <section className="pb-6 pt-16 text-center sm:pt-20">
      <Container>
        <SectionAnimator animation="hero">
          <Announcement />
          <Banner></Banner>
        </SectionAnimator>
      </Container>
    </section>
  );
}
