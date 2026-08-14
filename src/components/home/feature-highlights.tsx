import { richTextToString } from "@/app/utils/rich-text";
import { Card } from "@/components/home/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Shield } from "lucide-react";
import type { FeatureHighlightsSection as FeatureHighlightsData } from "@/types/feature-highlights";
import { SectionHeading } from "../ui/section-heading";
import { SectionAnimator } from "./section-animator";

type FeatureHighlightsSectionProps = {
  section: FeatureHighlightsData | null;
};

export function FeatureHighlightsSection({
  section,
}: FeatureHighlightsSectionProps) {
  if (!section) return null;

  const cards = section.IconCard[0]?.Card ?? [];

  return (
    <Section tone="white" size="lg">
      <Container>
        <SectionAnimator animation="stack">
          <SectionHeading
            eyebrow={section.SectionHeader?.SubTitle ?? ""}
            title={section.SectionHeader?.Title ?? ""}
            description={
              section.SectionHeader?.Description?.[0]?.children?.[0]?.text ?? ""
            }
          />
          <div className="mt-block grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <Card
                key={card.id}
                variant="icon"
                title={card.Title}
                excerpt={richTextToString(card.Description)}
                icon={<Shield size={20} className="text-brand" />}
              />
            ))}
          </div>
        </SectionAnimator>
      </Container>
    </Section>
  );
}
