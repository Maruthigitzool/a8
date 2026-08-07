import { gsap } from "@/animations/gsap";
import { signatureSoft } from "@/animations/easing";

const HEADING_PART = "[data-gsap-part]";
const SECTION_ITEM = "[data-gsap-item]";
const SECTION_LABEL = "[data-gsap-label]";
const SECTION_PANEL = "[data-gsap-panel]";
const SECTION_MEDIA = "[data-gsap-media]";
const SECTION_CONTENT = "[data-gsap-content]";
const SECTION_BUTTON = "a[data-gsap-button], button[data-gsap-button]";
const DSM_CARD = "[data-gsap-dsm-card]";
const DSM_LINK = "[data-gsap-dsm-link]";

export type SectionAnimation = "hero" | "stack" | "panel" | "split" | "list" | "dsm";

export type SectionAnimationConfig = {
    start?: string;
};

export function createSectionTimeline(
    root: HTMLElement,
    animation: SectionAnimation,
    config: SectionAnimationConfig = { start: "top 80%" }
) {
    const headingParts = root.querySelectorAll<HTMLElement>(HEADING_PART);
    const items = root.querySelectorAll<HTMLElement>(SECTION_ITEM);
    const label = root.querySelector<HTMLElement>(SECTION_LABEL);
    const panel = root.querySelector<HTMLElement>(SECTION_PANEL);
    const media = root.querySelector<HTMLElement>(SECTION_MEDIA);
    const content = root.querySelector<HTMLElement>(SECTION_CONTENT);
    const cards = root.querySelectorAll<HTMLElement>(DSM_CARD);
    const cardLinks = root.querySelectorAll<HTMLElement>(DSM_LINK);

    const scrollTrigger = animation === "hero"
        ? undefined
        : {
            trigger: root,
            start: config.start,
            once: true,
        };

    const timeline = gsap.timeline({
        defaults: {
            ease: "power2.out", // softer default easing
            overwrite: "auto",
        },
        scrollTrigger,
    });

    switch (animation) {
        case "stack": {
            if (headingParts.length) {
                timeline.fromTo(
                    headingParts,
                    {
                        y: 30,
                        autoAlpha: 0,
                        clipPath: "inset(100% 0 0 0)",
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        clipPath: "inset(0 0 0 0)",
                        duration: 0.85,
                        stagger: 0.08,
                    },
                    0
                );
            }

            if (items.length) {
                timeline.fromTo(
                    items,
                    {
                        y: 40,
                        autoAlpha: 0,
                        scale: 0.96, // updated scale per guidelines
                        clipPath: "inset(0 0 100% 0)",
                        filter: "blur(8px)",
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        scale: 1,
                        clipPath: "inset(0 0 0 0)",
                        filter: "blur(0px)",
                        duration: 0.85,
                        stagger: 0.08,
                        ease: "power3.out",
                    },
                    0.12
                );
            }
            break;
        }
        case "panel": { // Blue Platform CTA
            if (panel) {
                timeline.fromTo(
                    panel,
                    {
                        autoAlpha: 0,
                        y: 22,
                        scale: 0.94, // stronger entrance scale
                        clipPath: "inset(0 0 100% 0)",
                    },
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        clipPath: "inset(0 0 0% 0)",
                        duration: 0.9,
                        ease: "power3.out"
                    },
                    0
                );
            }

            if (headingParts.length) {
                timeline.fromTo(
                    headingParts,
                    { y: 30, opacity: 0 }, // Removed rotateX for cleaner motion
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.8,
                        stagger: 0.08,
                    },
                    0.15
                );
            }

            if (items.length) {
                timeline.fromTo(
                    items,
                    { y: 20, autoAlpha: 0, filter: "blur(10px)", scale: 0.96 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        filter: "blur(0px)",
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.08,
                    },
                    0.3
                );
            }
            break;
        }
        case "split": { // Video / CEO section
            if (media) {
                timeline.fromTo(
                    media,
                    {
                        autoAlpha: 0,
                        x: -20,
                        scale: 0.96, // scaled per guidelines
                        clipPath: "inset(0 100% 0 0)",
                    },
                    {
                        autoAlpha: 1,
                        x: 0,
                        scale: 1,
                        clipPath: "inset(0 0% 0 0)",
                        duration: 0.9,
                        ease: "power3.out"
                    },
                    0
                );
            }

            if (content) {
                timeline.fromTo(
                    content,
                    {
                        autoAlpha: 0,
                        x: 20,
                    },
                    {
                        autoAlpha: 1,
                        x: 0,
                        duration: 0.85,
                    },
                    0.2 // delay to balance Video -> Text
                );
            }

            if (headingParts.length) {
                timeline.fromTo(
                    headingParts,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.8,
                        stagger: 0.08,
                    },
                    0.25
                );
            }

            if (items.length) {
                timeline.fromTo(
                    items,
                    { y: 20, autoAlpha: 0, filter: "blur(8px)" },
                    {
                        y: 0,
                        autoAlpha: 1,
                        filter: "blur(0px)",
                        duration: 0.8,
                        stagger: 0.08,
                    },
                    0.35
                );
            }
            break;
        }
        case "dsm": {
            if (headingParts.length) {
                timeline.fromTo(
                    headingParts,
                    {
                        y: 30,
                        autoAlpha: 0,
                        clipPath: "inset(100% 0 0 0)",
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        clipPath: "inset(0 0 0 0)",
                        duration: 0.85,
                        stagger: 0.08,
                    },
                    0
                );
            }

            if (cards.length) {
                // Alternating rhythm setup by applying custom attributes or relying on index
                cards.forEach((card, index) => {
                    const row = Math.floor(index / 3); // approximate 3-col grid
                    const direction = row % 2 === 0 ? -15 : 15; // left->right vs right->left
                    
                    timeline.fromTo(
                        card,
                        {
                            y: 30,
                            x: direction,
                            autoAlpha: 0,
                            scale: 0.94,
                            clipPath: "inset(0 0 100% 0)",
                            filter: "blur(12px)",
                        },
                        {
                            y: 0,
                            x: 0,
                            autoAlpha: 1,
                            scale: 1,
                            clipPath: "inset(0 0 0 0)",
                            filter: "blur(0px)",
                            duration: 0.9,
                            ease: "power3.out",
                        },
                        0.2 + (index * 0.06) // manual stagger to accommodate per-card direction
                    );
                });
            }

            if (cardLinks.length) {
                timeline.fromTo(
                    cardLinks,
                    {
                        y: 18,
                        autoAlpha: 0,
                        filter: "blur(6px)",
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        filter: "blur(0px)",
                        duration: 0.8,
                        stagger: 0.06,
                    },
                    0.5
                );
            }
            break;
        }
        case "list": { // Marketplace pills
            if (label) {
                timeline.fromTo(
                    label,
                    { y: 16, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.65 },
                    0
                );
            }

            if (items.length) {
                timeline.fromTo(
                    items,
                    { y: 20, scale: 0.9, autoAlpha: 0, filter: "blur(8px)" }, // updated to upward and scale
                    {
                        y: 0,
                        scale: 1,
                        autoAlpha: 1,
                        filter: "blur(0px)",
                        duration: 0.8,
                        stagger: 0.08,
                        ease: "back.out(1.2)" // subtle bounce for pills
                    },
                    0.15
                );
            }
            break;
        }
        default:
            break;
    }

    return timeline;
}
