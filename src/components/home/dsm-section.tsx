import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getHomePage } from "@/app/services/home-api.service";
function richTextToString(
  blocks: {
    children?: {
      text?: string;
    }[];
  }[] = []
) {
  return blocks
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text ?? "")
    .join(" ");
}

export async function DsmSection() {
  const { data } = await getHomePage();

  const dsmSection = data.Section.find(
    (section) => section.__component === "section-dsm.section-dsm"
  );

  if (!dsmSection) {
    return null;
  }
  return (
    <section className="py-[88px]">
      <Container>
        <div className="mb-12">
          <SectionHeading
            eyebrow={dsmSection.SectionHeader?.SubTitle ?? ""}
            title={dsmSection.SectionHeader?.Title ?? ""}
            description={richTextToString(
              dsmSection.SectionHeader?.Description
            )}
          />

        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* {data.cards.map((card) => (
            <article
              key={card.name}
              className="flex flex-col gap-4 rounded-[16px] border border-line bg-white p-7"
            >
              <h3 className="font-display text-[24px] font-bold text-foreground">{card.name}</h3>
              <p className="text-[15px] text-muted">{card.description}</p>

              <div className="grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
                {card.metrics.map((metric) => (
                  <div key={metric.value}>
                    <div className="font-display text-[22px] font-bold leading-tight text-brand">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-[12.5px] text-muted">{metric.caption}</div>
                  </div>
                ))}
              </div>

              <a
                className="font-display text-[14px] font-semibold text-brand hover:text-accent"
                href="#cta"
              >
                Read More <span aria-hidden="true">-&gt;</span>
              </a>
            </article>
          ))} */}
        </div>

        {/* <p className="mx-auto mt-9 max-w-3xl text-center text-[15px] text-muted">
          {data.note}
        </p> */}
      </Container>
    </section>
  );
}
