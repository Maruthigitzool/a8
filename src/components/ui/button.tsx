import type { ReactNode } from "react";

type ButtonVariant = "solid" | "outline" | "inverted" | "accent";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
  target?: string;
  rel?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  solid: "bg-brand text-white hover:bg-brand-deep",
  outline: "border border-brand text-brand hover:bg-brand hover:text-white",
  inverted: "bg-white text-brand hover:bg-mint",
  accent: "bg-accent text-white hover:bg-[#d9581f]",
};

export function Button({
  children,
  href,
  variant = "solid",
  className = "",
  target,
  rel,
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center  font-semibold text-[14px] px-5 py-[11px] rounded-[10px] font-semibold transition duration-150 hover:-translate-y-px ${variantClasses[variant]} ${className}`}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
