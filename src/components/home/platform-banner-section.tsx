import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { HomePlatformBannerData } from "@/types/home";

type PlatformBannerSectionProps = {
  data: HomePlatformBannerData;
};

export function PlatformBannerSection({ data }: PlatformBannerSectionProps) {
  return (
    <section className="pb-22 pt-0" id="platform">
      <Container>
        <div className="rounded-[24px] bg-gradient-to-br from-brand to-brand-deep p-14 text-center text-white shadow-[0_30px_60px_rgba(42,39,230,0.18)]">
          <h2 className="mb-4 font-display text-[clamp(28px,3.4vw,42px)] font-bold tracking-tight">
            {data.title}
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-[18px] text-white/86">
            {data.description}
          </p>
          <Button href={data.ctaHref} variant="inverted">
            {data.ctaLabel}
          </Button>
          <div className="mt-7 inline-flex items-center gap-2 text-[13px] font-medium text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#6be3a6]" />
            <span>{data.complianceText}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
