"use client";

import { useEffect, useState } from "react";

/**
 * Preloads a numbered 360°-spin frame sequence: `${basePath}/frame-01.webp`
 * through `frame-<count padded to 2 digits>.webp`. Returns null while
 * loading, and stays null forever if any frame 404s — callers should treat
 * null as "not available yet" and fall back to something else. That means
 * dropping real frames into `public${basePath}` is all it takes to switch
 * this on; nothing else in the code needs to change.
 */
export function useSpinFrames(basePath: string, count: number) {
  const [frames, setFrames] = useState<HTMLImageElement[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const frameSrc = (i: number) =>
      `${basePath}/frame-${String(i + 1).padStart(2, "0")}.webp`;

    // Probe frame 1 first so the common "no sequence yet" case only ever
    // logs one 404, instead of one per frame.
    const probe = new window.Image();
    probe.onerror = () => {
      /* sequence not present — leave frames as null */
    };
    probe.onload = () => {
      if (cancelled) return;
      let loaded = 0;
      let failed = false;
      const images: HTMLImageElement[] = [probe];

      const onDone = () => {
        loaded += 1;
        if (!cancelled && !failed && loaded === count - 1) {
          setFrames(images);
        }
      };

      for (let i = 1; i < count; i++) {
        const img = new window.Image();
        img.onload = onDone;
        img.onerror = () => {
          failed = true;
        };
        img.src = frameSrc(i);
        images.push(img);
      }
    };
    probe.src = frameSrc(0);

    return () => {
      cancelled = true;
    };
  }, [basePath, count]);

  return frames;
}
