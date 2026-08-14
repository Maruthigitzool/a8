import Link from "next/link";
import { Suspense } from "react";
import type { Locale } from "@/app/lib/locale";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeaderMotion } from "@/components/site/header-motion";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { StrapiImage } from "@/components/ui/strapi-image";
import { getHeader } from "@/app/services/header.service";

type SiteHeaderProps = {
  lang?: Locale;
};

export async function SiteHeader({ lang = "en" }: SiteHeaderProps) {
  const locale: Locale = lang;
  const { data } = await getHeader(locale);

  const logo = data.Section.find(
    (item) => item.__component === "common.logo"
  );

  const navigation = data.Section.find(
    (item) => item.__component === "common.navigation"
  );

  const button = data.Section.find(
    (item) => item.__component === "common.button"
  );

  return (
    <header className="site-header">
      <Container className="flex items-center gap-8 py-4">

        <Link href="/" aria-label="Articul8 home">
          {logo?.Logo && (
            <StrapiImage
              src={logo.Logo.url}
              alt={logo.Logo.alternativeText ?? "Articul8"}
              width={logo.Logo.width}
              height={logo.Logo.height}
              priority
              className="logo-mark"
            />
          )}
        </Link>

        <HeaderMotion>
          <nav
            className="relative hidden items-center gap-7 lg:flex"
            aria-label="Main navigation"
            data-gsap-header-nav
          >
            <div
              className="pointer-events-none absolute bottom-0 h-[3px] rounded-full bg-brand"
              data-gsap-header-indicator
            />

            {navigation?.NavItem.map((item) => (
              <a
                key={item.id}
                href={item.URL}
                className="nav-link"
                data-gsap-nav-link
              >
                {item.Label}
              </a>
            ))}
          </nav>
        </HeaderMotion>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <Suspense
            fallback={
              <div className="h-10 w-[8.5rem] animate-pulse rounded-xl bg-surface" />
            }
          >
            <LanguageSwitcher value={locale} />
          </Suspense>

          {button && (
            <Button href={button.ButtonUrl} variant="solid">
              {button.ButtonText}
            </Button>
          )}
        </div>

        <details className="group relative ml-auto lg:hidden">
          <summary
            className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-xl border border-line bg-background"
            aria-label="Open navigation menu"
          >
            <span className="sr-only">Open menu</span>

            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-4 rounded-full bg-foreground" />
              <span className="block h-0.5 w-4 rounded-full bg-foreground" />
              <span className="block h-0.5 w-4 rounded-full bg-foreground" />
            </span>
          </summary>

          <div className="absolute right-0 top-full mt-3 hidden w-[min(90vw,20rem)] gap-3 rounded-panel border border-line bg-background p-4 shadow-overlay group-open:grid">

            {navigation?.NavItem.map((item) => (
              <a
                key={item.id}
                href={item.URL}
                className="rounded-xl px-3 py-2 type-body font-semibold text-foreground hover:bg-surface"
              >
                {item.Label}
              </a>
            ))}

            <Suspense
              fallback={
                <div className="h-10 w-full animate-pulse rounded-xl bg-surface" />
              }
            >
              <LanguageSwitcher value={locale} />
            </Suspense>

            {button && (
              <Button
                href={button.ButtonUrl}
                variant="solid"
                className="w-full"
              >
                {button.ButtonText}
              </Button>
            )}

          </div>
        </details>

      </Container>
    </header>
  );
}