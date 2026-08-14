import type { ReactNode } from "react";

import { cn } from "@/app/lib/cn";

type ButtonVariant = "solid" | "outline" | "inverted" | "accent";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
  size?: "md" | "lg";
  target?: string;
  rel?: string;
  dataGsap?: string;
};

export function Button({
  children,
  href,
  variant = "solid",
  className = "",
  size = "md",
  target,
  rel,
  dataGsap,
}: ButtonProps) {
  return (
    <a
      className={cn(
        "btn",
        `btn-${variant}`,
        size === "lg" && "btn-lg",
        "group",
        className,
      )}
      href={href}
      target={target}
      rel={rel}
      data-gsap-button={dataGsap ?? ""}
      data-gsap={dataGsap}
      data-gsap-item={dataGsap ?? undefined}
    >
      <span className="btn-shine" />
      <span className="relative z-10">{children}</span>
    </a>
  );
}
