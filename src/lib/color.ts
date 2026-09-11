/** Darken a hex color by a percentage (0-100). Used to derive flat shading
 * for the garment illustrations without needing a second color per swatch. */
export function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const r = Math.max(0, (num >> 16) - amt);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const b = Math.max(0, (num & 0x0000ff) - amt);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}
