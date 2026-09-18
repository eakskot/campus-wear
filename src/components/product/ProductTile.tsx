import Link from "next/link";
import ProductPhoto from "@/components/product/ProductPhoto";
import type { Product } from "@/lib/products";

/**
 * Én klikkbar boks: produktfoto på lys bunn + navn, kort beskrivelse og
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
  return (
    <Link href={`/produkter/${product.id}`} className="group block">
      <div className="overflow-hidden bg-sand/50">
        <ProductPhoto
          id={product.id}
          variant="lifestyle"
          className={`${compact ? "h-40" : "h-56 md:h-64"} w-full transition duration-300 group-hover:scale-[1.03]`}
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
