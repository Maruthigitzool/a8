import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSiteData } from "@/app/services/navigation.service";
import "./globals.css";

export const metadata: Metadata = {
  title: "Articul8 | The GenAI platform that simply works.",
  description:
    "Domain-Specific GenAI Platform purpose-built for your data and mission. From data chaos to hyper-personalized GenAI enterprise outcomes.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteData = await getSiteData();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteHeader data={siteData} />
        <main className="flex-1">{children}</main>
        <SiteFooter data={siteData} />
      </body>
    </html>
  );
}
