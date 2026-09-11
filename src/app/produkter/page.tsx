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
      <section className="container-px pb-12 pt-16 md:pb-16 md:pt-24">
        <p className="eyebrow text-ink/45">Kolleksjonen</p>
        <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[1.05] md:text-6xl">
          To plagg. Gjort ordentlig.
        </h1>
        <p className="mt-6 max-w-lg text-ink/65">
          Vi selger ikke en hel russedress-pakke du ikke ba om. Bare
          hettegenser og joggebukse, i fasongene alle egentlig vil ha —
          med skolelogoen din på.
        </p>
      </section>

      <section className="container-px grid gap-16 pb-20 md:grid-cols-2 md:gap-14 md:pb-28">
        {GARMENTS.map((g) => (
          <ProductCard key={g.id} garment={g} />
        ))}
      </section>

      <section className="border-y border-ink/10 bg-sand/40">
        <div className="container-px flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:justify-between md:py-16">
          <div>
            <p className="eyebrow text-ink/45">Sett</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">
              Hettegenser + joggebukse for {SET_PRICE},-
            </h2>
          </div>
          <Button href="/design" variant="primary">
            Design settet ditt →
          </Button>
        </div>
      </section>

      <section className="container-px py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">
              Bestiller du for hele klassen?
            </h2>
            <p className="mt-3 max-w-md text-ink/65">
              Vi setter opp én felles designside for skolen deres, slik at
              alle bestiller riktig størrelse med samme logoplassering. Ingen
              minstepris, ingen bindingstid.
            </p>
            <Button href="/kontakt" variant="ghost" className="mt-6">
              Bestill for skolen →
            </Button>
          </div>
          <div>
            <h2 className="font-display text-2xl">Passform</h2>
            <p className="mt-3 max-w-md text-ink/65">
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
