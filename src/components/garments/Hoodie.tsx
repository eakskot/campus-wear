import { shade } from "@/lib/color";

export default function Hoodie({
  color = "#17181B",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  const dark = shade(color, 14);
  const rib = shade(color, 24);

  return (
    <svg
      viewBox="0 0 400 480"
      className={className}
      role="img"
      aria-label="Hettegenser"
    >
      {/* left sleeve */}
      <path
        d="M118,100 C90,104 66,116 50,138 C34,160 22,196 16,252 C15,260 20,266 28,266 L66,262 C73,261 78,256 79,249 C83,214 92,186 106,166 L124,132 Z"
        fill={dark}
        stroke="#101012"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* right sleeve */}
      <path
        d="M282,100 C310,104 334,116 350,138 C366,160 378,196 384,252 C385,260 380,266 372,266 L334,262 C327,261 322,256 321,249 C317,214 308,186 294,166 L276,132 Z"
        fill={dark}
        stroke="#101012"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* hood, sitting behind the collar */}
      <path
        d="M140,86 C140,54 166,32 200,32 C234,32 260,54 260,86 L252,108 C240,90 222,80 200,80 C178,80 160,90 148,108 Z"
        fill={dark}
        stroke="#101012"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* body */}
      <path
        d="M154,92 C154,78 170,68 200,68 C230,68 246,78 246,92 L268,112 C280,122 288,138 291,158 L318,404 C320,424 306,438 286,438 L114,438 C94,438 80,424 82,404 L109,158 C112,138 120,122 132,112 Z"
        fill={color}
        stroke="#101012"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* neckline */}
      <path
        d="M168,90 C168,104 182,114 200,114 C218,114 232,104 232,90"
        fill="none"
        stroke="#101012"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* drawstrings */}
      <path
        d="M186,116 L180,168"
        stroke="#101012"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M214,116 L220,168"
        stroke="#101012"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="179" cy="174" r="4" fill={rib} stroke="#101012" strokeWidth="2" />
      <circle cx="221" cy="174" r="4" fill={rib} stroke="#101012" strokeWidth="2" />
      {/* kangaroo pocket */}
      <path
        d="M132,266 C132,254 142,246 154,246 L246,246 C258,246 268,254 268,266 L272,338 C273,352 262,364 248,364 L152,364 C138,364 127,352 128,338 Z"
        fill="none"
        stroke="#101012"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M156,246 L164,266 M244,246 L236,266"
        stroke="#101012"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* hem + cuff ribbing */}
      <rect x="90" y="418" width="220" height="20" rx="4" fill={rib} stroke="#101012" strokeWidth="3" />
      <rect x="20" y="248" width="56" height="20" rx="4" fill={rib} stroke="#101012" strokeWidth="3" transform="rotate(-8 48 258)" />
      <rect x="324" y="248" width="56" height="20" rx="4" fill={rib} stroke="#101012" strokeWidth="3" transform="rotate(8 352 258)" />
    </svg>
  );
}
