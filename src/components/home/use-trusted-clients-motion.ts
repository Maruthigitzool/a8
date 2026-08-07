"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TrustedClient = {
    documentId: string;
    Title: string;
    Url: string | null;
    clone: boolean;
};

type UseTrustedClientsMotionResult = {
    scopeRef: RefObject<HTMLDivElement | null>;
};

function getMotionAllowed() {
    return (
        typeof window !== "undefined" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

export function useTrustedClientsMotion(): UseTrustedClientsMotionResult {
    const scopeRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const scope = scopeRef.current;

        if (!scope || !getMotionAllowed()) {
            return;
        }

        let dispose: () => void = () => {};

        const ctx = gsap.context(() => {
            const root = scope;
            const label = root.querySelector<HTMLElement>("[data-trusted-clients-label]");
            const mobileShell = root.querySelector<HTMLElement>(
                "[data-trusted-clients-shell='mobile-primary']"
            );
            const mobileTrack = root.querySelector<HTMLElement>(
                "[data-trusted-clients-track='mobile-primary']"
            );
            const desktopPrimaryShell = root.querySelector<HTMLElement>(
                "[data-trusted-clients-shell='desktop-primary']"
            );
            const desktopPrimaryTrack = root.querySelector<HTMLElement>(
                "[data-trusted-clients-track='desktop-primary']"
            );

            if (!label || !mobileShell || !mobileTrack || !desktopPrimaryShell || !desktopPrimaryTrack) {
                return;
            }

            const mm = gsap.matchMedia();
            const hoverCleanups: Array<() => void> = [];

            const attachHoverMotion = (items: NodeListOf<HTMLElement>) => {
                items.forEach((item) => {
                    const handleEnter = () => {
                        gsap.to(item, {
                            y: -4,
                            scale: 1.03,
                            rotateZ: -0.35,
                            duration: 0.28,
                            ease: "power3.out",
                            overwrite: "auto",
                        });
                    };

                    const handleLeave = () => {
                        gsap.to(item, {
                            y: 0,
                            scale: 1,
                            rotateZ: 0,
                            duration: 0.34,
                            ease: "power3.out",
                            overwrite: "auto",
                        });
                    };

                    item.addEventListener("mouseenter", handleEnter);
                    item.addEventListener("mouseleave", handleLeave);
                    item.addEventListener("focus", handleEnter);
                    item.addEventListener("blur", handleLeave);

                    hoverCleanups.push(() => {
                        item.removeEventListener("mouseenter", handleEnter);
                        item.removeEventListener("mouseleave", handleLeave);
                        item.removeEventListener("focus", handleEnter);
                        item.removeEventListener("blur", handleLeave);
                    });
                });
            };

            attachHoverMotion(root.querySelectorAll<HTMLElement>("[data-trusted-clients-item]"));

            const pauseTargets = (targets: gsap.core.Tween[]) => {
                targets.forEach((tween) => tween.pause());
            };

            const playTargets = (targets: gsap.core.Tween[]) => {
                targets.forEach((tween) => tween.play());
            };

            const addDesktopMotion = () => {
                const localLoops: gsap.core.Tween[] = [];
                const localTriggers: ScrollTrigger[] = [];
                const primaryDrift = gsap.quickSetter(desktopPrimaryTrack, "y", "px");

                const intro = gsap.timeline({
                    defaults: {
                        ease: "power4.out",
                    },
                    scrollTrigger: {
                        trigger: root,
                        start: "top 82%",
                        once: true,
                    },
                });

                intro.fromTo(label, { x: -18 }, { x: 0, duration: 0.65 }, 0);
                intro.fromTo(
                    desktopPrimaryShell,
                    { x: 24, clipPath: "inset(0 100% 0 0)" },
                    { x: 0, clipPath: "inset(0 0% 0 0)", duration: 0.95 },
                    0.1
                );

                localLoops.push(
                    gsap.to(desktopPrimaryTrack, {
                        xPercent: -50,
                        duration: 28,
                        ease: "none",
                        repeat: -1,
                        force3D: true,
                    })
                );

                const tracker = ScrollTrigger.create({
                    trigger: root,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate(self) {
                        const depth = gsap.utils.interpolate(-10, 10, self.progress);
                        primaryDrift(depth * 0.35);
                    },
                });

                localTriggers.push(tracker);

                const pauseOnHover = () => pauseTargets(localLoops);
                const resumeOnHover = () => playTargets(localLoops);
                const handleFocusOut = (event: FocusEvent) => {
                    if (!root.contains(event.relatedTarget as Node | null)) {
                        resumeOnHover();
                    }
                };

                root.addEventListener("pointerenter", pauseOnHover);
                root.addEventListener("pointerleave", resumeOnHover);
                root.addEventListener("focusin", pauseOnHover);
                root.addEventListener("focusout", handleFocusOut);

                return () => {
                    intro.kill();
                    localTriggers.forEach((trigger) => trigger.kill());
                    localLoops.forEach((tween) => tween.kill());
                    root.removeEventListener("pointerenter", pauseOnHover);
                    root.removeEventListener("pointerleave", resumeOnHover);
                    root.removeEventListener("focusin", pauseOnHover);
                    root.removeEventListener("focusout", handleFocusOut);
                };
            };

            const addMobileMotion = () => {
                const localLoops: gsap.core.Tween[] = [];
                const localTriggers: ScrollTrigger[] = [];
                const primaryDrift = gsap.quickSetter(mobileTrack, "y", "px");

                const intro = gsap.timeline({
                    defaults: {
                        ease: "power4.out",
                    },
                    scrollTrigger: {
                        trigger: root,
                        start: "top 84%",
                        once: true,
                    },
                });

                intro.fromTo(label, { x: -14 }, { x: 0, duration: 0.6 }, 0);
                intro.fromTo(
                    mobileShell,
                    { x: 18, clipPath: "inset(0 100% 0 0)" },
                    { x: 0, clipPath: "inset(0 0% 0 0)", duration: 0.9 },
                    0.1
                );

                localLoops.push(
                    gsap.to(mobileTrack, {
                        xPercent: -50,
                        duration: 20,
                        ease: "none",
                        repeat: -1,
                        force3D: true,
                    })
                );

                const tracker = ScrollTrigger.create({
                    trigger: root,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate(self) {
                        const depth = gsap.utils.interpolate(-6, 6, self.progress);
                        primaryDrift(depth * 0.35);
                    },
                });

                localTriggers.push(tracker);

                const pauseOnHover = () => pauseTargets(localLoops);
                const resumeOnHover = () => playTargets(localLoops);
                const handleFocusOut = (event: FocusEvent) => {
                    if (!root.contains(event.relatedTarget as Node | null)) {
                        resumeOnHover();
                    }
                };

                root.addEventListener("pointerenter", pauseOnHover);
                root.addEventListener("pointerleave", resumeOnHover);
                root.addEventListener("focusin", pauseOnHover);
                root.addEventListener("focusout", handleFocusOut);

                return () => {
                    intro.kill();
                    localTriggers.forEach((trigger) => trigger.kill());
                    localLoops.forEach((tween) => tween.kill());
                    root.removeEventListener("pointerenter", pauseOnHover);
                    root.removeEventListener("pointerleave", resumeOnHover);
                    root.removeEventListener("focusin", pauseOnHover);
                    root.removeEventListener("focusout", handleFocusOut);
                };
            };

            mm.add("(min-width: 768px)", addDesktopMotion);
            mm.add("(max-width: 767px)", addMobileMotion);

            dispose = () => {
                hoverCleanups.forEach((cleanup) => cleanup());
                mm.revert();
            };
        }, scope);

        return () => {
            dispose();
            ctx.revert();
        };
    }, []);

    return { scopeRef };
}

export type { TrustedClient };
