import Link from "next/link";
import Hoodie from "@/components/garments/Hoodie";
import Joggebukse from "@/components/garments/Joggebukse";
import { COLORS, type Product } from "@/lib/products";

const GARMENT_COMPONENT = {
  hoodie: Hoodie,
  joggebukse: Joggebukse,
} as const;

/**
 * Én klikkbar boks: illustrasjon på lys bunn + navn, kort beskrivelse og
 * pris. Brukes både i forsidens sortiment-seksjon og under "Relaterte
 * produkter" på produktsiden, slik at de to alltid ser like ut.
 */
export default function ProductTile({
  product,
  compact = false,
}: {
  product: Product;
  /** Mindre variant, brukt i "Relaterte produkter". */
  compact?: boolean;
}) {
  const Illustration = GARMENT_COMPONENT[product.id];

  return (
    <Link href={`/produkter/${product.id}`} className="group block">
      <div
        className={`flex items-center justify-center bg-sand/50 transition group-hover:bg-sand/70 ${
          compact ? "p-8" : "p-10 md:p-14"
        }`}
      >
        <Illustration
          color={COLORS[0].hex}
          className={compact ? "w-2/3 max-w-[160px]" : "w-3/4 max-w-[220px]"}
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className={compact ? "font-display text-lg" : "font-display text-xl"}>
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-ink/55">{product.tagline}</p>
        </div>
        <p className="whitespace-nowrap font-display text-lg">{product.price},-</p>
      </div>
      <p className="mt-3 font-body text-xs uppercase tracking-[0.12em] text-ink/45 transition group-hover:text-rust">
        Se produktet →
      </p>
    </Link>
  );
}
