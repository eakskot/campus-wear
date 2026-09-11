"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Hoodie from "@/components/garments/Hoodie";
import Joggebukse from "@/components/garments/Joggebukse";
import Button from "@/components/ui/Button";
import { COLORS, SIZES, GARMENTS, type GarmentType } from "@/lib/products";

type LogoMode = "upload" | "initials";

type Position = { x: number; y: number }; // percent, 0-100

const PRESETS: { label: string; pos: Position; scale: number }[] = [
  { label: "Venstre bryst", pos: { x: 34, y: 34 }, scale: 0.55 },
  { label: "Midt bryst", pos: { x: 50, y: 38 }, scale: 0.8 },
  { label: "Stort print", pos: { x: 50, y: 52 }, scale: 1.3 },
];

const GARMENT_COMPONENT = {
  hoodie: Hoodie,
  joggebukse: Joggebukse,
} as const;

export default function Configurator() {
  const params = useSearchParams();
  const initialGarment = (params.get("garment") as GarmentType) || "hoodie";
  const initialColor = params.get("color");

  const [garmentType, setGarmentType] = useState<GarmentType>(
    initialGarment === "joggebukse" ? "joggebukse" : "hoodie"
  );
  const [color, setColor] = useState(
    COLORS.find((c) => c.hex.toLowerCase() === initialColor?.toLowerCase()) ??
      COLORS[0]
  );

  const [logoMode, setLogoMode] = useState<LogoMode>("upload");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string>("");
  const [initials, setInitials] = useState("SKOLE");

  const [pos, setPos] = useState<Position>(PRESETS[1].pos);
  const [scale, setScale] = useState(PRESETS[1].scale);

  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [size, setSize] = useState<string>(SIZES[2]);
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const stageRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    return () => {
      if (logoUrl) URL.revokeObjectURL(logoUrl);
    };
  }, [logoUrl]);

  const onFile = (file: File | null) => {
    if (!file) return;
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    setLogoUrl(URL.createObjectURL(file));
    setLogoName(file.name);
  };

  const clampAndSet = useCallback((clientX: number, clientY: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setPos({
      x: Math.min(88, Math.max(12, x)),
      y: Math.min(90, Math.max(14, y)),
    });
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    clampAndSet(e.clientX, e.clientY);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    clampAndSet(e.clientX, e.clientY);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const Illustration = GARMENT_COMPONENT[garmentType];
  const garmentInfo = GARMENTS.find((g) => g.id === garmentType)!;
  const logoBoxSize = 60 * scale;

  const orderSummary = () => {
    const lines = [
      `Plagg: ${garmentInfo.name} (${color.name})`,
      `Størrelse: ${size}`,
      `Antall: ${qty}`,
      `Logo: ${logoMode === "upload" ? logoName || "(vedlagt i e-posten)" : `Tekst — "${initials}"`}`,
      `Plassering: ${Math.round(pos.x)}% / ${Math.round(pos.y)}%, størrelse ${scale.toFixed(2)}x`,
      "",
      `Navn: ${name}`,
      `Skole: ${school}`,
      `Klasse/trinn: ${grade}`,
      `E-post: ${email}`,
      comment ? `Kommentar: ${comment}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  };

  const sendOrder = () => {
    const subject = encodeURIComponent(
      `Bestilling — ${garmentInfo.name} til ${school || "skole"}`
    );
    const body = encodeURIComponent(
      `${orderSummary()}${
        logoMode === "upload"
          ? "\n\n(Husk å legge ved skolelogo-filen i denne e-posten før du sender.)"
          : ""
      }`
    );
    window.location.href = `mailto:hei@campuswear.no?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
      {/* STAGE */}
      <div>
        <div className="flex gap-2">
          {GARMENTS.map((g) => (
            <button
              key={g.id}
              onClick={() => setGarmentType(g.id)}
              className={`border-2 border-ink px-4 py-2 font-display text-xs uppercase tracking-wide transition ${
                garmentType === g.id ? "bg-ink text-cream" : "bg-transparent"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        <div
          ref={stageRef}
          className="relative mt-4 aspect-[5/6] w-full touch-none select-none border-2 border-ink bg-paper"
        >
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <Illustration color={color.hex} className="h-full w-full" />
          </div>

          {(logoUrl || logoMode === "initials") && (
            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${logoBoxSize}px`,
                height: `${logoBoxSize}px`,
              }}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center overflow-hidden rounded-sm border-2 border-dashed border-lime bg-lime/10 active:cursor-grabbing"
            >
              {logoMode === "upload" && logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Skolelogo"
                  className="pointer-events-none h-full w-full object-contain p-1"
                />
              ) : (
                <span className="pointer-events-none px-1 text-center font-display text-[11px] font-bold uppercase leading-none text-ink">
                  {initials || "SKOLE"}
                </span>
              )}
            </div>
          )}
        </div>
        <p className="mt-2 text-xs text-ink/50">
          Dra logoen dit du vil ha den. Bruk størrelse-glideren for å skalere.
        </p>

        <div className="mt-6">
          <p className="eyebrow text-ink/50">Farge</p>
          <div className="mt-2 flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c.name}
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
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col gap-8">
        <div>
          <p className="eyebrow text-ink/50">1. Logo</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setLogoMode("upload")}
              className={`border-2 border-ink px-4 py-2 font-display text-xs uppercase tracking-wide ${
                logoMode === "upload" ? "bg-ink text-cream" : ""
              }`}
            >
              Last opp logo
            </button>
            <button
              onClick={() => setLogoMode("initials")}
              className={`border-2 border-ink px-4 py-2 font-display text-xs uppercase tracking-wide ${
                logoMode === "initials" ? "bg-ink text-cream" : ""
              }`}
            >
              Bruk tekst
            </button>
          </div>

          {logoMode === "upload" ? (
            <label className="mt-3 flex cursor-pointer flex-col items-start gap-1 border-2 border-dashed border-ink/30 px-4 py-4">
              <span className="font-display text-xs uppercase tracking-wide">
                {logoName || "Velg fil (PNG/SVG med gjennomsiktig bunn)"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0] ?? null)}
              />
            </label>
          ) : (
            <input
              value={initials}
              onChange={(e) => setInitials(e.target.value.toUpperCase().slice(0, 8))}
              placeholder="F.eks. ASK VGS"
              className="mt-3 w-full border-2 border-ink/30 px-4 py-3 font-display text-sm uppercase tracking-wide outline-none focus:border-ink"
            />
          )}
        </div>

        <div>
          <p className="eyebrow text-ink/50">2. Plassering</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setPos(p.pos);
                  setScale(p.scale);
                }}
                className="border-2 border-ink/30 px-3 py-2 text-xs font-medium uppercase tracking-wide hover:border-ink"
              >
                {p.label}
              </button>
            ))}
          </div>
          <label className="mt-4 block text-xs uppercase tracking-wide text-ink/50">
            Størrelse på trykk
          </label>
          <input
            type="range"
            min={0.4}
            max={1.6}
            step={0.05}
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="mt-2 w-full accent-lime"
          />
        </div>

        <div>
          <p className="eyebrow text-ink/50">3. Bestilling</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Navn"
              className="border-2 border-ink/30 px-4 py-3 text-sm outline-none focus:border-ink"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-post"
              type="email"
              className="border-2 border-ink/30 px-4 py-3 text-sm outline-none focus:border-ink"
            />
            <input
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Skole"
              className="border-2 border-ink/30 px-4 py-3 text-sm outline-none focus:border-ink"
            />
            <input
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Klasse/trinn"
              className="border-2 border-ink/30 px-4 py-3 text-sm outline-none focus:border-ink"
            />
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border-2 border-ink/30 px-4 py-3 text-sm outline-none focus:border-ink"
            >
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  Størrelse {s}
                </option>
              ))}
            </select>
            <input
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              type="number"
              min={1}
              placeholder="Antall"
              className="border-2 border-ink/30 px-4 py-3 text-sm outline-none focus:border-ink"
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Kommentar (valgfritt)"
              rows={3}
              className="border-2 border-ink/30 px-4 py-3 text-sm outline-none focus:border-ink sm:col-span-2"
            />
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t border-ink/15 pt-4">
            <span className="text-sm text-ink/60">Pris</span>
            <span className="font-display text-2xl font-semibold">
              {garmentInfo.price * qty},-
            </span>
          </div>

          <Button
            onClick={sendOrder}
            variant="primary"
            className="mt-4 w-full"
          >
            Send bestilling →
          </Button>
          <p className="mt-2 text-xs text-ink/50">
            Åpner en ferdigutfylt e-post til oss. Betaling og bekreftelse
            ordner vi over e-post/skoledugnad, akkurat som med russedress —
            bare billigere.
          </p>
        </div>
      </div>
    </div>
  );
}
