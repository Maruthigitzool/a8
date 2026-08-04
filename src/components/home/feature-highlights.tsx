import { getFeatureHighlights } from "@/app/services/feature-highlights.service";
import { richTextToString } from "@/app/utils/rich-text";
import { Card } from "@/components/home/card";
import { Shield } from "lucide-react";


export async function FeatureHighlightsSection() {
  const section = await getFeatureHighlights();

  if (!section) return null;

  const cards = section.IconCard[0]?.Card ?? [];
  console.log("Feature Highlights Section:", section);
  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-10 ">
        <span className="text-sm uppercase tracking-[0.2em] text-accent">
          {section.SectionHeader.SubTitle}
        </span>

        <h2 className="mt-4 text-5xl font-bold">
          {section.SectionHeader.Title}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <Card
              variant="icon"
              title={card.Title}
              excerpt={richTextToString(card.Description)}
              icon={<Shield size={20} className="text-brand" />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}