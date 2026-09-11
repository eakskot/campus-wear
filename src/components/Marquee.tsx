const DEFAULT_ITEMS = [
  "NULL UTSLIPP",
  "BILLIGERE ENN RUSSEDRESS",
  "DESIGNET FOR VGS",
  "KLIMAKOMPENSERT FRAKT",
  "DIN SKOLE. DIN STIL.",
];

export default function Marquee({
  items = DEFAULT_ITEMS,
  className = "",
}: {
  items?: string[];
  className?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div
      className={`overflow-hidden border-y-2 border-ink bg-lime py-3 ${className}`}
    >
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-sm font-semibold uppercase tracking-wide text-ink"
          >
            {item}
            <span aria-hidden className="text-ink/40">
              ●
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
