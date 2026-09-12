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
 * Full-bleed hero, same treatment at every screen size: the hoodie fills
 * the whole screen top to bottom (no card/box with visible background
 * around it), and "Campus Wear" is stamped directly on the garment's
 * chest instead of floating beside or above it. On narrow (portrait)
 * screens the photo is cropped at the sides to cover edge-to-edge; on
 * wide (landscape) screens it's sized to the full height instead, so it
 * never has to crop the top/bottom of the garment off.
 *
 * The nav is transparent while it overlaps this hero (see Nav.tsx) — this
 * component pulls itself up by the nav's own height (`-mt`) so the hero
 * actually starts at the very top of the screen instead of leaving the
 * page background exposed in a strip above it, which is what a plain
 * `sticky` nav would otherwise do (it still occupies its row in normal
 * flow even while "transparent").
 *
 * The section is taller than the viewport (extra scroll runway) and
 * pinned with `sticky` while that runway scrolls past — we read scroll
 * progress across it and use it to float the hoodie upward and fade/part
 * the letters, then the rest of the page takes over once the runway is
 * exhausted.
 */
export default function HoodieHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hoodieRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLHeadingElement>(null);
  const bottomRef = useRef<HTMLHeadingElement>(null);
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
        hoodieRef.current.style.transform = `translateY(${-progress * 220}px) perspective(1000px) ${turn}scale(${1 - progress * 0.1})`;
        hoodieRef.current.style.opacity = `${Math.max(0, 1 - progress * 1.4)}`;
      }
      if (usingRealSpin) {
        drawSpinFrame(progress);
      }

      const letterOpacity = `${Math.max(0, 1 - progress * 1.6)}`;

      // Words part vertically — "Campus" drifts up, "Wear" drifts down.
      if (topRef.current) {
        topRef.current.style.transform = `translateY(${-progress * 30}px)`;
        topRef.current.style.opacity = letterOpacity;
      }
      if (bottomRef.current) {
        bottomRef.current.style.transform = `translateY(${progress * 18}px)`;
        bottomRef.current.style.opacity = letterOpacity;
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
    <section ref={wrapRef} className="relative -mt-[76px] h-[180dvh] md:-mt-24">
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[#C0B7AB]">
        {/* Matches the product photo's own vertical vignette (sampled
            from its edges: darker near the top/bottom, lighter in the
            middle band) so the canvas rectangle blends into the page
            instead of reading as a pasted-in photo card. */}
        <div
          ref={bgRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #C3BAAF 0%, #CCC5B9 42%, #CCC5B9 58%, #BFB6AA 100%)",
          }}
        />

        {/* Hoodie: rendered once. On narrow/portrait screens it's
            full-bleed — cropped with object-cover to fill the entire
            screen edge to edge. On wide/landscape screens (where a
            portrait photo can't cover both dimensions without an absurd
            zoom) it's sized to the full height instead and centered, so
            the whole garment always stays in frame. Either way there's no
            inset card with visible background padding around it. */}
        <div
          ref={hoodieRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {frames ? (
            <canvas
              ref={canvasRef}
              style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
              className="absolute inset-0 h-full w-full object-cover md:static md:inset-auto md:h-full md:w-auto md:object-contain"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center md:static md:inset-auto">
              <ZipHoodie
                color="#1C2740"
                className="h-[90vh] w-auto animate-float md:h-[85vh]"
              />
            </div>
          )}
        </div>

        {/* "Campus Wear" stamped directly on the garment's chest, not
            floating beside or above it in empty space. Positioned by
            percentage so it lands on the chest regardless of screen size:
            on portrait screens object-cover crops the sides but keeps the
            full vertical extent of the photo, and on landscape screens
            the photo is simply shown at full height — either way a %
            position always matches the same spot on the actual garment. */}
        <div className="pointer-events-none absolute inset-x-0 top-[60%] flex flex-col items-center leading-[0.85]">
          <h2
            ref={topRef}
            className="select-none font-body text-[clamp(2rem,9vh,5.5rem)] font-black uppercase tracking-tighter text-cream"
          >
            Campus
          </h2>
          <h2
            ref={bottomRef}
            className="select-none font-body text-[clamp(2rem,9vh,5.5rem)] font-black uppercase tracking-tighter text-cream"
          >
            Wear
          </h2>
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
    </section>
  );
}
