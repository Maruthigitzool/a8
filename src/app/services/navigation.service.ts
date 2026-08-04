import { cache } from "react";
import { siteData } from "@/data/site";
import type { SiteData, SiteFooterColumn, SiteNavItem } from "@/types/site";
import { fetchStrapi } from "./strapi-client";
import { normalizeText, unwrapStrapiEntity } from "./strapi-mappers";

type StrapiLink = {
  label?: string | null;
  href?: string | null;
};

type StrapiFooterColumn = {
  title?: string | null;
  links?: Array<StrapiLink | { attributes?: StrapiLink }> | null;
};

type StrapiSiteSettings = {
  brand?: string | null;
  primaryCta?: StrapiLink | { attributes?: StrapiLink } | null;
  navItems?: Array<StrapiLink | { attributes?: StrapiLink }> | null;
  footerDescription?: string | null;
  footerColumns?: Array<StrapiFooterColumn | { attributes?: StrapiFooterColumn }> | null;
  socialLinks?: Array<StrapiLink | { attributes?: StrapiLink }> | null;
  copyright?: string | null;
};

type StrapiSingleResponse<T> = {
  data?: T | { attributes?: T } | null;
};

function mapLink(value: StrapiLink | { attributes?: StrapiLink } | null | undefined, fallback: SiteNavItem) {
  const normalized = unwrapStrapiEntity<StrapiLink>(value);

  return {
    label: normalizeText(normalized?.label, fallback.label),
    href: normalizeText(normalized?.href, fallback.href),
  };
}

function mapLinks(
  values: Array<StrapiLink | { attributes?: StrapiLink }> | null | undefined,
  fallback: readonly SiteNavItem[],
): SiteNavItem[] {
  const links = values?.map((value, index) => mapLink(value, fallback[index] ?? fallback[fallback.length - 1] ?? fallback[0])) ?? [];
  return links.length > 0 ? links : fallback.map((item) => ({ ...item }));
}

function mapFooterColumns(
  values: Array<StrapiFooterColumn | { attributes?: StrapiFooterColumn }> | null | undefined,
): SiteFooterColumn[] {
  const fallbackColumns = siteData.footerColumns;

  const columns =
    values?.map((value, index) => {
      const fallback = fallbackColumns[index] ?? fallbackColumns[fallbackColumns.length - 1];
      const normalized = unwrapStrapiEntity<StrapiFooterColumn>(value);

      return {
        title: normalizeText(normalized?.title, fallback.title),
        links: mapLinks(normalized?.links, fallback.links),
      };
    }) ?? [];

  return columns.length > 0 ? columns : fallbackColumns.map((item) => ({ ...item, links: item.links.map((link) => ({ ...link })) }));
}

function mapSiteSettings(
  document: StrapiSiteSettings | { attributes?: StrapiSiteSettings } | null | undefined,
): SiteData {
  const normalized = unwrapStrapiEntity<StrapiSiteSettings>(document);

  return {
    brand: normalizeText(normalized?.brand, siteData.brand),
    primaryCta: mapLink(normalized?.primaryCta, siteData.primaryCta),
    navItems: mapLinks(normalized?.navItems, siteData.navItems),
    footerDescription: normalizeText(normalized?.footerDescription, siteData.footerDescription),
    footerColumns: mapFooterColumns(normalized?.footerColumns),
    socialLinks: mapLinks(normalized?.socialLinks, siteData.socialLinks),
    copyright: normalizeText(normalized?.copyright, siteData.copyright),
  };
}

const loadSiteSettings = cache(async (): Promise<SiteData> => {
  try {
    const response = await fetchStrapi<StrapiSingleResponse<StrapiSiteSettings>>("/api/site-setting", {
      revalidate: 300,
    });

    return mapSiteSettings(response.data);
  } catch {
    return siteData;
  }
});

export async function getSiteData() {
  return loadSiteSettings();
}

export async function getNavigationData() {
  const site = await loadSiteSettings();
  return {
    brand: site.brand,
    primaryCta: site.primaryCta,
    navItems: site.navItems,
  };
}
