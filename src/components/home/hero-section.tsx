import { Container } from "@/components/ui/container";
import { Announcement } from "./announcement";
import { Banner } from "../ui/Banner";


export function HeroSection() {
  return (
    <section className="pb-6 pt-16 text-center sm:pt-20">
      <Container>
        <Announcement />
        <Banner></Banner>
      </Container>
    </section>
  );
}
