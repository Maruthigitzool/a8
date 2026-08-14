import { Noto_Sans_Devanagari } from "next/font/google";

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
  preload: true,
});

export const fontVariables = notoDevanagari.variable;
