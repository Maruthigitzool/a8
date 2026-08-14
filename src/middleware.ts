import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isValidLocale, LOCALE_COOKIE } from "@/app/lib/locale";

const LOCALE_HEADER = "x-locale";

export function middleware(request: NextRequest) {
  const langParam = request.nextUrl.searchParams.get("lang");
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const requestHeaders = new Headers(request.headers);

  const resolvedLocale = isValidLocale(langParam)
    ? langParam
    : isValidLocale(cookieLocale)
      ? cookieLocale
      : "en";

  requestHeaders.set(LOCALE_HEADER, resolvedLocale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (isValidLocale(langParam)) {
    response.cookies.set(LOCALE_COOKIE, langParam, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
