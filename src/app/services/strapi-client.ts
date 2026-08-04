const DEFAULT_STRAPI_URL = "http://127.0.0.1:1337";

const STRAPI_URL =
  process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? DEFAULT_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

type StrapiQueryValue = string | number | boolean | null | undefined;

export interface StrapiFetchOptions {
  query?: Record<string, StrapiQueryValue>;
  revalidate?: number;
}

function buildStrapiPath(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return path.startsWith("/") ? `${STRAPI_URL}${path}` : `${STRAPI_URL}/${path}`;
}

export function buildStrapiUrl(path: string, query?: Record<string, StrapiQueryValue>) {
  const url = new URL(buildStrapiPath(path));

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value === null || value === undefined) {
      continue;
    }

    url.searchParams.set(key, String(value));
  }

  return url.toString();
}

export async function fetchStrapi<T>(path: string, options: StrapiFetchOptions = {}): Promise<T> {
  const response = await fetch(buildStrapiUrl(path, options.query), {
    headers: STRAPI_TOKEN
      ? {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        }
      : undefined,
    next: options.revalidate ? { revalidate: options.revalidate } : undefined,
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

