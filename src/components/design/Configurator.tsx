"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ProductPhoto, {
  VIEWS,
  hasStudioPhoto,
  type ViewAngle,
} from "@/components/product/ProductPhoto";
import Button from "@/components/ui/Button";
import {
  COLORS,
  SIZES,
  GARMENTS,
  SET_PRICE,
  type GarmentType,
} from "@/lib/products";

type DesignMode = "none" | "upload" | "text" | "element";

type Position = { x: number; y: number }; // percent, 0-100

const PRESETS: { label: string; pos: Position; scale: number }[] = [
  { label: "Venstre bryst", pos: { x: 34, y: 34 }, scale: 0.55 },
  { label: "Midt bryst", pos: { x: 50, y: 38 }, scale: 0.8 },
  { label: "Stort print", pos: { x: 50, y: 52 }, scale: 1.3 },
];

// Noen enkle, ferdige dekor-elementer for "Legg til elementer" — et
// lettvekts alternativ til opplastet logo/tekst, i samme ånd som
// elementbiblioteket i referansebildet.
const ELEMENTS: { id: string; label: string; path: string; viewBox: string }[] = [
  {
    id: "star",
    label: "Stjerne",
    viewBox: "0 0 24 24",
    path: "M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z",
  },
  {
    id: "ring",
    label: "Sirkel",
    viewBox: "0 0 24 24",
    path: "M12 3a9 9 0 100 18 9 9 0 000-18zm0 3a6 6 0 110 12 6 6 0 010-12z",
  },
  {
    id: "banner",
    label: "Stripe",
    viewBox: "0 0 24 24",
    path: "M2 9h20v2H2V9zm0 4h14v2H2v-2z",
  },
];

const fieldClasses =
  "border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-ink";

const chipClasses = (active: boolean) =>
  `border px-4 py-2 font-body text-xs uppercase tracking-[0.1em] transition ${
    active ? "border-ink bg-ink text-cream" : "border-ink/25 text-ink/70 hover:border-ink"
  }`;

