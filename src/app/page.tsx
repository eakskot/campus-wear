import Button from "@/components/ui/Button";
import HoodieHero from "@/components/home/HoodieHero";
import ProductPhoto from "@/components/product/ProductPhoto";
import ProductTile from "@/components/product/ProductTile";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  return (
    <>
      <HoodieHero />

      {/* SORTIMENT — venstre: hva vi selger, høyre: to klikkbare bokser
          som går rett inn på hvert plaggs egen produktside. */}
      <section className="container-px grid gap-10 border-b border-ink/10 py-20 md:grid-cols-2 md:gap-14 md:py-28">
        <div>
          <p className="eyebrow text-ink/45">Sortimentet</p>
          <h2 className="mt-5 max-w-sm font-display text-4xl leading-[1.05] md:text-5xl">
            Skoleklær med skolens logo.
          </h2>
          <p className="mt-6 max-w-sm text-ink/65">
            To plagg, gjort ordentlig. Velg farge, last opp skolelogoen og se
            designet live før klassen bestiller.
          </p>
          <Button href="/produkter" variant="ghost" className="mt-8">
            Se hele kolleksjonen →
          </Button>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 md:gap-8">
          {PRODUCTS.map((p) => (
            <ProductTile key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="container-px grid gap-10 py-16 md:grid-cols-2 md:gap-8 md:py-24">
        <div>
          <p className="eyebrow text-ink/45">Skoleklær, ikke russedress</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-5xl">
            Skoleklær som faktisk er <em className="italic">kule</em>.
          </h1>
        </div>
        <div className="flex flex-col justify-center">
          <p className="max-w-md text-lg leading-relaxed text-ink/65">
            Hettegenser og joggebukse med skolens logo — designet av folk som
            faktisk går på vgs, ikke av dresskledde mellommenn. Billigere enn
            russedress-leverandørene, og null utslipp fra bomull til dør.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/design" variant="primary">
              Design din genser →
            </Button>
            <Button href="/produkter" variant="ghost">
              Se produktene
            </Button>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6">
            <div>
              <p className="font-display text-2xl">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink/45">
                Klimakompensert
              </p>
            </div>
            <div>
              <p className="font-display text-2xl">449,-</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink/45">
                Fra, hettegenser
              </p>
            </div>
            <div>
              <p className="font-display text-2xl">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink/45">
                Din egen logo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="container-px grid divide-y divide-ink/10 border-y border-ink/10 md:grid-cols-3 md:divide-x md:divide-y-0">
        {[
          {
            n: "01",
            title: "Kulere stil",
            body: "Vid, rett joggebukse og oversized hettegenser — samme fasong du allerede har lyst på, ikke noe som ser ut som firmaklær fra 2014.",
          },
          {
            n: "02",
            title: "Billigere",
            body: "Ingen unødvendige mellomledd og ingen dyre russedress-pakker du ikke ba om. Du betaler for genseren, ikke for merkevaren til noen andre.",
          },
          {
            n: "03",
            title: "Null utslipp",
            body: "Vi klimakompenserer 100 % av produksjon og frakt på alt vi sender. Kulere klær skal ikke koste mer enn nødvendig for planeten heller.",
          },
        ].map((item) => (
          <div key={item.n} className="py-12 max-md:first:pt-0 md:px-12 md:py-20 md:first:pl-0 md:last:pr-0">
            <p className="font-display text-sm italic text-ink/35">{item.n}</p>
            <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">{item.body}</p>
          </div>
        ))}
      </section>

      {/* DESIGN SELV TEASER */}
      <section className="border-y border-ink/10 bg-sand/40">
        <div className="container-px grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="eyebrow text-ink/45">Designeren</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] md:text-5xl">
              Legg på skolens logo. Se den live. Bestill.
            </h2>
            <p className="mt-6 max-w-md text-ink/65">
              Last opp skolelogoen, velg farge på plagget, og dra logoen dit du
              vil ha den — bryst, rygg, erme. Du ser akkurat hvordan det blir
              før du bestiller for klassen.
            </p>
            <Button href="/design" variant="primary" className="mt-8">
              Prøv designeren →
            </Button>
          </div>
          <div className="relative flex items-center justify-center bg-paper py-16">
            <ProductPhoto id="hoodie" className="h-64 w-1/2" />
            <div className="absolute left-1/2 top-[42%] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-dashed border-rust/60 font-body text-[9px] uppercase tracking-wide text-rust">
              Logo
            </div>
          </div>
        </div>
      </section>

      {/* NULL UTSLIPP */}
      <section className="bg-ink text-cream">
        <div className="container-px flex flex-col gap-8 py-20 md:flex-row md:items-center md:justify-between md:py-28">
          <div className="max-w-xl">
            <p className="eyebrow text-cream/45">Null utslipp</p>
            <h2 className="mt-5 font-display text-4xl italic leading-[1.05] md:text-5xl">
              Kult skal ikke koste kloden.
            </h2>
            <p className="mt-6 text-cream/70">
              Vi klimakompenserer alt vi produserer og all frakt vi sender —
              uten at det gjør genseren dyrere for deg.
            </p>
          </div>
          <Button href="/null-utslipp" variant="ghost-inv">
            Hvordan vi gjør det →
          </Button>
        </div>
      </section>

      {/* OM OSS TEASER */}
      <section className="container-px py-20 md:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-ink/45">Om oss</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] md:text-5xl">
              Startet av to elever, ikke to menn i dress.
            </h2>
            <p className="mt-6 text-ink/65">
              Campus Wear er startet av oss to — ikke av et russedress-selskap
              som har solgt de samme genserne i 20 år. Vi vet hva som faktisk
              er kult å ha på seg, fordi vi går på skolen selv.
            </p>
          </div>
          <Button href="/om-oss" variant="ghost">
            Les historien vår →
          </Button>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-ink/10 bg-sand/40">
        <div className="container-px flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="font-display text-3xl italic md:text-5xl">
            Klar for å style klassen?
          </h2>
          <Button href="/design" variant="primary">
            Design din genser →
          </Button>
        </div>
      </section>
    </>
  );
}
