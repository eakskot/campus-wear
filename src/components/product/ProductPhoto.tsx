import type { GarmentType } from "@/lib/products";

export const PHOTOS: Record<GarmentType, string> = {
  hoodie: "/products/hoodie.webp",
  joggebukse: "/products/joggebukse.webp",
};

// The garment's actual photographed color — selecting this swatch shows the
// real, untouched photo. We only own one physical sample per plagg right
// now, so any *other* swatch is approximated with a CSS duotone recolor
// (grayscale the photo, then paint the target hue back in only where the
// photo itself is opaque, blended in "color" mode) rather than a real photo
// in that color. Swap this out garment-by-garment once real photos exist
// for every color.
export const NATIVE_COLOR_HEX: Record<GarmentType, string> = {
  hoodie: "#17181B", // Sort
  joggebukse: "#232C3D", // Marine
};

export default function ProductPhoto({
  id,
  colorHex,
  className = "",
  imgClassName = "",
}: {
  id: GarmentType;
  /** Omit to always show the real, untouched photo. */
  colorHex?: string;
  className?: string;
  imgClassName?: string;
}) {
  const src = PHOTOS[id];
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
