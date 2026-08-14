import type { HomeSectionApi } from "@/types/home-api";

export function findHomeSection<T = HomeSectionApi>(
  sections: HomeSectionApi[],
  component: string,
): T | null {
  const section = sections.find((item) => item.__component === component);

  return (section as T | undefined) ?? null;
}

export function findHomeSections<T = HomeSectionApi>(
  sections: HomeSectionApi[],
  component: string,
): T[] {
  return sections.filter(
    (item) => item.__component === component,
  ) as T[];
}