export default function Configurator({
  initialGarment: presetGarment,
  initialColorHex: presetColorHex,
}: {
  /** Forhåndsvalgt plagg — brukes når komponenten står innbakt på en
   * bestemt produktside i stedet for på den frittstående /design-siden. */
  initialGarment?: GarmentType;
  initialColorHex?: string;
} = {}) {
  const params = useSearchParams();
  const embedded = !!presetGarment;
  const initialGarment =
    presetGarment || (params.get("garment") as GarmentType) || "hoodie";
  const initialColor = presetColorHex ?? params.get("color");

  const [garmentType, setGarmentType] = useState<GarmentType>(
    initialGarment === "joggebukse" ? "joggebukse" : "hoodie"
  );
  const [color, setColor] = useState(
    COLORS.find((c) => c.hex.toLowerCase() === initialColor?.toLowerCase()) ??
      COLORS[0]
  );

  // Hvilken vinkel av plagget som vises — dette ER produktfotoet OG
  // avgjør om "Lag ditt design" er tilgjengelig, siden vi bare kan la deg
  // plassere et trykk et sted vi faktisk har et bilde av.
  const [view, setView] = useState<ViewAngle>("front");
  // Bytt tilbake til front når plagget byttes, i tilfelle det nye plagget
  // ikke har et bilde for vinkelen du sto på.
  useEffect(() => {
    setView("front");
  }, [garmentType]);

  const [mode, setMode] = useState<DesignMode>("none");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string>("");
  const [initials, setInitials] = useState("SKOLE");
  const [elementId, setElementId] = useState<string | null>(null);
  const [showElementPicker, setShowElementPicker] = useState(false);
  const [showAiNotice, setShowAiNotice] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    setMode("upload");
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

  const garmentInfo = GARMENTS.find((g) => g.id === garmentType)!;
  const otherGarment = GARMENTS.find((g) => g.id !== garmentType)!;
  const setSavings = garmentInfo.price + otherGarment.price - SET_PRICE;
  const logoBoxSize = 60 * scale;
  const selectedElement = ELEMENTS.find((el) => el.id === elementId);
  const hasDesign =
    (mode === "upload" && logoUrl) ||
    (mode === "text" && initials.trim().length > 0) ||
    (mode === "element" && selectedElement);
  const viewLabel = VIEWS.find((v) => v.key === view)?.label ?? view;
  const canDesignHere = hasStudioPhoto(garmentType, view);

  const designSummary = () => {
    if (mode === "upload") return logoName || "Opplastet fil (vedlagt i e-posten)";
    if (mode === "text") return `Tekst — "${initials}"`;
    if (mode === "element") return `Element — ${selectedElement?.label}`;
    return "Ingen";
  };

  const orderSummary = () => {
    const lines = [
      `Plagg: ${garmentInfo.name} (${color.name})`,
      `Størrelse: ${size}`,
      `Antall: ${qty}`,
      `Design (${viewLabel}): ${designSummary()}`,
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
        mode === "upload"
          ? "\n\n(Husk å legge ved skolelogo-filen i denne e-posten før du sender.)"
          : ""
      }`
    );
    window.location.href = `mailto:hei@campuswear.no?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      {/* STAGE */}
      <div>
        {!embedded && (
          <div className="flex gap-2">
            {GARMENTS.map((g) => (
              <button
                key={g.id}
                onClick={() => setGarmentType(g.id)}
                className={chipClasses(garmentType === g.id)}
              >
                {g.name}
              </button>
            ))}
          </div>
        )}

        {/* Vinkel-velger — bytter selve produktfotoet. Hoodien har ekte
            bilder av alle tre (samme fysiske plagg som 360°-spinnet på
            forsiden); buksa har foreløpig bare front. */}
        <div className={`flex gap-2 ${embedded ? "" : "mt-5"}`}>
          {VIEWS.map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className={chipClasses(view === v.key)}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div
          ref={stageRef}
          className="relative mt-3 aspect-[5/6] w-full touch-none select-none bg-sand/40"
        >
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <ProductPhoto
              id={garmentType}
              view={view}
              colorHex={color.hex}
              className="h-full w-full"
            />
          </div>

          {canDesignHere && hasDesign && (
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
              className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center overflow-hidden border border-dashed border-rust bg-rust/10 active:cursor-grabbing"
            >
              {mode === "upload" && logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Skolelogo"
                  className="pointer-events-none h-full w-full object-contain p-1"
                />
              ) : mode === "element" && selectedElement ? (
                <svg
                  viewBox={selectedElement.viewBox}
                  className="pointer-events-none h-2/3 w-2/3 fill-ink"
                >
                  <path d={selectedElement.path} />
                </svg>
              ) : (
                <span className="pointer-events-none px-1 text-center font-body text-[11px] font-semibold uppercase leading-none text-ink">
                  {initials || "SKOLE"}
                </span>
              )}
            </div>
          )}

          {canDesignHere && (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-4 left-4 border border-ink/20 bg-cream/90 px-4 py-2 font-body text-[11px] uppercase tracking-[0.1em] text-ink/70 backdrop-blur transition hover:border-ink hover:text-ink"
            >
              Trykk for stor visning
            </button>
          )}
        </div>
        <p className="mt-3 text-xs text-ink/45">
          Dra designet dit du vil ha det. Bruk størrelse-glideren for å
          skalere.
        </p>
      </div>

      {/* INFO / DESIGN-VERKTØY */}
      <div className="flex flex-col gap-9">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.14em] text-ink/45">
            Farge — <span className="text-ink">{color.name}</span>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.name}
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
            {setSavings > 0 && (
              <span className="border border-rust/30 bg-rust/10 px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.08em] text-rustdark">
                Spar {setSavings},- i sett med {otherGarment.name.toLowerCase()}
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-ink/10 pt-8">
          <p className="font-display text-xl">
            Lag ditt design — {viewLabel.toLowerCase()}
          </p>

          {!canDesignHere ? (
            <p className="mt-6 border border-dashed border-ink/20 px-4 py-6 text-center text-sm text-ink/50">
              Vi har ikke {viewLabel.toLowerCase()}-bilde av dette plagget
              ennå, så design her kommer snart — bruk Front for nå.
            </p>
          ) : (
            <>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-start gap-2 border px-4 py-4 text-left transition ${
                    mode === "upload"
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/20 hover:border-ink"
                  }`}
                >
                  <span aria-hidden>↑</span>
                  <span className="font-body text-xs uppercase tracking-[0.08em]">
                    Last opp logo
                  </span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                />

                <button
                  onClick={() => setShowElementPicker((v) => !v)}
                  className={`flex flex-col items-start gap-2 border px-4 py-4 text-left transition ${
                    mode === "element"
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/20 hover:border-ink"
                  }`}
                >
                  <span aria-hidden>▦</span>
                  <span className="font-body text-xs uppercase tracking-[0.08em]">
                    Legg til elementer
                  </span>
                </button>

                <button
                  onClick={() => setMode("text")}
                  className={`flex flex-col items-start gap-2 border px-4 py-4 text-left transition ${
                    mode === "text"
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/20 hover:border-ink"
                  }`}
                >
                  <span aria-hidden>T</span>
                  <span className="font-body text-xs uppercase tracking-[0.08em]">
                    Legg til tekst
                  </span>
                </button>

                <button
                  onClick={() => setShowAiNotice(true)}
                  className="flex flex-col items-start gap-2 border border-transparent bg-gradient-to-br from-[#EDE3FB] to-[#F6E9EE] px-4 py-4 text-left text-ink transition hover:from-[#E4D4F8] hover:to-[#F2DCE4]"
                >
                  <span aria-hidden>✦</span>
                  <span className="font-body text-xs uppercase tracking-[0.08em]">
                    Lag logo med AI
                  </span>
                </button>
              </div>

              {showAiNotice && (
                <p className="mt-3 border border-dashed border-ink/20 px-4 py-3 text-xs text-ink/55">
                  Kommer snart. Last opp en logofil eller bruk tekst i
                  mellomtiden.{" "}
                  <button
                    onClick={() => setShowAiNotice(false)}
                    className="underline underline-offset-2 hover:text-ink"
                  >
                    Lukk
                  </button>
                </p>
              )}

              {showElementPicker && (
                <div className="mt-3 flex gap-2 border border-ink/15 p-3">
                  {ELEMENTS.map((el) => (
                    <button
                      key={el.id}
                      onClick={() => {
                        setElementId(el.id);
                        setMode("element");
                        setShowElementPicker(false);
                      }}
                      aria-label={el.label}
                      className="flex h-12 w-12 items-center justify-center border border-ink/15 transition hover:border-ink"
                    >
                      <svg viewBox={el.viewBox} className="h-6 w-6 fill-ink/70">
                        <path d={el.path} />
                      </svg>
                    </button>
                  ))}
                </div>
              )}

              {mode === "text" && (
                <input
                  value={initials}
                  onChange={(e) =>
                    setInitials(e.target.value.toUpperCase().slice(0, 8))
                  }
                  placeholder="F.eks. ASK VGS"
                  className={`mt-3 w-full ${fieldClasses} font-body uppercase tracking-[0.08em]`}
                />
              )}

              {hasDesign && (
                <div className="mt-5">
                  <p className="eyebrow text-ink/45">Lastet opp</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center border border-ink/15 bg-cream">
                      {mode === "upload" && logoUrl ? (
                        <img
                          src={logoUrl}
                          alt="Skolelogo"
                          className="h-full w-full object-contain p-1"
                        />
                      ) : mode === "element" && selectedElement ? (
                        <svg
                          viewBox={selectedElement.viewBox}
                          className="h-6 w-6 fill-ink/70"
                        >
                          <path d={selectedElement.path} />
                        </svg>
                      ) : (
                        <span className="px-1 text-center font-body text-[10px] font-semibold uppercase leading-none text-ink">
                          {initials}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink/50">{designSummary()}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      setPos(p.pos);
                      setScale(p.scale);
                    }}
                    className="border border-ink/20 px-3 py-2 text-xs text-ink/70 transition hover:border-ink hover:text-ink"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <label className="mt-5 block text-xs uppercase tracking-wide text-ink/45">
                Størrelse på trykk
              </label>
              <input
                type="range"
                min={0.4}
                max={1.6}
                step={0.05}
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="mt-2 w-full accent-rust"
              />
            </>
          )}
        </div>

        <div className="border-t border-ink/10 pt-8">
          <p className="eyebrow text-ink/45">Bestilling</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Navn"
              className={fieldClasses}
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-post"
              type="email"
              className={fieldClasses}
            />
            <input
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Skole"
              className={fieldClasses}
            />
            <input
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Klasse/trinn"
              className={fieldClasses}
            />
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className={fieldClasses}
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
              className={fieldClasses}
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Kommentar (valgfritt)"
              rows={3}
              className={`${fieldClasses} sm:col-span-2`}
            />
          </div>

          <div className="mt-5 flex items-baseline justify-between border-t border-ink/10 pt-5">
            <span className="text-sm text-ink/55">Pris</span>
            <span className="font-display text-2xl">
              {garmentInfo.price * qty},-
            </span>
          </div>

          <Button onClick={sendOrder} variant="primary" className="mt-5 w-full">
            Send bestilling →
          </Button>
          <p className="mt-3 text-xs text-ink/45">
            Åpner en ferdigutfylt e-post til oss. Betaling og bekreftelse
            ordner vi over e-post/skoledugnad, akkurat som med russedress —
            bare billigere.
          </p>
        </div>
      </div>

      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-ink/90 p-8"
        >
          <ProductPhoto
            id={garmentType}
            view={view}
            colorHex={color.hex}
            className="h-full max-h-[85vh] w-full max-w-lg"
          />
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Lukk"
            className="absolute right-6 top-6 font-body text-2xl text-cream/80 hover:text-cream"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
