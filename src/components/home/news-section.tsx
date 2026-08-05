import { getNews } from "@/app/services/news.service";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

import { getHomePage } from "@/app/services/home-api.service";
import { Card } from "./card";
import { SectionAnimator } from "./section-animator";
export async function NewsSection() {
  const news = await getNews();
  const { data } = await getHomePage();

  const newsSection = data.Section.find(
    (section) => section.__component === "section-news.section-news"
  );
  if (!newsSection) {
    return null;
  }
  return (
    <section className="bg-surface/95 py-[88px]" id="news">
      <Container>
        <SectionAnimator animation="stack">
          <div className="mb-12">
            <SectionHeading
              eyebrow={newsSection.SectionHeader?.SubTitle ?? ""}
              title={newsSection.SectionHeader?.Title ?? ""}
              description={newsSection.SectionHeader?.Description?.[0]?.children?.[0]?.text ?? ""}
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
    </section>
  );
}
