import { gsap } from "@/animations/gsap";
import { heroMotion, isFinePointer } from "@/animations/hero.motion";

const HERO_ROOT = "[data-gsap-hero-root]";
const HERO_WRAPPER = "[data-gsap-hero-wrapper]";
const HERO_ANNOUNCEMENT = "[data-gsap-hero-announcement]";
const HERO_ANNOUNCEMENT_SWEEP = "[data-gsap-hero-announcement-sweep]";
const HERO_TITLE_WORD = "[data-gsap-hero-word]";
const HERO_COPY = "[data-gsap-hero-copy]";
const HERO_CTA = "[data-gsap='hero-button']";
const HERO_TRUSTED = "[data-gsap-hero-trusted]";
const TRUSTED_LABEL = "[data-trusted-clients-label]";

export function createHeroTimeline(root: HTMLElement) {
    const heroRoot = root.querySelector<HTMLElement>(HERO_ROOT);
    const heroWrapper = root.querySelector<HTMLElement>(HERO_WRAPPER);
    const announcement = root.querySelector<HTMLElement>(HERO_ANNOUNCEMENT);
    const announcementSweep = root.querySelector<HTMLElement>(HERO_ANNOUNCEMENT_SWEEP);
    const titleWords = root.querySelectorAll<HTMLElement>(HERO_TITLE_WORD);
    const copySegments = root.querySelectorAll<HTMLElement>(HERO_COPY);
    const cta = root.querySelector<HTMLElement>(HERO_CTA);
    const trustedSection = root.querySelector<HTMLElement>(HERO_TRUSTED);
    const trustedLabel = root.querySelector<HTMLElement>(TRUSTED_LABEL);
    const glow = root.querySelector<HTMLElement>('[data-hero-layer="glow"]');
    const grid = root.querySelector<HTMLElement>('[data-hero-layer="grid"]');
    const orbA = root.querySelector<HTMLElement>('[data-hero-layer="orb-a"]');
    const orbB = root.querySelector<HTMLElement>('[data-hero-layer="orb-b"]');
    const streak = root.querySelector<HTMLElement>('[data-hero-layer="streak"]');

    if (!heroRoot || !heroWrapper || !titleWords.length || !cta) {
        return null;
    }

    const timeline = gsap.timeline({
        defaults: {
            ease: heroMotion.ease.settle,
            overwrite: "auto",
        },
    });

    const atmosphereLayers = [glow, grid, orbA, orbB, streak].filter(
        (layer): layer is HTMLElement => Boolean(layer)
    );

    gsap.set(atmosphereLayers, {
        autoAlpha: 0,
    });

    if (announcement) {
        gsap.set(announcement, {
            clipPath: "inset(0 0 100% 0)",
            y: 10,
            autoAlpha: 1,
        });
    }

    gsap.set(titleWords, {
        yPercent: 118,
        force3D: true,
    });

    gsap.set(copySegments, {
        yPercent: 110,
        autoAlpha: 1,
    });

    gsap.set(cta, {
        autoAlpha: 0,
        y: 18,
        rotateX: 12,
        transformOrigin: "50% 100%",
        transformPerspective: 700,
    });

    if (trustedSection) {
        gsap.set(trustedSection, { autoAlpha: 0, y: 16 });
    }

    timeline.addLabel("hero.intro", 0);

    timeline.to(
        [glow, grid],
        {
            autoAlpha: 1,
            duration: 1.4,
            ease: heroMotion.ease.soft,
            stagger: 0.12,
        },
        "hero.intro"
    );

    if (announcement) {
        timeline.to(
            announcement,
            {
                clipPath: "inset(0 0 0% 0)",
                y: 0,
                duration: heroMotion.duration.announcement,
                ease: heroMotion.ease.reveal,
            },
            `hero.intro+=${heroMotion.intro.announcement}`
        );
    }

    if (announcementSweep) {
        timeline.fromTo(
            announcementSweep,
            { xPercent: -120, autoAlpha: 0.18 },
            {
                xPercent: 120,
                autoAlpha: 0,
                duration: 1.1,
                ease: heroMotion.ease.sweep,
            },
            "hero.intro+=0.18"
        );
    }

    timeline.to(
        titleWords,
        {
            yPercent: 0,
            duration: heroMotion.duration.word,
            stagger: heroMotion.stagger.word,
            ease: heroMotion.ease.reveal,
        },
        `hero.intro+=${heroMotion.intro.title}`
    );

    if (copySegments.length) {
        timeline.to(
            copySegments,
            {
                yPercent: 0,
                duration: heroMotion.duration.copy,
                stagger: heroMotion.stagger.copy,
                ease: heroMotion.ease.settle,
            },
            `hero.intro+=${heroMotion.intro.copy}`
        );
    }

    timeline.to(
        cta,
        {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: heroMotion.duration.cta,
            ease: heroMotion.ease.settle,
        },
        `hero.intro+=${heroMotion.intro.cta}`
    );

    const activatingLayers = [orbA, orbB, streak].filter(
        (layer): layer is HTMLElement => Boolean(layer)
    );

    if (activatingLayers.length) {
        timeline.to(
            activatingLayers,
            {
                autoAlpha: 1,
                duration: heroMotion.duration.atmosphere,
                stagger: 0.16,
                ease: heroMotion.ease.soft,
            },
            `hero.intro+=${heroMotion.intro.atmosphere}`
        );
    }

    if (trustedLabel) {
        timeline.fromTo(
            trustedLabel,
            { autoAlpha: 0, y: 8 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                ease: heroMotion.ease.soft,
            },
            `hero.intro+=${heroMotion.intro.trusted}`
        );
    }

    if (trustedSection) {
        timeline.to(
            trustedSection,
            {
                autoAlpha: 1,
                y: 0,
                duration: heroMotion.duration.trusted,
                ease: heroMotion.ease.settle,
            },
            `hero.intro+=${heroMotion.intro.trusted + 0.08}`
        );
    }

    if (orbA) {
        timeline.to(
            orbA,
            {
                x: 24,
                y: -18,
                duration: 18,
                ease: "none",
                repeat: -1,
                yoyo: true,
            },
            "hero.intro+=1.4"
        );
    }

    if (orbB) {
        timeline.to(
            orbB,
            {
                x: -20,
                y: 14,
                duration: 22,
                ease: "none",
                repeat: -1,
                yoyo: true,
            },
            "hero.intro+=1.5"
        );
    }

    createHeroScrollMotion(heroRoot, {
        wrapper: heroWrapper,
        glow,
        grid,
        orbA,
        orbB,
        trustedSection,
        title: root.querySelector<HTMLElement>("[data-gsap-hero-title]"),
    });

    return timeline;
}

