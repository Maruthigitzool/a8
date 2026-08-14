import type { Metadata } from "next";

import { resolveLocale } from "@/app/lib/locale.server";
import { HomePageContent } from "@/components/home/home-page-content";

export const metadata: Metadata = {
  title: "Articul8 | The GenAI platform that simply works.",
  description:
    "Domain-Specific GenAI Platform purpose-built for your data and mission. From data chaos to hyper-personalized GenAI enterprise outcomes.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Articul8",
      url: "https://articul8.ai",
      logo: "https://articul8.ai/logo.png",
      sameAs: ["https://www.linkedin.com/company/articul8ai"],
    },
    {
      "@type": "WebSite",
      url: "https://articul8.ai",
      name: "Articul8",
    },
  ],
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    lang?: string;
  }>;
}) {
  const params = await searchParams;
  const locale = await resolveLocale(params.lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <HomePageContent locale={locale} />
    </>
  );
}
