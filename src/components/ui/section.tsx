import type { ReactNode } from "react";

import { cn } from "@/app/lib/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "white";
  size?: "default" | "lg" | "none";
};

export function Section({
  children,
  className = "",
  id,
  tone = "default",
  size = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        size === "default" && "section",
        size === "lg" && "section-lg",
        tone === "muted" && "section-muted",
        tone === "white" && "section-white",
        className,
      )}
    >
      {children}
    </section>
  );
}
