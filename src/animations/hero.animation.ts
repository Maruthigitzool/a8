import { gsap } from "@/animations/gsap";
import { signatureSoft } from "@/animations/easing";

const HERO_ROOT = "[data-gsap-hero-root]";
const HERO_WRAPPER = "[data-gsap-hero-wrapper]";
const HERO_ANNOUNCEMENT = "[data-gsap-hero-announcement]";
const HERO_ANNOUNCEMENT_SWEEP = "[data-gsap-hero-announcement-sweep]";
const HERO_TITLE_WORD = "[data-gsap-hero-word]";
const HERO_DESCRIPTION = "[data-gsap-hero-description]";
const HERO_COPY_SEGMENT = "[data-gsap-hero-copy]";
const HERO_CTA = "[data-gsap='hero-button']";
const HERO_TRUSTED = "[data-gsap-hero-trusted]";
const TRUSTED_LABEL = "[data-trusted-clients-label]";

export function createHeroTimeline(root: HTMLElement) {
    const heroRoot = root.querySelector<HTMLElement>(HERO_ROOT);
    const heroWrapper = root.querySelector<HTMLElement>(HERO_WRAPPER);
    const announcement = root.querySelector<HTMLElement>(HERO_ANNOUNCEMENT);
    const announcementSweep = root.querySelector<HTMLElement>(HERO_ANNOUNCEMENT_SWEEP);
    const titleWords = root.querySelectorAll<HTMLElement>(HERO_TITLE_WORD);
    const description = root.querySelector<HTMLElement>(HERO_DESCRIPTION);
    const copySegments = root.querySelectorAll<HTMLElement>(HERO_COPY_SEGMENT);
    const cta = root.querySelector<HTMLElement>(HERO_CTA);
    const trustedSection = root.querySelector<HTMLElement>(HERO_TRUSTED);
    const trustedLabel = root.querySelector<HTMLElement>(TRUSTED_LABEL);

    if (!heroRoot || !heroWrapper || !announcement || !titleWords.length || !description || !cta) {
        return null;
    }

    const timeline = gsap.timeline({
        defaults: {
            duration: 0.85,
            ease: "power3.out",
            overwrite: "auto",
        },
    });
    timeline.set(heroWrapper, {
        transformStyle: "preserve-3d",
        willChange: "transform",
    });
    
    // Initial states based on premium typographic animation requirements
    timeline.set(titleWords, {
        yPercent: 100,
        autoAlpha: 0,
        clipPath: "inset(100% 0 0 0)",
        filter: "blur(4px)", // slight blur
        transformOrigin: "top center",
    });
    timeline.set(copySegments, {
        yPercent: 20,
        autoAlpha: 0,
        filter: "blur(8px)", // softer motion without scale
        transformOrigin: "top center",
    });
    timeline.set(announcementSweep, { xPercent: -100, autoAlpha: 0.22 });
    timeline.set(cta, { transformStyle: "preserve-3d", autoAlpha: 0, scale: 0.94 }); // scale 0.94 -> 1
    
    // Trusted section flowing motion setup
    if (trustedSection) {
        timeline.set(trustedSection, { 
            autoAlpha: 0, 
            x: 40, // Horizontal flow setup
            clipPath: "inset(0 100% 0 0)"
        });
    }

    timeline.addLabel("hero.intro", 0);

    // 1. Announcement banner (width expansion / mask reveal)
    timeline.fromTo(
        announcement,
        {
            autoAlpha: 0,
            scaleX: 0.95,
            clipPath: "inset(0 100% 0 0)",
        },
        {
            autoAlpha: 1,
            scaleX: 1,
            clipPath: "inset(0 0 0 0)",
            duration: 0.9,
            ease: "power2.out",
            transformOrigin: "left center"
        },
        "hero.intro"
    );

    timeline.to(
        announcementSweep,
        {
            xPercent: 110,
            opacity: 0.08,
            duration: 0.8,
            ease: "power2.inOut",
        },
        "hero.intro+=0.2"
    );

    // 2. Headline premium typography mask reveal
    timeline.to(
        titleWords,
        {
            yPercent: 0,
            autoAlpha: 1,
            clipPath: "inset(0% 0 0 0)",
            filter: "blur(0px)",
            duration: 0.95,
            stagger: 0.08, // faster stagger
            ease: "power3.out",
        },
        "hero.intro+=0.4"
    );

    // 3. Subtitle softer motion
    if (copySegments.length) {
        timeline.to(
            copySegments,
            {
                yPercent: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.85,
                stagger: 0.08,
                ease: "power2.out",
            },
            "hero.intro+=0.9"
        );
    }

    // 4. CTA scale + opacity entrance
    timeline.to(
        cta,
        {
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.2)", // smoother than elastic
        },
        "hero.intro+=1.2"
    );

    // 5. Trusted logos coordinated horizontal movement
    if (trustedLabel && trustedSection) {
        timeline.fromTo(
            trustedLabel,
            {
                autoAlpha: 0,
                x: -10,
            },
            {
                autoAlpha: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
            },
            "hero.intro+=1.4"
        );

        timeline.to(
            trustedSection,
            {
                x: 0,
                autoAlpha: 1,
                clipPath: "inset(0 0% 0 0)",
                duration: 0.9,
                ease: "power3.out",
            },
            "hero.intro+=1.5"
        );
    }

    createHeroScrollMotion(heroRoot, heroWrapper, trustedSection);

    return timeline;
}

