import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/ui/Button";
import { GARMENTS, SET_PRICE } from "@/lib/products";

export const metadata: Metadata = {
  title: "Produkter — Campus Wear",
  description: "Hettegenser og joggebukse med skolelogo, i farger som faktisk er kule.",
};

export default function ProdukterPage() {
  return (
    <>
      <section className="container-px pb-10 pt-14 md:pb-14 md:pt-20">
        <p className="eyebrow text-ink/50">Kolleksjonen</p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tightest md:text-6xl">
          To plagg. Gjort ordentlig.
        </h1>
        <p className="mt-5 max-w-lg text-ink/70">
          Vi selger ikke en hel russedress-pakke du ikke ba om. Bare
          hettegenser og joggebukse, i fasongene alle egentlig vil ha —
          med skolelogoen din på.
        </p>
      </section>

      <section className="container-px grid gap-8 pb-16 md:grid-cols-2 md:gap-10 md:pb-24">
        {GARMENTS.map((g) => (
          <ProductCard key={g.id} garment={g} />
        ))}
      </section>

      <section className="border-y-2 border-ink bg-lime">
        <div className="container-px flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:justify-between md:py-14">
          <div>
            <p className="eyebrow text-ink/60">Sett</p>
            <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
              Hettegenser + joggebukse for {SET_PRICE},-
            </h2>
          </div>
          <Button href="/design" variant="dark">
            Design settet ditt →
          </Button>
        </div>
      </section>

      <section className="container-px py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-tight">
              Bestiller du for hele klassen?
            </h2>
            <p className="mt-3 max-w-md text-ink/70">
              Vi setter opp én felles designside for skolen deres, slik at
              alle bestiller riktig størrelse med samme logoplassering. Ingen
              minstepris, ingen bindingstid.
            </p>
            <Button href="/kontakt" variant="ghost" className="mt-6">
              Bestill for skolen →
            </Button>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-tight">
              Passform
            </h2>
            <p className="mt-3 max-w-md text-ink/70">
              Hettegenseren har relaxed fit med droppede skuldre — bestill din
              vanlige størrelse for en løs passform, eller én opp for ekstra
              oversized. Joggebuksen er vid og rett i hele benet, ikke smal
              ved ankelen.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
