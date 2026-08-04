type StrapiEntity<T> = {
  attributes?: T;
  data?: T | StrapiEntity<T> | null;
};

type StrapiMedia = {
  url?: string | null;
  alternativeText?: string | null;
  formats?: {
    thumbnail?: {
      url?: string | null;
    };
    small?: {
      url?: string | null;
    };
    medium?: {
      url?: string | null;
    };
    large?: {
      url?: string | null;
    };
  } | null;
};

export function unwrapStrapiEntity<T>(value: T | StrapiEntity<T> | null | undefined): T | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value !== "object") {
    return value;
  }

  const entity = value as StrapiEntity<T>;

  if (entity.attributes) {
    return entity.attributes;
  }

  if (entity.data !== undefined) {
    return unwrapStrapiEntity(entity.data);
  }

  return value as T;
}

export function normalizeText(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

export function normalizeTextList(
  values: Array<string | null | undefined> | null | undefined,
  fallback: readonly string[],
) {
  const normalized = values
    ?.map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));

  return normalized && normalized.length > 0 ? normalized : [...fallback];
}

function getMediaValue(value: unknown): StrapiMedia | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const entity = value as StrapiEntity<StrapiMedia> & { url?: string | null };

  if (entity.attributes) {
    return entity.attributes;
  }

  if (entity.data) {
    return getMediaValue(entity.data);
  }

  if ("url" in entity || "alternativeText" in entity) {
    return entity as StrapiMedia;
  }

  return null;
}

export function resolveStrapiMediaUrl(
  value: unknown,
  baseUrl: string,
): string | undefined {
  const media = getMediaValue(value);
  const url = media?.url?.trim();

  if (!url) {
    return undefined;
  }

  return /^https?:\/\//i.test(url) ? url : new URL(url, baseUrl).toString();
}

