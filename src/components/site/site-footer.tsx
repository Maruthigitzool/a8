import Image from "next/image";
import { getFooter } from "@/app/services/footer.service";
import { Container } from "@/components/ui/container";
import { richTextToString } from "@/app/utils/rich-text";

const STRAPI_URL = "http://localhost:1337";
const currentYear = new Date().getFullYear();

export async function SiteFooter() {
  const { data } = await getFooter();

  const logo = data.Section.find(
    (item) => item.__component === "common.logo"
  );

  const description = data.Section.find(
    (item) => item.__component === "footer.footer-description"
  );

  const navigation = data.Section.find(
    (item) => item.__component === "common.navigation"
  );

  const copyright = data.Section.find(
    (item) => item.__component === "footer.footer-copyright"
  );

  const socialLinks = data.Section.find(
    (item) => item.__component === "common.social-links"
  );

  const navItems = navigation?.NavItem ?? [];

  const productLinks = navItems.filter((item) =>
    ["Platform", "Case Studies"].includes(item.Label)
  );

  const companyLinks = navItems.filter((item) =>
    ["About Us", "Blog", "News"].includes(item.Label)
  );

  const legalLinks = navItems.filter((item) =>
    ["Privacy Policy", "EULA"].includes(item.Label)
  );

  return (
    <footer className="border-t border-line py-14 pb-10">
      <Container>
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="max-w-[300px] text-left">
            {logo?.Logo && (
              <Image
                src={`${STRAPI_URL}${logo.Logo.url}`}
                alt={logo.Logo.alternativeText ?? "Articul8"}
                width={logo.Logo.width}
                height={logo.Logo.height}
                priority
                unoptimized
                className=""
              />
            )}

            <p className="mt-4 text-[15px] text-muted">
              {richTextToString(description?.FooterDescription ?? [])}
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-10 sm:grid-cols-3 lg:w-auto lg:flex lg:gap-20">
            <div>
              <h2 className="mb-4 text-xs text-[13px] font-bold uppercase tracking-[0.16em] text-muted">
                Product
              </h2>

              {productLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.URL ?? "#"}
                  className="mb-3 block text-[15px] hover:text-brand"
                >
                  {item.Label}
                </a>
              ))}
            </div>

            <div>
              <h2 className="mb-4 text-xs text-[13px] font-bold uppercase tracking-[0.16em] text-muted">
                Company
              </h2>

              {companyLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.URL ?? "#"}
                  className="mb-3 block text-[15px] hover:text-brand"
                >
                  {item.Label}
                </a>
              ))}
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                Legal
              </h2>

              {legalLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.URL ?? "#"}
                  className="mb-3 block text-[15px] hover:text-brand"
                >
                  {item.Label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:items-center gap-4 border-t border-line pt-6  sm:flex-row sm:justify-between ">
          <p className="text-sm text-muted">
            © {currentYear} {copyright?.CopyrightText}
          </p>

          <div className="flex flex-wrap sm:justify-center gap-6 ">
            {socialLinks?.SocialItem.map((item) => (
              <a
                key={item.id}
                href={item.Url ?? "#"}
                className="font-medium hover:text-brand"
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