import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "./card";
import { SectionAnimator } from "./section-animator";
import type { HomeSectionApi } from "@/types/home-api";

type NewsItem = {
  documentId: string;
  title: string;
  url: string;
  excerpt: string;
};

type NewsSectionProps = {
  newsSection: HomeSectionApi | null;
  news: NewsItem[];
};

export function NewsSection({ newsSection, news }: NewsSectionProps) {
  if (!newsSection) {
    return null;
  }

  return (
    <Section tone="muted" id="news">
      <Container>
        <SectionAnimator animation="stack">
          <div className="mb-block">
            <SectionHeading
              eyebrow={newsSection.SectionHeader?.SubTitle ?? ""}
              title={newsSection.SectionHeader?.Title ?? ""}
              description={
                newsSection.SectionHeader?.Description?.[0]?.children?.[0]
                  ?.text ?? ""
              }
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {news.map((card, index) => (
              <Card
                key={card.documentId}
                title={card.title}
                excerpt={card.excerpt}
                href={card.url}
                index={index}
              />
            ))}
          </div>
        </SectionAnimator>
      </Container>
    </Section>
  );
}
