import { gsap } from "@/animations/gsap";
import { isFinePointer } from "@/animations/hero.motion";

const BUTTON_SELECTOR = "[data-gsap-button]";

export function initializeButtonInteractions(root: HTMLElement) {
    if (typeof window === "undefined" || !isFinePointer()) {
        return () => undefined;
    }

    const buttons = Array.from(root.querySelectorAll<HTMLElement>(BUTTON_SELECTOR));
    const cleanupTasks: Array<() => void> = [];

    buttons.forEach((button) => {
        const setterX = gsap.quickSetter(button, "x", "px");
        const setterY = gsap.quickSetter(button, "y", "px");

        let requestId = 0;
        const state = { x: 0, y: 0, scale: 1 };

        const updateTransform = () => {
            setterX(state.x);
            setterY(state.y);
            gsap.set(button, { scale: state.scale });
            requestId = 0;
        };

        const handlePointerMove = (event: PointerEvent) => {
            const bounds = button.getBoundingClientRect();
            const offsetX = Math.max(-1, Math.min(1, (event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2)));
            const offsetY = Math.max(-1, Math.min(1, (event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2)));

            state.x = offsetX * 3;
            state.y = offsetY * 2;
            state.scale = 1.015;

            if (!requestId) {
                requestId = requestAnimationFrame(updateTransform);
            }
        };

        const resetButton = () => {
            if (requestId) {
                cancelAnimationFrame(requestId);
                requestId = 0;
            }

            gsap.to(state, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power3.out",
                onUpdate: updateTransform,
            });
            
            const internalText = button.querySelector("span");
            const internalIcon = button.querySelector("svg");
            
            if (internalText) {
                gsap.to(internalText, { x: 0, duration: 0.4, ease: "power3.out" });
            }
            if (internalIcon) {
                gsap.to(internalIcon, { x: 0, duration: 0.4, ease: "power3.out" });
            }
        };

        const pressButton = () => {
            gsap.to(button, {
                scale: 0.96,
                duration: 0.18,
                ease: "power3.out",
            });
        };

        const releaseButton = () => {
            gsap.to(button, {
                scale: 1.015,
                duration: 0.2,
                ease: "power3.out",
            });
        };

        const enterButton = () => {
            gsap.to(button, {
                scale: 1.015,
                duration: 0.22,
                ease: "power3.out",
            });
            
            const internalText = button.querySelector("span");
            const internalIcon = button.querySelector("svg");
            
            if (internalText) {
                gsap.to(internalText, { x: 2, duration: 0.22, ease: "power3.out" });
            }
            if (internalIcon) {
                gsap.to(internalIcon, { x: 4, duration: 0.22, ease: "power3.out" });
            }
        };

        const leaveButton = () => {
            resetButton();
        };

        button.style.transformStyle = "preserve-3d";
        button.style.willChange = "transform";

        button.addEventListener("pointermove", handlePointerMove);
        button.addEventListener("pointerenter", enterButton);
        button.addEventListener("pointerleave", leaveButton);
        button.addEventListener("pointerdown", pressButton);
        button.addEventListener("pointerup", releaseButton);
        button.addEventListener("focus", enterButton);
        button.addEventListener("blur", leaveButton);

        cleanupTasks.push(() => {
            button.removeEventListener("pointermove", handlePointerMove);
            button.removeEventListener("pointerenter", enterButton);
            button.removeEventListener("pointerleave", leaveButton);
            button.removeEventListener("pointerdown", pressButton);
            button.removeEventListener("pointerup", releaseButton);
            button.removeEventListener("focus", enterButton);
            button.removeEventListener("blur", leaveButton);

            if (requestId) {
                cancelAnimationFrame(requestId);
            }
        });
    });

    return () => {
        cleanupTasks.forEach((task) => task());
    };
}
