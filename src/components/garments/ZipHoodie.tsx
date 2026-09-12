import { shade } from "@/lib/color";

/**
 * Zip-up hoodie variant used for the homepage hero — same silhouette
 * language as Hoodie.tsx, but with a center zip instead of a kangaroo
 * pocket, and a soft gradient fill so it reads well floating on a dark
 * background instead of sitting flat on a product-card.
 */
export default function ZipHoodie({
  color = "#232C3D",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  const dark = shade(color, 16);
  const light = shade(color, -14);
  const rib = shade(color, 26);
  const gradId = "zip-hoodie-fill";

  return (
    <svg
      viewBox="0 0 400 480"
      className={className}
      role="img"
      aria-label="Marineblå zip-hettegenser"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={light} />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <filter id="zip-hoodie-shadow" x="-30%" y="-10%" width="160%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#zip-hoodie-shadow)">
        {/* left sleeve */}
        <path
          d="M118,100 C90,104 66,116 50,138 C34,160 22,196 16,252 C15,260 20,266 28,266 L66,262 C73,261 78,256 79,249 C83,214 92,186 106,166 L124,132 Z"
          fill={dark}
        />
        {/* right sleeve */}
        <path
          d="M282,100 C310,104 334,116 350,138 C366,160 378,196 384,252 C385,260 380,266 372,266 L334,262 C327,261 322,256 321,249 C317,214 308,186 294,166 L276,132 Z"
          fill={dark}
        />
        {/* hood, sitting behind the collar */}
        <path
          d="M140,86 C140,54 166,32 200,32 C234,32 260,54 260,86 L252,108 C240,90 222,80 200,80 C178,80 160,90 148,108 Z"
          fill={dark}
        />
        {/* body */}
        <path
          d="M154,92 C154,78 170,68 200,68 C230,68 246,78 246,92 L268,112 C280,122 288,138 291,158 L318,404 C320,424 306,438 286,438 L114,438 C94,438 80,424 82,404 L109,158 C112,138 120,122 132,112 Z"
          fill={`url(#${gradId})`}
        />
        {/* neckline */}
        <path
          d="M172,88 C172,100 184,108 200,108 C216,108 228,100 228,88"
          fill="none"
          stroke={dark}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* center zipper */}
        <path
          d="M197,110 L197,432 M203,110 L203,432"
          stroke={dark}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {[...Array(22)].map((_, i) => (
          <line
            key={i}
            x1="196"
            x2="204"
            y1={122 + i * 14}
            y2={122 + i * 14}
            stroke={dark}
            strokeWidth="1.5"
          />
        ))}
        <rect x="193" y="118" width="14" height="18" rx="3" fill={rib} stroke={dark} strokeWidth="1.5" />

        {/* hem + cuff ribbing */}
        <rect x="90" y="418" width="220" height="20" rx="4" fill={rib} />
        <rect x="20" y="248" width="56" height="20" rx="4" fill={rib} transform="rotate(-8 48 258)" />
        <rect x="324" y="248" width="56" height="20" rx="4" fill={rib} transform="rotate(8 352 258)" />
      </g>
    </svg>
  );
}
