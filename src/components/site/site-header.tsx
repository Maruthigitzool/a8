import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeaderMotion } from "@/components/site/header-motion";
import { getHeader } from "@/app/services/header.service";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export async function SiteHeader() {
  const { data } = await getHeader();

  const logo = data.Section.find((item) => item.__component === "common.logo");
  const navigation = data.Section.find((item) => item.__component === "common.navigation");
  const button = data.Section.find((item) => item.__component === "common.button");

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/82 backdrop-blur-xl">
      <Container className="flex items-center gap-8 py-4">
        <Link href="/" aria-label="Articul8 home">
          {logo?.Logo && (
            <Image
              src={`${STRAPI_URL}${logo.Logo.url}`}
              alt={logo.Logo.alternativeText ?? "Articul8"}
              width={logo.Logo.width}
              height={logo.Logo.height}
              priority
            />
          )}
        </Link>

        <HeaderMotion>
          <nav className="relative hidden items-center gap-7 lg:flex" aria-label="Main navigation" data-gsap-header-nav>
            <div
              className="pointer-events-none absolute bottom-0 h-[3px] rounded-full bg-brand"
              data-gsap-header-indicator
            />

            {navigation?.NavItem.map((item) => (
              <a
                key={item.id}
                href={item.URL}
                className="relative text-[15px] font-medium text-foreground/85 transition duration-300"
                data-gsap-nav-link
              >
                {item.Label}
              </a>
            ))}
          </nav>
        </HeaderMotion>

        <div className="ml-auto hidden lg:block">
          {button && (
            <Button href={button.ButtonUrl} variant="solid">
              {button.ButtonText}
            </Button>
          )}
        </div>

        <details className="group relative ml-auto lg:hidden">
          <summary className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-xl border border-line bg-white" aria-label="Open navigation menu">
            <span className="sr-only">Open menu</span>

            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-4 rounded-full bg-foreground" />
              <span className="block h-0.5 w-4 rounded-full bg-foreground" />
              <span className="block h-0.5 w-4 rounded-full bg-foreground" />
            </span>
          </summary>

          <div className="absolute right-0 top-full mt-3 hidden w-[min(90vw,20rem)] gap-3 rounded-2xl border border-line bg-white p-4 shadow-[0_24px_64px_rgba(12,16,36,0.14)] group-open:grid">
            {navigation?.NavItem.map((item) => (
              <a
                key={item.id}
                href={item.URL}
                className="rounded-xl px-3 py-2 text-[15px] font-semibold text-foreground hover:bg-surface"
              >
                {item.Label}
              </a>
            ))}

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