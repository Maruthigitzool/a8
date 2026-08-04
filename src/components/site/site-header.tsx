import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getHeader } from "@/app/services/header.service";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function SiteHeader() {
  const { data } = await getHeader();

  const logo = data.Section.find(
    (item) => item.__component === "common.logo"
  );
  console.log("logo", logo)
  console.log(`${STRAPI_URL}${logo?.Logo?.url}`);
  const navigation = data.Section.find(
    (item) => item.__component === "common.navigation"
  );

  const button = data.Section.find(
    (item) => item.__component === "common.button"
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/82 backdrop-blur-xl">
      <Container className="flex items-center gap-8 py-4">
        <a href="#top" aria-label="Articul8 home">
          {logo?.Logo && (
            <Image
              src={`${STRAPI_URL}${logo.Logo.url}`}
              alt={logo.Logo.alternativeText ?? "Articul8"}
              width={logo.Logo.width}
              height={logo.Logo.height}
              priority
              unoptimized
            />
          )}
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation?.NavItem.map((item) => (
            <a
              key={item.id}
              href={item.URL}
              className="text-[15px] font-medium text-foreground/85 hover:text-brand"
            >
              {item.Label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden lg:block">
          {button && (
            <Button href={button.ButtonUrl} variant="solid">
              {button.ButtonText}
            </Button>
          )}
        </div>

        <details className="group relative ml-auto lg:hidden">
          <summary className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-xl border border-line bg-white">
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