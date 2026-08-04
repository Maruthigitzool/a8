import { Container } from "@/components/ui/container";
import type { HomeTrustedCompaniesData } from "@/types/home";

type TrustedCompaniesSectionProps = {
  data: HomeTrustedCompaniesData;
};

export function TrustedCompaniesSection({ data }: TrustedCompaniesSectionProps) {
  return (
    <section className="pb-5 pt-12 text-center">
      <Container>
        <div className="mb-7 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-muted">
          {data.eyebrow}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-70">
          {data.companies.map((company) => (
            <span key={company} className="font-display text-[20px] font-bold text-[#7a8399]">
              {company}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
