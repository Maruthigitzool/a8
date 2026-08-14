"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

type SectionAnimation = "hero" | "stack" | "panel" | "split" | "list" | "dsm";

type SectionAnimatorProps = {
  children: ReactNode;
  animation: SectionAnimation;
  className?: string;
  scrollStart?: string;
};

const SectionAnimatorClient = dynamic(
  () =>
    import("./section-animator-client").then(
      (mod) => mod.SectionAnimatorClient,
    ),
  { ssr: false },
);

export function SectionAnimator({
  children,
  animation,
  className = "",
  scrollStart = "top 80%",
}: SectionAnimatorProps) {
  return (
    <SectionAnimatorClient
      animation={animation}
      className={className}
      scrollStart={scrollStart}
    >
      {children}
    </SectionAnimatorClient>
  );
}
