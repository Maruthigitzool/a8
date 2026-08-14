"use client";

import {
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";
import { ChevronDown, Globe, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  isValidLocale,
  LOCALE_COOKIE,
  locales,
  type Locale,
} from "@/app/lib/locale";

const languages = [
  { code: "en" as const, label: locales.en },
  { code: "hi" as const, label: locales.hi },
  { code: "kn" as const, label: locales.kn },
];

type LanguageSwitcherProps = {
  value?: Locale;
};

export function LanguageSwitcher({ value }: LanguageSwitcherProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<Locale>(value ?? "en");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const urlLanguage = searchParams.get("lang");

    if (isValidLocale(urlLanguage)) {
      setLanguage(urlLanguage);
    } else if (value) {
      setLanguage(value);
    }
  }, [searchParams, value]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLanguage = event.target.value as Locale;

    if (nextLanguage === language) {
      return;
    }

    setLanguage(nextLanguage);
    localStorage.setItem(LOCALE_COOKIE, nextLanguage);
    document.cookie = `${LOCALE_COOKIE}=${nextLanguage}; path=/; max-age=31536000; SameSite=Lax`;

    const params = new URLSearchParams(searchParams.toString());

    if (nextLanguage === "en") {
      params.delete("lang");
    } else {
      params.set("lang", nextLanguage);
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `/?${queryString}` : "/";

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  };

  const currentLabel =
    languages.find((lang) => lang.code === language)?.label ?? locales.en;

  return (
    <div
      className={`group relative inline-flex items-center transition-opacity duration-150 ${
        isPending ? "opacity-80" : ""
      }`}
      aria-busy={isPending}
    >
      <div className="pointer-events-none inline-flex items-center gap-2 rounded-xl border border-line bg-background px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition duration-200 group-hover:border-brand/25 group-hover:shadow-brand-hover">
        {isPending ? (
          <Loader2
            className="h-4 w-4 shrink-0 animate-spin text-brand/70"
            aria-hidden="true"
          />
        ) : (
          <Globe
            className="h-4 w-4 shrink-0 text-brand/70"
            aria-hidden="true"
          />
        )}
        <span className="min-w-[4.5rem] whitespace-nowrap">
          {currentLabel}
        </span>
        <ChevronDown
          className="h-3.5 w-3.5 shrink-0 text-muted transition duration-200 group-hover:text-brand"
          aria-hidden="true"
        />
      </div>

      <label htmlFor="language-select" className="sr-only">
        Select language
      </label>

      <select
        id="language-select"
        value={language}
        onChange={handleChange}
        disabled={isPending}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-wait"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
