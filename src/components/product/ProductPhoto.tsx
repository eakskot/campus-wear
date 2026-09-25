import type { GarmentType } from "@/lib/products";

export type ViewAngle = "front" | "back" | "side";
export const VIEWS: { key: ViewAngle; label: string }[] = [
  { key: "front", label: "Front" },
  { key: "back", label: "Bak" },
  { key: "side", label: "Side" },
];

// Studio cutouts (transparent WebP) per plagg and vinkel — neutral
// light-gray product renders, meant to be recolored (see below) rather
// than shown as-is. The hoodie has all three angles; joggebuksen has
// front and back but no side yet. Missing angles are left out on purpose
// rather than faked — the UI shows a plain "kommer snart" state for them.
const STUDIO_PHOTOS: Record<GarmentType, Partial<Record<ViewAngle, string>>> = {
  hoodie: {
    front: "/products/hoodie-front.webp",
    back: "/products/hoodie-back.webp",
    side: "/products/hoodie-side.webp",
  },
  joggebukse: {
    front: "/products/joggebukse-front.webp",
    back: "/products/joggebukse-back.webp",
  },
};

// Raw, unprocessed photos (real concrete-floor background, straight off the
// camera roll) — used for the forside sortiment-bokser, per instruks om at
// hovedsiden skal vise dem "med faktisk betong bakgrunnen".
const LIFESTYLE_PHOTOS: Record<GarmentType, string> = {
  hoodie: "/products/hoodie-lifestyle.webp",
  joggebukse: "/products/joggebukse-lifestyle.webp",
};

export function hasStudioPhoto(id: GarmentType, view: ViewAngle): boolean {
  return !!STUDIO_PHOTOS[id][view];
}

export default function ProductPhoto({
  id,
  colorHex,
  view = "front",
  variant = "studio",
  className = "",
  imgClassName = "",
}: {
  id: GarmentType;
  /** Omit to always show the real, untouched photo. Ignored for "lifestyle". */
  colorHex?: string;
  /** Which photographed angle to show. Studio variant only. */
  view?: ViewAngle;
  /** "studio": transparent cutout, recolorable, front/back/side.
   *  "lifestyle": the raw photo as shot, real background, front only. */
  variant?: "studio" | "lifestyle";
  className?: string;
  imgClassName?: string;
}) {
  if (variant === "lifestyle") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={LIFESTYLE_PHOTOS[id]}
          alt=""
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </div>
    );
  }

  const src = STUDIO_PHOTOS[id][view];
  if (!src) {
    const label = VIEWS.find((v) => v.key === view)?.label ?? view;
    return (
      <div
        className={`flex items-center justify-center border border-dashed border-ink/20 ${className}`}
      >
        <p className="px-6 text-center text-xs text-ink/40">
          {label}-bilde kommer snart
        </p>
      </div>
    );
  }

  if (!colorHex) {
    return (
      <div className={`relative ${className}`}>
        <img
          src={src}
          alt=""
          className={`h-full w-full object-contain ${imgClassName}`}
        />
      </div>
    );
  }

  // Recolor: a flat fill in the target hue, masked to the photo's own
  // silhouette, with the (grayscaled) photo laid on top in "overlay" blend
  // mode so its fabric shading modulates the flat color instead of
  // replacing it. The source renders are a neutral light gray meant to be
  // tinted this way — none of our palette colors is "the real photo", so
  // every swatch (including the lightest and the darkest) goes through
  // the same recolor, which keeps the result consistent across the whole
  // range instead of singling one color out as untouched.
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundColor: colorHex,
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
      <img
        src={src}
        alt=""
        className={`relative h-full w-full object-contain ${imgClassName}`}
        style={{ filter: "grayscale(1)", mixBlendMode: "overlay" }}
      />
    </div>
  );
}
