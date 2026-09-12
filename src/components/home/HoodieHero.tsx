"use client";

import { useEffect, useRef } from "react";
import ZipHoodie from "@/components/garments/ZipHoodie";
import { useSpinFrames } from "@/lib/useSpinFrames";

// Drop a 24-frame 360° turntable sequence into public/hoodie-spin/ named
// frame-01.webp … frame-24.webp (15° apart, fixed camera, consistent
// lighting/crop) and this hero switches from the CSS-turn fallback to a
// real scroll-scrubbed spin automatically — no code changes needed.
const SPIN_FRAME_COUNT = 24;
const SPIN_BASE_PATH = "/hoodie-spin";

// Native size of the extracted frames (portrait product shot) — used to
// size the canvas buffer and keep its aspect ratio on screen.
const FRAME_W = 560;
const FRAME_H = 996;

/**
 * Full-bleed hero: "CAMPUS" / "WEAR" in huge block letters either side of
 * a floating zip hoodie, on a soft warm beige backdrop matching the
 * product shot. The section is taller than the viewport (extra scroll
 * runway) and pinned with `sticky` while that runway scrolls past — we
 * read scroll progress across that runway and use it to float the hoodie
 * upward and fade the letters apart, then the rest of the page takes over
 * normally once the runway is exhausted.
 */
export default function HoodieHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hoodieRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLHeadingElement>(null);
  const rightRef = useRef<HTMLHeadingElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const frames = useSpinFrames(SPIN_BASE_PATH, SPIN_FRAME_COUNT);
  const framesRef = useRef<HTMLImageElement[] | null>(null);
  framesRef.current = frames;

  const drawSpinFrame = (progress: number) => {
    const canvas = canvasRef.current;
    const list = framesRef.current;
    if (!canvas || !list) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const idx = Math.min(list.length - 1, Math.floor(progress * list.length));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(list[idx], 0, 0, canvas.width, canvas.height);
  };

  // Set up canvas resolution and paint the first frame as soon as the
  // sequence has loaded, so there's something on screen before the user
  // has scrolled at all (and so reduced-motion visitors get a static shot
  // instead of nothing).
  useEffect(() => {
    if (!frames || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = FRAME_W * dpr;
    canvas.height = FRAME_H * dpr;
    drawSpinFrame(0);
  }, [frames]);

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

      const usingRealSpin = !!framesRef.current;

      if (hoodieRef.current) {
        // Real frames already carry the rotation, so just let them float
        // up. The CSS fallback fakes the turn with a 3D-ish transform.
        const turn = usingRealSpin
          ? ""
          : `rotateY(${progress * 34}deg) rotateZ(${Math.sin(progress * Math.PI) * 7}deg) `;
        hoodieRef.current.style.transform = `perspective(1000px) translateY(${-progress * 280}px) ${turn}scale(${1 - progress * 0.1})`;
        hoodieRef.current.style.opacity = `${Math.max(0, 1 - progress * 1.4)}`;
      }
      if (usingRealSpin) {
        drawSpinFrame(progress);
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
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#C7BEB0]">
        <div
          ref={bgRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(65% 55% at 50% 42%, rgba(224,217,202,0.9), transparent 70%), radial-gradient(90% 70% at 50% 100%, rgba(178,169,153,0.5), transparent 70%)",
          }}
        />

        <div className="relative flex h-full items-center justify-center">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3 md:px-10">
            <h2
              ref={leftRef}
              className="select-none whitespace-nowrap font-body text-[clamp(2.5rem,13vw,7.5rem)] font-black uppercase leading-none tracking-tighter text-ink"
            >
              Campus
            </h2>
            <h2
              ref={rightRef}
              className="select-none whitespace-nowrap font-body text-[clamp(2.5rem,13vw,7.5rem)] font-black uppercase leading-none tracking-tighter text-ink"
            >
              Wear
            </h2>
          </div>

          <div
            ref={hoodieRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            {frames ? (
              <canvas
                ref={canvasRef}
                style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
                className="h-[62vh] max-h-[640px] w-auto drop-shadow-[0_30px_40px_rgba(60,50,35,0.25)]"
              />
            ) : (
              <div className="w-[52vw] max-w-[360px] animate-float">
                <ZipHoodie
                  color="#1C2740"
                  className="w-full drop-shadow-[0_30px_40px_rgba(60,50,35,0.25)]"
                />
              </div>
            )}
          </div>

          <div
            ref={tagsRef}
            className="pointer-events-none absolute inset-x-6 bottom-10 flex justify-between md:inset-x-10"
          >
            <p className="max-w-[8.5rem] font-body text-[10px] uppercase leading-snug tracking-[0.2em] text-ink/50 md:text-[11px]">
              Klær for mer enn skolen
            </p>
            <p className="max-w-[8.5rem] text-right font-body text-[10px] uppercase leading-snug tracking-[0.2em] text-ink/50 md:text-[11px]">
              Samme skole. Ny stil.
            </p>
          </div>

          <div
            ref={hintRef}
            className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-ink/50">
              Scroll
            </span>
            <span className="h-8 w-px bg-ink/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
