"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/animations/gsap";

type HeaderMotionProps = {
    children: ReactNode;
};

export function HeaderMotion({ children }: HeaderMotionProps) {
    const scopeRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const root = scopeRef.current;
        if (!root) return;

        const nav = root.querySelector<HTMLElement>("[data-gsap-header-nav]");
        const indicator = root.querySelector<HTMLElement>("[data-gsap-header-indicator]");
        const links = Array.from(root.querySelectorAll<HTMLElement>("[data-gsap-nav-link]"));

        if (!nav || !indicator || !links.length) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.set(indicator, { width: 0, x: 0, opacity: 0.8 });

            const indicatorTimeline = gsap.timeline({ paused: true });
            const moveIndicator = (target: HTMLElement) => {
                const bounds = target.getBoundingClientRect();
                const navBounds = nav.getBoundingClientRect();

                indicatorTimeline.to(indicator, {
                    x: bounds.left - navBounds.left,
                    width: bounds.width,
                    duration: 0.4,
                    ease: "power3.out",
                }, 0);

                indicatorTimeline.play();
            };

            const cleanupTasks: Array<() => void> = [];

            links.forEach((link) => {
                const enter = () => {
                    moveIndicator(link);
                    gsap.to(link, {
                        y: -1,
                        color: "#0c1024",
                        duration: 0.28,
                        ease: "power3.out",
                    });
                };

                const leave = () => {
                    gsap.to(link, {
                        y: 0,
                        color: "#475569",
                        duration: 0.28,
                        ease: "power3.out",
                    });

                    gsap.to(indicator, {
                        opacity: 0.8,
                        duration: 0.28,
                        ease: "power3.out",
                    });
                };

                link.addEventListener("pointerenter", enter);
                link.addEventListener("pointerleave", leave);
                link.addEventListener("focus", enter);
                link.addEventListener("blur", leave);

                cleanupTasks.push(() => {
                    link.removeEventListener("pointerenter", enter);
                    link.removeEventListener("pointerleave", leave);
                    link.removeEventListener("focus", enter);
                    link.removeEventListener("blur", leave);
                });
            });

            return () => cleanupTasks.forEach((task) => task());
        }, root);

        return () => ctx.revert();
    }, []);

    return <div ref={scopeRef}>{children}</div>;
}