function createHeroScrollMotion(
    heroRoot: HTMLElement,
    heroWrapper: HTMLElement,
    trustedSection: HTMLElement | null
) {
    const heroScrollTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: heroRoot,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
        },
    });

    heroScrollTimeline.to(heroWrapper, {
        yPercent: -4,
        scale: 0.986,
        transformOrigin: "center top",
        ease: "none",
    }, 0);

    if (trustedSection) {
        heroScrollTimeline.to(
            trustedSection,
            {
                yPercent: 2,
                ease: "none",
            },
            0
        );
    }
}

export function initializeHeroPointerMotion(root: HTMLElement) {
    const heroRoot = root.querySelector<HTMLElement>(HERO_ROOT);
    const heroWrapper = root.querySelector<HTMLElement>(HERO_WRAPPER);
    const cta = root.querySelector<HTMLElement>(HERO_CTA);

    if (!heroRoot || !heroWrapper) {
        return () => { };
    }

    const maxTranslate = 12;
    const maxRotation = 2.5;
    const state = { x: 0, y: 0, rotationX: 0, rotationY: 0 };
    let animationFrame = 0;

    const setX = gsap.quickSetter(heroWrapper, "x", "px");
    const setY = gsap.quickSetter(heroWrapper, "y", "px");
    const setRotationX = gsap.quickSetter(heroWrapper, "rotationX", "deg");
    const setRotationY = gsap.quickSetter(heroWrapper, "rotationY", "deg");

    const updateTransform = () => {
        setX(state.x);
        setY(state.y);
        setRotationX(state.rotationX);
        setRotationY(state.rotationY);
        animationFrame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
        const bounds = heroRoot.getBoundingClientRect();
        const offsetX = event.clientX - bounds.left - bounds.width / 2;
        const offsetY = event.clientY - bounds.top - bounds.height / 2;

        state.x = gsap.utils.clamp(-maxTranslate, maxTranslate, (offsetX / bounds.width) * maxTranslate * 1.2);
        state.y = gsap.utils.clamp(-maxTranslate, maxTranslate, (offsetY / bounds.height) * maxTranslate * 0.6);
        state.rotationY = gsap.utils.clamp(-maxRotation, maxRotation, (offsetX / bounds.width) * maxRotation);
        state.rotationX = gsap.utils.clamp(-maxRotation, maxRotation, (-offsetY / bounds.height) * maxRotation);

        if (!animationFrame) {
            animationFrame = requestAnimationFrame(updateTransform);
        }
    };

    const resetPointer = () => {
        gsap.to(state, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.9,
            ease: "power3.out",
            onUpdate: updateTransform,
        });
    };

    const pointerEnter = () => {
        heroWrapper.style.willChange = "transform";
    };

    const pointerLeave = () => {
        resetPointer();
        heroWrapper.style.willChange = "auto";
    };

    heroRoot.addEventListener("pointermove", handlePointerMove);
    heroRoot.addEventListener("pointerenter", pointerEnter);
    heroRoot.addEventListener("pointerleave", pointerLeave);

    if (cta) {
        const handleButtonEnter = () => {
            gsap.to(cta, {
                scale: 1.02,
                boxShadow: "0 24px 70px rgba(10, 12, 45, 0.12)",
                duration: 0.32,
                ease: "power3.out",
            });
        };

        const handleButtonLeave = () => {
            gsap.to(cta, {
                scale: 1,
                boxShadow: "0 0 0 rgba(0,0,0,0)",
                duration: 0.28,
                ease: "power3.out",
            });
        };

        cta.addEventListener("pointerenter", handleButtonEnter);
        cta.addEventListener("pointerleave", handleButtonLeave);
        cta.addEventListener("focus", handleButtonEnter);
        cta.addEventListener("blur", handleButtonLeave);

        return () => {
            heroRoot.removeEventListener("pointermove", handlePointerMove);
            heroRoot.removeEventListener("pointerenter", pointerEnter);
            heroRoot.removeEventListener("pointerleave", pointerLeave);
            cta.removeEventListener("pointerenter", handleButtonEnter);
            cta.removeEventListener("pointerleave", handleButtonLeave);
            cta.removeEventListener("focus", handleButtonEnter);
            cta.removeEventListener("blur", handleButtonLeave);
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }

    return () => {
        heroRoot.removeEventListener("pointermove", handlePointerMove);
        heroRoot.removeEventListener("pointerenter", pointerEnter);
        heroRoot.removeEventListener("pointerleave", pointerLeave);
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    };
}
