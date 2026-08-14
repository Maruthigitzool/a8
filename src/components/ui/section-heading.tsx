import type { ReactNode } from "react";

import { cn } from "@/app/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  centered?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(centered && "mx-auto text-center", className)}
      data-gsap="section-heading"
    >
      <div className="type-eyebrow mb-4" data-gsap-part="eyebrow">
        {eyebrow}
      </div>
      <h2 className="type-heading" data-gsap-part="title">
        {title}
      </h2>
      {description ? (
        <div className="type-lede" data-gsap-part="description">
          {description}
        </div>
      ) : null}
    </div>
  );
}
