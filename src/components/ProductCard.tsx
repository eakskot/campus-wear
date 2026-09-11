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
    <div className="flex flex-col border-2 border-ink shadow-hard">
      <div className="flex items-center justify-center border-b-2 border-ink bg-paper p-10">
        <Illustration color={color.hex} className="w-3/4 max-w-[240px]" />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold uppercase">
              {garment.name}
            </h3>
            <p className="text-sm text-ink/60">{garment.tagline}</p>
          </div>
          <p className="whitespace-nowrap font-display text-xl font-semibold">
            {garment.price},-
          </p>
        </div>

        <p className="mt-4 text-sm text-ink/70">{garment.description}</p>

        <div className="mt-6">
          <p className="eyebrow text-ink/50">Farge — {color.name}</p>
          <div className="mt-2 flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                onClick={() => setColor(c)}
                className={`h-8 w-8 rounded-full border-2 transition ${
                  color.name === c.name
                    ? "border-ink ring-2 ring-lime ring-offset-2"
                    : "border-ink/30"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="eyebrow text-ink/50">Størrelser</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <span
                key={s}
                className="border border-ink/20 px-2.5 py-1 text-xs font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <Button
          href={`/design?garment=${garment.id}&color=${encodeURIComponent(color.hex)}`}
          variant="primary"
          className="mt-6"
        >
          Design med skolelogo →
        </Button>
      </div>
    </div>
  );
}
