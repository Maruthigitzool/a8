import { Container } from "@/components/ui/container";

import { Announcement } from "./announcement";
import { Banner } from "../ui/Banner";
import { HeroAtmosphere } from "./hero-atmosphere";
import { TrustedClients } from "./trusted-clients";
import { SectionAnimator } from "./section-animator";
import type { Banner as BannerData } from "@/types/banner";

type ClientItem = {
  id: number;
  Title: string;
  Url?: string | null;
};

type HeroSectionProps = {
  banner: BannerData | null;
  announcement: {
    Title: string;
    Url?: string | null;
  } | null;
  clients: ClientItem[];
};

export function HeroSection({
  banner,
  announcement,
  clients,
}: HeroSectionProps) {
  return (
    <section className="hero-stage relative overflow-hidden pb-6 pt-16 text-center sm:pt-20">
      <SectionAnimator animation="hero">
        <div data-gsap-hero-root className="relative">
          <HeroAtmosphere />

          <Container>
            <div data-gsap-hero-wrapper className="relative z-10">
              <Announcement announcement={announcement} />
              <Banner banner={banner} />
            </div>

            <div
              className="relative z-10 mt-16"
              data-gsap-hero-trusted-shell
            >
              <TrustedClients clients={clients} />
            </div>
          </Container>
        </div>
      </SectionAnimator>
    </section>
  );
}
