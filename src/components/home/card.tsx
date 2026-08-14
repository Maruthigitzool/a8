import type { ReactNode } from "react";
import Link from "next/link";

type CardVariant = "default" | "icon";

type CardProps = {
  title: string;
  excerpt: string;
  index?: number;
  variant?: CardVariant;
  icon?: ReactNode;
  href?: string;
  linkText?: string;
};

export function Card({
  title,
  excerpt,
  index = 0,
  variant = "default",
  icon,
  href,
  linkText = "Read More",
}: CardProps) {
  return (
    <article className="card" data-gsap-item>
      {variant === "default" && (
        <div
          className={index % 2 === 0 ? "card-media-cool" : "card-media-warm"}
        />
      )}

      <div className="flex flex-1 flex-col p-card">
        {variant === "icon" && icon ? (
          <div className="card-icon">{icon}</div>
        ) : null}

        <h3 className="card-title">{title}</h3>
        <p className="card-excerpt">{excerpt}</p>

        {href ? (
          <Link href={href} className="link-brand mt-auto inline-flex pt-6">
            {linkText} <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}
