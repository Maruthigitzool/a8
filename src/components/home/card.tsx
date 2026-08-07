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
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white" data-gsap-item>
            {variant === "default" && (
                <div
                    className={`h-36 ${index % 2 === 0
                        ? "bg-[linear-gradient(135deg,#c9d0f5,#e9ecfa)]"
                        : "bg-[linear-gradient(135deg,#fad9c6,#fbede2)]"
                        }`}
                />
            )}

            <div className="flex flex-1 flex-col p-7">
                {variant === "icon" && (
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ECEBFF]">
                        {icon}
                    </div>
                )}

                <h3 className="mb-2 font-display text-[19px] font-bold leading-tight text-foreground">
                    {title}
                </h3>

                <p className="text-[15px] text-muted">
                    {excerpt}
                </p>

                {href && (
                    <Link
                        href={href}
                        className="mt-auto pt-6 inline-flex font-display text-[14px] font-semibold text-brand hover:text-accent"
                    >
                        {linkText} <span aria-hidden="true">→</span>
                    </Link>
                )}
            </div>
        </article>
    );
}
