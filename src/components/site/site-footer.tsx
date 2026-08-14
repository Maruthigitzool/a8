import Link from "next/link";

import { groupFooterNavigation } from "@/app/lib/footer-navigation";
import type { Locale } from "@/app/lib/locale";
import { getFooter } from "@/app/services/footer.service";
import { Container } from "@/components/ui/container";
import { StrapiImage } from "@/components/ui/strapi-image";
import { siteData } from "@/data/site";
import { richTextToString } from "@/app/utils/rich-text";

const currentYear = new Date().getFullYear();

type SiteFooterProps = {
  lang?: Locale;
};

export async function SiteFooter({ lang = "en" }: SiteFooterProps) {
  const { data } = await getFooter(lang);

  if (!data) {
    return null;
  }

  const logo = data.Section.find(
    (item) => item.__component === "common.logo",
  );

  const description = data.Section.find(
    (item) => item.__component === "footer.footer-description",
  );

  const navigation = data.Section.find(
    (item) => item.__component === "common.navigation",
  );

  const copyright = data.Section.find(
    (item) => item.__component === "footer.footer-copyright",
  );

  const socialLinks = data.Section.find(
    (item) => item.__component === "common.social-links",
  );

  const navGroups = groupFooterNavigation(navigation?.NavItem ?? []);
  const descriptionText =
    richTextToString(description?.FooterDescription ?? []) ||
    siteData.footerDescription;
  const socialItems =
    socialLinks?.SocialItem?.length
      ? socialLinks.SocialItem
      : siteData.socialLinks.map((item, index) => ({
          id: index + 1,
          Label: item.label,
          Url: item.href,
        }));

  return (
    <footer className="border-t border-line bg-background pt-14 pb-8">
      <Container>
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start">
          <div className="max-w-[300px] shrink-0">
            <Link href="/" aria-label="Articul8 home">
              {logo?.Logo && (
                <StrapiImage
                  src={logo.Logo.url}
                  alt={logo.Logo.alternativeText ?? "Articul8"}
                  width={logo.Logo.width}
                  height={logo.Logo.height}
                  className="logo-mark"
                />
              )}
            </Link>

            <p className="type-body mt-4">{descriptionText}</p>
          </div>

          <div className="grid w-full max-w-[620px] grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:ml-auto lg:w-auto lg:gap-x-20">
            {navGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="type-label mb-4">{group.title}</h2>

                <ul className="space-y-3">
                  {group.links.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.URL ?? "#"}
                        className="type-body transition duration-150 hover:text-brand"
                      >
                        {item.Label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {currentYear} {copyright?.CopyrightText ?? "Articul8, Inc. All rights reserved."}
          </p>

          <div className="flex items-center gap-6">
            {socialItems.map((item) => (
              <a
                key={item.id}
                href={item.Url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-medium text-foreground transition duration-150 hover:text-brand"
                aria-label={`${item.Label} (opens in new tab)`}
              >
                {item.Label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
