import { Container } from "@/components/ui/container";
import type { HomeTrustedCompaniesData } from "@/types/home";

type TrustedCompaniesSectionProps = {
  data: HomeTrustedCompaniesData;
};

export function TrustedCompaniesSection({ data }: TrustedCompaniesSectionProps) {
  return (
    <section className="pb-5 pt-12 text-center">
      <Container>
        <div className="type-eyebrow mb-7 font-semibold text-muted">
          {data.eyebrow}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-70">
          {data.companies.map((company) => (
            <span key={company} className="trusted-name">
              {company}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
