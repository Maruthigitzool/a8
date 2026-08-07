"use client";

import { useEffect, useLayoutEffect, useRef, type MutableRefObject } from "react";
import { gsap } from "@/animations/gsap";
import { motionAllowed } from "@/animations/gsap";
import { createHeroTimeline, initializeHeroPointerMotion } from "@/animations/hero.animation";
import { initializeButtonInteractions } from "@/animations/button.animation";
import {
    createSectionTimeline,
    type SectionAnimation,
    type SectionAnimationConfig,
} from "@/animations/section.animation";

type UseGsapAnimationOptions = {
    animation: SectionAnimation;
    scrollStart?: string;
};

/**
 * Schedule work during a browser idle period so GSAP/ScrollTrigger setup
 * does not block the main thread during initial paint.
 * Falls back to setTimeout(fn, 0) in environments without requestIdleCallback
 * (e.g. Safari < 16, SSR).
 */
const scheduleIdleCallback = (fn: () => void): number => {
    if (typeof requestIdleCallback !== "undefined") {
        return requestIdleCallback(fn, { timeout: 1000 });
    }
    return setTimeout(fn, 0) as unknown as number;
};

const cancelIdleCallback_ = (id: number): void => {
    if (typeof cancelIdleCallback !== "undefined") {
        cancelIdleCallback(id);
    } else {
        clearTimeout(id);
    }
};

export function useGsapAnimation({ animation, scrollStart }: UseGsapAnimationOptions) {
    const scopeRef = useRef<HTMLDivElement | null>(null);

    // ── Hero: must run synchronously before paint to prevent flash ──────────
    useLayoutEffect(() => {
        if (animation !== "hero") return;

        const root = scopeRef.current;
        if (!root || !motionAllowed()) return;

        let removeButtonInteractions: (() => void) | undefined;
        let removeHeroInteractions: (() => void) | undefined;

        const ctx = gsap.context(() => {
            createHeroTimeline(root);
            removeButtonInteractions = initializeButtonInteractions(root);
            removeHeroInteractions = initializeHeroPointerMotion(root);
        }, root);

        return () => {
            removeHeroInteractions?.();
            removeButtonInteractions?.();
            ctx.revert();
        };
    }, [animation]);

    // ── Scroll-triggered sections: defer until after paint ──────────────────
    // Using useEffect (runs after commit + paint) combined with
    // requestIdleCallback so GSAP/ScrollTrigger init never blocks hydration.
    // This is the primary fix for TBT = 3,110 ms.
    useEffect(() => {
        if (animation === "hero") return;

        const root = scopeRef.current;
        if (!root || !motionAllowed()) return;

        let idleId: number;
        let removeButtonInteractions: (() => void) | undefined;
        let ctx: ReturnType<typeof gsap.context> | undefined;

        idleId = scheduleIdleCallback(() => {
            ctx = gsap.context(() => {
                createSectionTimeline(root, animation, {
                    start: scrollStart ?? "top 80%",
                } as SectionAnimationConfig);
                removeButtonInteractions = initializeButtonInteractions(root);
            }, root);
        });

        return () => {
            // Cancel if the idle callback hasn't fired yet
            cancelIdleCallback_(idleId);
            removeButtonInteractions?.();
            ctx?.revert();
        };
    }, [animation, scrollStart]);

    return { scopeRef } as { scopeRef: MutableRefObject<HTMLDivElement | null> };
}
