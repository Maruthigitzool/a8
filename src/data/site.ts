import type { SiteData } from "@/types/site";

export const siteData: SiteData = {
  brand: "Articul8",
  primaryCta: {
    label: "Start Articul8'ing",
    href: "#cta",
  },
  navItems: [
    { label: "Product", href: "#platform" },
    { label: "Case Studies", href: "#news" },
    { label: "Company", href: "#cta" },
  ],
  footerDescription:
    "Transforming enterprise data and expertise into powerful engines of growth, value and lasting impact.",
  footerColumns: [
    {
      title: "Product",
      links: [
        { label: "Platform", href: "#platform" },
        { label: "Case Studies", href: "#news" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#cta" },
        { label: "Blog", href: "#news" },
        { label: "News", href: "#news" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "EULA", href: "#" },
      ],
    },
  ],
  socialLinks: [
    { label: "X", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  copyright: "© 2026 Articul8, Inc. All rights reserved.",
};
