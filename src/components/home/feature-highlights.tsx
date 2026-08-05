import { getFeatureHighlights } from "@/app/services/feature-highlights.service";
import { richTextToString } from "@/app/utils/rich-text";
import { Card } from "@/components/home/card";
import { Shield } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { SectionAnimator } from "./section-animator";


export async function FeatureHighlightsSection() {
  const section = await getFeatureHighlights();

  if (!section) return null;

  const cards = section.IconCard[0]?.Card ?? [];
  return (
    <section className="py-24 bg-white">
      <SectionAnimator animation="stack" className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-10 ">
        <SectionHeading
          eyebrow={section.SectionHeader?.SubTitle ?? ""}
          title={section.SectionHeader?.Title ?? ""}
          description={section.SectionHeader?.Description?.[0]?.children?.[0]?.text ?? ""}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
    </section>
  );
}
