import type { ReactNode } from "react";

type ButtonVariant = "solid" | "outline" | "inverted" | "accent";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
  target?: string;
  rel?: string;
  dataGsap?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  solid: "border border-brand bg-brand text-white shadow-[0_18px_48px_rgba(50,48,160,0.14)]",
  outline: "border border-brand bg-white text-brand shadow-[0_16px_40px_rgba(82,80,146,0.08)]",
  inverted: "border border-white bg-white text-brand shadow-[0_18px_48px_rgba(255,255,255,0.22)]",
  accent: "border border-transparent bg-accent text-white shadow-[0_18px_48px_rgba(217,88,31,0.18)]",
};

export function Button({
  children,
  href,
  variant = "solid",
  className = "",
  target,
  rel,
  dataGsap,
}: ButtonProps) {
  return (
    <a
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-[10px] px-5 py-[11px] text-[14px] font-semibold transition duration-300 will-change-transform ${variantClasses[variant]} ${className}`}
      href={href}
      target={target}
      rel={rel}
      data-gsap-button={dataGsap ?? ""}
      data-gsap={dataGsap}
      data-gsap-item={dataGsap ?? undefined}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition duration-500 group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </a>
  );
}
