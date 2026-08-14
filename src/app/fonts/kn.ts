import { Noto_Sans_Kannada } from "next/font/google";

const notoKannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  weight: ["400", "600", "700"],
  variable: "--font-kannada",
  display: "swap",
  preload: true,
});

export const fontVariables = notoKannada.variable;
