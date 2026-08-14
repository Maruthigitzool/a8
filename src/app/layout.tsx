import type { Metadata } from "next";

import { getFontVariablesForLocale } from "@/app/lib/locale-fonts";
import { resolveLocale } from "@/app/lib/locale.server";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

import "./globals.css";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),

  title: {
    default: "Articul8 | The GenAI platform that simply works.",
    template: "%s | Articul8",
  },

  description:
    "Domain-Specific GenAI Platform purpose-built for your data and mission.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await resolveLocale();
  const fontVariables = await getFontVariablesForLocale(lang);

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`h-full antialiased ${fontVariables}`}
    >
      <head>
        <link rel="preconnect" href={STRAPI_URL} />
        <link rel="dns-prefetch" href={STRAPI_URL} />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteHeader lang={lang} />

        <main className="flex-1">{children}</main>

        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
