/** Darken (positive percent) or lighten (negative percent) a hex color,
 * roughly -100 to 100. Used to derive flat shading for the garment
 * illustrations without needing a second color per swatch. */
export function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const clamp = (channel: number) => Math.min(255, Math.max(0, channel - amt));
  const r = clamp(num >> 16);
  const g = clamp((num >> 8) & 0x00ff);
  const b = clamp(num & 0x0000ff);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}
