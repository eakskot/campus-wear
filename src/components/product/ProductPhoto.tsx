import type { GarmentType } from "@/lib/products";

export type ViewAngle = "front" | "back" | "side";
export const VIEWS: { key: ViewAngle; label: string }[] = [
  { key: "front", label: "Front" },
  { key: "back", label: "Bak" },
  { key: "side", label: "Side" },
];

// Studio cutouts (transparent WebP) per plagg and vinkel. The hoodie has all
// three because they're real frames pulled from the same 360°-spin video
// used on the forside hero — genuine photos of the physical garment, not
// generated. The joggebukse only has a front photo so far; back/side are
// left out on purpose rather than faked, and the UI shows a plain
// "kommer snart" state for them until real photos exist.
const STUDIO_PHOTOS: Record<GarmentType, Partial<Record<ViewAngle, string>>> = {
  hoodie: {
    front: "/products/hoodie-front.webp",
    back: "/products/hoodie-back.webp",
    side: "/products/hoodie-side.webp",
  },
  joggebukse: {
    front: "/products/joggebukse-front.webp",
  },
};

// Raw, unprocessed photos (real concrete-floor background, straight off the
// camera roll) — used for the forside sortiment-bokser, per instruks om at
// hovedsiden skal vise dem "med faktisk betong bakgrunnen".
const LIFESTYLE_PHOTOS: Record<GarmentType, string> = {
  hoodie: "/products/hoodie-lifestyle.webp",
  joggebukse: "/products/joggebukse-lifestyle.webp",
};

// The garment's actual photographed color — selecting this swatch shows the
// real, untouched photo. Any other swatch is a CSS duotone approximation
// (see below) until we have real photos in every color. Only applies to
// the "studio" variant.
export const NATIVE_COLOR_HEX: Record<GarmentType, string> = {
  hoodie: "#17181B", // Sort
  joggebukse: "#232C3D", // Marine
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

  const isNative =
    !colorHex || colorHex.toLowerCase() === NATIVE_COLOR_HEX[id].toLowerCase();

  if (isNative) {
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
  // replacing it. Unlike blending a color *onto* the photo, this direction
  // holds up across the whole lightness range — including going from our
  // one dark real sample to a light swatch like sand — because the flat
  // fill carries the target lightness and the photo only contributes
  // texture, rather than the photo's own (very dark) luminance capping how
  // light the result can get.
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
