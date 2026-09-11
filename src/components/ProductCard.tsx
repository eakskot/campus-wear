"use client";

import { useState } from "react";
import Hoodie from "@/components/garments/Hoodie";
import Joggebukse from "@/components/garments/Joggebukse";
import Button from "@/components/ui/Button";
import { COLORS, SIZES, type Garment } from "@/lib/products";

const GARMENT_COMPONENT = {
  hoodie: Hoodie,
  joggebukse: Joggebukse,
} as const;

export default function ProductCard({ garment }: { garment: Garment }) {
  const [color, setColor] = useState(COLORS[0]);
  const Illustration = GARMENT_COMPONENT[garment.id];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center bg-sand/50 p-10 md:p-14">
        <Illustration color={color.hex} className="w-3/4 max-w-[220px]" />
      </div>

      <div className="flex flex-1 flex-col pt-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl">{garment.name}</h3>
            <p className="text-sm text-ink/55">{garment.tagline}</p>
          </div>
          <p className="whitespace-nowrap font-display text-xl">
            {garment.price},-
          </p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink/65">{garment.description}</p>

        <div className="mt-6">
          <p className="eyebrow text-ink/45">Farge — {color.name}</p>
          <div className="mt-2 flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                onClick={() => setColor(c)}
                className={`h-7 w-7 rounded-full border transition ${
                  color.name === c.name
                    ? "border-ink ring-1 ring-rust ring-offset-2 ring-offset-cream"
                    : "border-ink/20"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="eyebrow text-ink/45">Størrelser</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <span
                key={s}
                className="border border-ink/15 px-2.5 py-1 text-xs text-ink/70"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <Button
          href={`/design?garment=${garment.id}&color=${encodeURIComponent(color.hex)}`}
          variant="primary"
          className="mt-7"
        >
          Design med skolelogo →
        </Button>
      </div>
    </div>
  );
}
