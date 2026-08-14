const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export function getStrapiMediaUrl(path?: string | null): string | undefined {
  if (!path?.trim()) {
    return undefined;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const base = STRAPI_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${base}${normalizedPath}`;
}
