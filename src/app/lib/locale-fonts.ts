import type { Locale } from "@/app/lib/locale";

export async function getFontVariablesForLocale(_locale: Locale) {
  const [{ fontVariables: latin }, { fontVariables: hindi }, { fontVariables: kannada }] =
    await Promise.all([
      import("@/app/fonts/en"),
      import("@/app/fonts/hi"),
      import("@/app/fonts/kn"),
    ]);

  return `${latin} ${hindi} ${kannada}`;
}
