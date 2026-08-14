import type { FooterNavItem } from "@/types/footer";
import { siteData } from "@/data/site";

export type FooterNavGroup = {
  title: string;
  links: FooterNavItem[];
};

const COLUMN_HEADINGS = new Set(["product", "company", "legal"]);

function isColumnHeading(item: FooterNavItem) {
  const label = item.Label?.trim() ?? "";
  if (COLUMN_HEADINGS.has(label.toLowerCase())) {
    return true;
  }

  return !item.URL?.trim();
}

export function groupFooterNavigation(
  navItems: FooterNavItem[] = [],
): FooterNavGroup[] {
  const groups: FooterNavGroup[] = [];
  let currentGroup: FooterNavGroup | null = null;

  for (const item of navItems) {
    if (isColumnHeading(item)) {
      if (currentGroup) {
        groups.push(currentGroup);
      }

      currentGroup = {
        title: item.Label,
        links: [],
      };
      continue;
    }

    if (currentGroup) {
      currentGroup.links.push(item);
      continue;
    }

    currentGroup = {
      title: item.Label,
      links: [],
    };
  }

  if (currentGroup) {
    groups.push(currentGroup);
  }

  const usableGroups = groups.filter((group) => group.links.length > 0);

  if (usableGroups.length >= 2) {
    return usableGroups;
  }

  return siteData.footerColumns.map((column) => ({
    title: column.title,
    links: column.links.map((link, index) => ({
      id: index + 1,
      Label: link.label,
      URL: link.href,
    })),
  }));
}
