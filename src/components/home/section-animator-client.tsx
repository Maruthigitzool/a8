"use client";

import { useGsapAnimation } from "@/hooks/use-gsap-animation";
import type { ReactNode } from "react";

type SectionAnimation = "hero" | "stack" | "panel" | "split" | "list" | "dsm";

type SectionAnimatorProps = {
    children: ReactNode;
    animation: SectionAnimation;
    className?: string;
    scrollStart?: string;
};

export function SectionAnimatorClient({
    children,
    animation,
    className = "",
    scrollStart = "top 80%",
}: SectionAnimatorProps) {
    const { scopeRef } = useGsapAnimation({ animation, scrollStart });

    return (
        <div ref={scopeRef} className={className}>
            {children}
        </div>
    );
}
