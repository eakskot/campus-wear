import { shade } from "@/lib/color";

export default function Joggebukse({
  color = "#17181B",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  const dark = shade(color, 12);
  const rib = shade(color, 24);

  return (
    <svg
      viewBox="0 0 360 480"
      className={className}
      role="img"
      aria-label="Joggebukse"
    >
      {/* waistband */}
      <rect x="112" y="34" width="136" height="30" rx="8" fill={rib} stroke="#232F42" strokeWidth="1.5" />
      {/* drawstring */}
      <path
        d="M164,64 C164,74 150,74 150,86 M196,64 C196,74 210,74 210,86"
        stroke="#232F42"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* body / yoke, wide and straight through the leg (not tapered) */}
      <path
        d="M112,60 L248,60 C258,60 265,68 266,80 L272,190 C276,220 282,236 292,252 L308,420 C310,438 298,450 280,450 L214,450 C200,450 190,440 189,426 L182,220 C182,214 178,214 178,220 L171,426 C170,440 160,450 146,450 L80,450 C62,450 50,438 52,420 L68,252 C78,236 84,220 88,190 L94,80 C95,68 102,60 112,60 Z"
        fill={color}
        stroke="#232F42"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* front pockets */}
      <path
        d="M96,96 C82,104 72,118 66,138"
        stroke="#232F42"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M264,96 C278,104 288,118 294,138"
        stroke="#232F42"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* inseam */}
      <path
        d="M180,148 L180,214"
        stroke="#232F42"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* straight open hems, no ankle taper */}
      <rect x="56" y="432" width="94" height="18" rx="4" fill={dark} stroke="#232F42" strokeWidth="1.5" />
      <rect x="210" y="432" width="94" height="18" rx="4" fill={dark} stroke="#232F42" strokeWidth="1.5" />
    </svg>
  );
}
