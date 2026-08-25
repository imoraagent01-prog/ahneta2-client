"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

/** Wraps the homepage hero heading + intro paragraph and animates them in on mount
 *  (fade + rise, staggered) instead of the static, un-animated text ditto captured. */
export default function HeroText({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const targets = ref.current.querySelectorAll("[data-hero-animate]");
    gsap.fromTo(
      targets,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.18, delay: 0.1 },
    );
  }, []);

  return <div ref={ref}>{children}</div>;
}
