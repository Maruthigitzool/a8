export type Locale = "en" | "hi" | "kn";

export const locales = {
  en: "English",
  hi: "हिंदी",
  kn: "ಕನ್ನಡ",
} as const;

export const LOCALE_COOKIE = "articul8-language";

export function isValidLocale(value?: string | null): value is Locale {
  return value === "en" || value === "hi" || value === "kn";
}