function createHeroScrollMotion(
    heroRoot: HTMLElement,
    layers: {
        wrapper: HTMLElement;
        glow: HTMLElement | null;
        grid: HTMLElement | null;
        orbA: HTMLElement | null;
        orbB: HTMLElement | null;
        trustedSection: HTMLElement | null;
        title: HTMLElement | null;
    }
) {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: heroRoot,
            start: "top top",
            end: "bottom top",
            scrub: 0.65,
            invalidateOnRefresh: true,
        },
    });

    if (layers.title) {
        timeline.to(
            layers.title,
            {
                y: heroMotion.scroll.headingY,
                autoAlpha: heroMotion.scroll.headingOpacity,
                ease: "none",
            },
            0
        );
    }

    if (layers.glow) {
        timeline.to(layers.glow, { y: heroMotion.scroll.glowY, ease: "none" }, 0);
    }

    if (layers.grid) {
        timeline.to(layers.grid, { y: heroMotion.scroll.gridY, ease: "none" }, 0);
    }

    if (layers.orbA) {
        timeline.to(layers.orbA, { y: heroMotion.scroll.orbAY, ease: "none" }, 0);
    }

    if (layers.orbB) {
        timeline.to(layers.orbB, { y: heroMotion.scroll.orbBY, ease: "none" }, 0);
    }

    if (layers.trustedSection) {
        timeline.to(
            layers.trustedSection,
            { y: heroMotion.scroll.trustedY, ease: "none" },
            0
        );
    }
}

export function initializeHeroPointerMotion(root: HTMLElement) {
    const heroRoot = root.querySelector<HTMLElement>(HERO_ROOT);
    const glow = root.querySelector<HTMLElement>('[data-hero-layer="glow"]');
    const grid = root.querySelector<HTMLElement>('[data-hero-layer="grid"]');
    const orbA = root.querySelector<HTMLElement>('[data-hero-layer="orb-a"]');
    const orbB = root.querySelector<HTMLElement>('[data-hero-layer="orb-b"]');
    const trustedSection = root.querySelector<HTMLElement>(HERO_TRUSTED);
    const cta = root.querySelector<HTMLElement>(HERO_CTA);

    if (!heroRoot || !isFinePointer()) {
        return () => undefined;
    }

    const moveGlow = glow
        ? gsap.quickTo(glow, "x", { duration: 1.1, ease: heroMotion.ease.soft })
        : null;
    const moveGrid = grid
        ? gsap.quickTo(grid, "x", { duration: 1.4, ease: heroMotion.ease.soft })
        : null;
    const moveOrbA = orbA
        ? gsap.quickTo(orbA, "x", { duration: 0.9, ease: heroMotion.ease.soft })
        : null;
    const moveOrbB = orbB
        ? gsap.quickTo(orbB, "x", { duration: 1.3, ease: heroMotion.ease.soft })
        : null;
    const moveTrusted = trustedSection
        ? gsap.quickTo(trustedSection, "x", {
              duration: 1.2,
              ease: heroMotion.ease.soft,
          })
        : null;
    const moveCta = cta
        ? gsap.quickTo(cta, "x", { duration: 0.45, ease: heroMotion.ease.soft })
        : null;
    const moveCtaY = cta
        ? gsap.quickTo(cta, "y", { duration: 0.45, ease: heroMotion.ease.soft })
        : null;

    const handlePointerMove = (event: PointerEvent) => {
        const bounds = heroRoot.getBoundingClientRect();
        const nx = (event.clientX - bounds.left) / bounds.width - 0.5;
        const ny = (event.clientY - bounds.top) / bounds.height - 0.5;

        moveGlow?.(nx * heroMotion.pointer.glow);
        moveGrid?.(nx * heroMotion.pointer.grid * -1);
        moveOrbA?.(nx * heroMotion.pointer.orbA);
        moveOrbB?.(nx * heroMotion.pointer.orbB * -1);
        moveTrusted?.(nx * heroMotion.pointer.trusted);
        moveCta?.(nx * 4);
        moveCtaY?.(ny * 3);

        if (glow) {
            gsap.to(glow, {
                y: ny * 14,
                duration: 1.1,
                ease: heroMotion.ease.soft,
                overwrite: "auto",
            });
        }
    };

    const resetPointer = () => {
        moveGlow?.(0);
        moveGrid?.(0);
        moveOrbA?.(0);
        moveOrbB?.(0);
        moveTrusted?.(0);
        moveCta?.(0);
        moveCtaY?.(0);
    };

    heroRoot.addEventListener("pointermove", handlePointerMove);
    heroRoot.addEventListener("pointerleave", resetPointer);

    return () => {
        heroRoot.removeEventListener("pointermove", handlePointerMove);
        heroRoot.removeEventListener("pointerleave", resetPointer);
    };
}
