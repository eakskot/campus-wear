import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Om oss — Campus Wear",
  description: "Campus Wear er startet av to vgs-elever som synes skoleklær kan være kulere, billigere og mer klimavennlig.",
};

export default function OmOssPage() {
  return (
    <>
      <section className="container-px py-20 md:py-28">
        <p className="eyebrow text-ink/45">Om oss</p>
        <h1 className="mt-5 max-w-2xl font-display text-4xl italic leading-[1.05] md:text-6xl">
          To elever. Ikke to menn i dress.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
          Campus Wear ble startet fordi vi selv gikk lei av at skoleklær enten
          er dyre, kjedelige, eller begge deler. De store
          russedress-leverandørene har solgt de samme genserne i årevis — vi
          startet Campus Wear for å gjøre det bedre, ikke bare billigere.
        </p>
      </section>

      <section className="container-px grid gap-10 border-y border-ink/10 py-14 md:grid-cols-3 md:py-16">
        <div>
          <p className="font-display text-4xl">2026</p>
          <p className="mt-2 text-sm uppercase tracking-wide text-ink/45">
            Startet
          </p>
        </div>
        <div>
          <p className="font-display text-4xl">2</p>
          <p className="mt-2 text-sm uppercase tracking-wide text-ink/45">
            Gründere, begge fortsatt på skolebenken
          </p>
        </div>
        <div>
          <p className="font-display text-4xl">0</p>
          <p className="mt-2 text-sm uppercase tracking-wide text-ink/45">
            Netto utslipp per bestilling (klimakompensert)
          </p>
        </div>
      </section>

      <section className="container-px py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">
              Hvorfor vi startet Campus Wear
            </h2>
            <p className="mt-4 text-ink/65">
              Vi har begge kjøpt skoleklær vi egentlig ikke likte, fra
              leverandører som selger den samme fasongen til alle skoler i
              landet. Vi tenkte: hvorfor kan ikke skoleklær se ut som klærne
              vi faktisk kjøper selv — vid joggebukse, oversized hettegenser
              — og kunne designes akkurat sånn vi vil på skjermen, i stedet
              for i et bestillingsskjema fra 2012?
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl">
              Hva vi gjør annerledes
            </h2>
            <ul className="mt-4 space-y-3 text-ink/65">
              <li>— Én fasong vi faktisk står inne for, ikke et helt katalog av basic-print.</li>
              <li>— Design selv på nettsiden, i stedet for å sende inn en Word-fil til trykkeriet.</li>
              <li>— Klimakompensert produksjon og frakt på alt vi sender.</li>
              <li>— Priser satt for elever, ikke for et skolebudsjett.</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 bg-sand/50 p-8 md:p-12">
          <h2 className="font-display text-2xl md:text-3xl">
            Går du på en skole som vil bytte leverandør?
          </h2>
          <p className="mt-3 max-w-xl text-ink/65">
            Vi hjelper elevrådet eller komiteen med å sette opp en egen
            designside for skolen deres.
          </p>
          <Button href="/kontakt" variant="primary" className="mt-6">
            Ta kontakt →
          </Button>
        </div>
      </section>
    </>
  );
}
