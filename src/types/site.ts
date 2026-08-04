export interface SiteNavItem {
  label: string;
  href: string;
}

export interface SiteFooterLink {
  label: string;
  href: string;
}

export interface SiteFooterColumn {
  title: string;
  links: SiteFooterLink[];
}

export interface SiteData {
  brand: string;
  primaryCta: SiteNavItem;
  navItems: SiteNavItem[];
  footerDescription: string;
  footerColumns: SiteFooterColumn[];
  socialLinks: SiteFooterLink[];
  copyright: string;
}
