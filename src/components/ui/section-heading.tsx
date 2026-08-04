import type { ReactNode } from "react";

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
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`.trim()}>
      <div className="mb-4 font-display text-[13px] font-bold uppercase tracking-[0.16em] text-accent">
        {eyebrow}
      </div>
      <h2 className="max-w-[880px] leading-[1.05] font-display text-[clamp(30px,3.6vw,46px)] font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description ? (
        <div className="mt-4 max-w-[720px] text-[18px] text-muted">{description}</div>
      ) : null}
    </div>
  );
}
