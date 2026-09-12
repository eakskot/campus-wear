"use client";

import { useEffect, useRef } from "react";
import ZipHoodie from "@/components/garments/ZipHoodie";

/**
 * Full-bleed dark hero: "CAMPUS" / "WEAR" in huge block letters either
 * side of a floating zip hoodie. The section is taller than the viewport
 * (extra scroll runway) and pinned with `sticky` while that runway scrolls
 * past — we read scroll progress across that runway and use it to float
 * the hoodie upward and fade the letters apart, then the rest of the page
 * takes over normally once the runway is exhausted.
 */
export default function HoodieHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hoodieRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLHeadingElement>(null);
  const rightRef = useRef<HTMLHeadingElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const wrap = wrapRef.current;
      if (!wrap) return;

      const rect = wrap.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;

      if (hoodieRef.current) {
        const rotateY = progress * 34; // turns away as it rises
        const rotateZ = Math.sin(progress * Math.PI) * 7; // tilts one way then settles
        hoodieRef.current.style.transform = `perspective(1000px) translateY(${-progress * 280}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${1 - progress * 0.1})`;
        hoodieRef.current.style.opacity = `${Math.max(0, 1 - progress * 1.4)}`;
      }
      if (leftRef.current) {
        leftRef.current.style.transform = `translateX(${-progress * 70}px)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translateX(${progress * 70}px)`;
      }
      if (leftRef.current && rightRef.current) {
        const letterOpacity = `${Math.max(0, 1 - progress * 1.6)}`;
        leftRef.current.style.opacity = letterOpacity;
        rightRef.current.style.opacity = letterOpacity;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = `${Math.max(0, 1 - progress * 5)}`;
      }
      if (tagsRef.current) {
        tagsRef.current.style.opacity = `${Math.max(0, 1 - progress * 3)}`;
      }
      if (bgRef.current) {
        bgRef.current.style.opacity = `${Math.max(0, 1 - progress * 0.7)}`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0D14]">
        <div
          ref={bgRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 38%, rgba(130,150,180,0.16), transparent 70%), radial-gradient(70% 55% at 15% 95%, rgba(90,100,120,0.14), transparent 70%), radial-gradient(70% 55% at 88% 95%, rgba(90,100,120,0.12), transparent 70%)",
          }}
        />

        <div className="relative flex h-full items-center justify-center">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3 md:px-10">
            <h2
              ref={leftRef}
              className="select-none whitespace-nowrap font-body text-[clamp(2.5rem,13vw,7.5rem)] font-black uppercase leading-none tracking-tighter text-cream"
            >
              Campus
            </h2>
            <h2
              ref={rightRef}
              className="select-none whitespace-nowrap font-body text-[clamp(2.5rem,13vw,7.5rem)] font-black uppercase leading-none tracking-tighter text-cream"
            >
              Wear
            </h2>
          </div>

          <div
            ref={hoodieRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[52vw] max-w-[360px] animate-float">
              <ZipHoodie
                color="#1C2740"
                className="w-full drop-shadow-[0_50px_60px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>

          <div
            ref={tagsRef}
            className="pointer-events-none absolute inset-x-6 bottom-10 flex justify-between md:inset-x-10"
          >
            <p className="max-w-[8.5rem] font-body text-[10px] uppercase leading-snug tracking-[0.2em] text-cream/45 md:text-[11px]">
              Klær for mer enn skolen
            </p>
            <p className="max-w-[8.5rem] text-right font-body text-[10px] uppercase leading-snug tracking-[0.2em] text-cream/45 md:text-[11px]">
              Samme skole. Ny stil.
            </p>
          </div>

          <div
            ref={hintRef}
            className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-cream/45">
              Scroll
            </span>
            <span className="h-8 w-px bg-cream/25" />
          </div>
        </div>
      </div>
    </section>
  );
}
