export const heroMotion = {
  ease: {
    reveal: "expo.out",
    settle: "power4.out",
    soft: "power3.out",
    sweep: "power2.inOut",
  },
  intro: {
    announcement: 0,
    title: 0.28,
    copy: 0.72,
    cta: 1.05,
    atmosphere: 1.15,
    trusted: 1.35,
  },
  duration: {
    announcement: 0.9,
    word: 0.95,
    copy: 0.8,
    cta: 0.75,
    atmosphere: 1.6,
    trusted: 1,
  },
  stagger: {
    word: 0.05,
    copy: 0.1,
  },
  pointer: {
    desktopMin: 1024,
    glow: 18,
    grid: 10,
    orbA: 28,
    orbB: 16,
    trusted: 6,
  },
  scroll: {
    headingOpacity: 0.72,
    headingY: -28,
    glowY: -48,
    gridY: -24,
    orbAY: -64,
    orbBY: -36,
    trustedY: 18,
  },
} as const;

export function isFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    window.innerWidth >= heroMotion.pointer.desktopMin
  );
}
