"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type SectionAnimation = "hero" | "stack" | "panel" | "split" | "list";

type SectionAnimatorProps = {
  children: ReactNode;
  animation: SectionAnimation;
  className?: string;
  scrollStart?: string;
};

function getMotionAllowed() {
  return (
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function SectionAnimator({
  children,
  animation,
  className = "",
  scrollStart = "top 80%",
}: SectionAnimatorProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;

      if (!root || !getMotionAllowed()) {
        return;
      }

      const headingParts = root.querySelectorAll<HTMLElement>("[data-gsap-part]");
      const items = root.querySelectorAll<HTMLElement>("[data-gsap-item]");
      const label = root.querySelector<HTMLElement>("[data-gsap-label]");
      const panel = root.querySelector<HTMLElement>("[data-gsap-panel]");
      const media = root.querySelector<HTMLElement>("[data-gsap-media]");
      const content = root.querySelector<HTMLElement>("[data-gsap-content]");

      const baseTimeline = gsap.timeline(
        animation === "hero"
          ? {
              defaults: { ease: "power3.out", overwrite: "auto" },
            }
          : {
              defaults: { ease: "power3.out", overwrite: "auto" },
              scrollTrigger: {
                trigger: root,
                start: scrollStart,
                once: true,
              },
            }
      );

      switch (animation) {
        case "hero":
          if (items.length) {
            baseTimeline.fromTo(
              items,
              { autoAlpha: 0, y: 24 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
              }
            );
          }
          break;
        case "stack":
          if (headingParts.length) {
            baseTimeline.fromTo(
              headingParts,
              { autoAlpha: 0, y: 16 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.06,
              },
              0
            );
          }

          if (items.length) {
            baseTimeline.fromTo(
              items,
              { autoAlpha: 0, y: 22 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
              },
              0.18
            );
          }
          break;
        case "panel":
          if (panel) {
            baseTimeline.fromTo(
              panel,
              { autoAlpha: 0, y: 24, scale: 0.985 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.85,
              },
              0
            );
          }

          if (headingParts.length) {
            baseTimeline.fromTo(
              headingParts,
              { autoAlpha: 0, y: 14 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.05,
              },
              0.12
            );
          }

          if (items.length) {
            baseTimeline.fromTo(
              items,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
              },
              0.2
            );
          }
          break;
        case "split":
          if (media) {
            baseTimeline.fromTo(
              media,
              { autoAlpha: 0, x: -24, scale: 0.985 },
              {
                autoAlpha: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
              },
              0
            );
          }

          if (content) {
            baseTimeline.fromTo(
              content,
              { autoAlpha: 0, x: 24 },
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.75,
              },
              0.1
            );
          }

          if (headingParts.length) {
            baseTimeline.fromTo(
              headingParts,
              { autoAlpha: 0, y: 14 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.05,
              },
              0.18
            );
          }

          if (items.length) {
            baseTimeline.fromTo(
              items,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
              },
              0.24
            );
          }
          break;
        case "list":
          if (label) {
            baseTimeline.fromTo(
              label,
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
              },
              0
            );
          }

          if (items.length) {
            baseTimeline.fromTo(
              items,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
              },
              0.12
            );
          }
          break;
        default:
          break;
      }
    },
    {
      scope,
      dependencies: [animation, scrollStart],
      revertOnUpdate: true,
    }
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
