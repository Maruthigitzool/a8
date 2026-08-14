import { cookies, headers } from "next/headers";

import {
  isValidLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/app/lib/locale";

const LOCALE_HEADER = "x-locale";

export async function resolveLocale(langParam?: string): Promise<Locale> {
  if (isValidLocale(langParam)) {
    return langParam;
  }

  const headerStore = await headers();
  const headerLocale = headerStore.get(LOCALE_HEADER);

  if (isValidLocale(headerLocale)) {
    return headerLocale;
  }

  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get(LOCALE_COOKIE)?.value;

  if (isValidLocale(savedLanguage)) {
    return savedLanguage;
  }

  return "en";
}
