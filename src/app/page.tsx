import Link from "next/link";
import Marquee from "@/components/Marquee";
import Button from "@/components/ui/Button";
import Hoodie from "@/components/garments/Hoodie";
import Joggebukse from "@/components/garments/Joggebukse";
import { GARMENTS } from "@/lib/products";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="container-px grid gap-10 pb-14 pt-14 md:grid-cols-2 md:gap-6 md:pb-20 md:pt-20">
        <div className="flex flex-col justify-center">
          <p className="eyebrow text-ink/50">Skoleklær, ikke russedress</p>
          <h1 className="mt-4 font-display text-[13vw] font-semibold uppercase leading-[0.92] tracking-tightest md:text-[4.6vw]">
            Skoleklær
            <br />
            som faktisk
            <br />
            er kule.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink/70">
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

          <div className="mt-12 grid max-w-md grid-cols-3 divide-x divide-ink/15 border-y border-ink/15 py-6">
            <div className="pr-4">
              <p className="font-display text-2xl font-semibold">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">
                Klimakompensert
              </p>
            </div>
            <div className="px-4">
              <p className="font-display text-2xl font-semibold">449,-</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">
                Fra, hettegenser
              </p>
            </div>
            <div className="pl-4">
              <p className="font-display text-2xl font-semibold">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">
                Din egen logo
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-6 -z-10 border-2 border-ink/10 md:inset-8" />
          <Hoodie color="#17181B" className="w-3/4 max-w-sm drop-shadow-[8px_10px_0_rgba(16,16,18,0.12)]" />
        </div>
      </section>

      <Marquee />

      {/* VALUE PROPS */}
      <section className="container-px grid divide-y divide-ink/15 border-b border-ink/15 md:grid-cols-3 md:divide-x md:divide-y-0">
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
          <div key={item.n} className="py-10 first:pt-0 md:px-10 md:py-16 md:first:pl-0 md:last:pr-0">
            <p className="font-display text-sm text-ink/40">{item.n}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-tight">
              {item.title}
            </h3>
            <p className="mt-3 text-ink/70">{item.body}</p>
          </div>
        ))}
      </section>

      {/* PRODUCT HIGHLIGHT */}
      <section className="bg-ink text-cream">
        <div className="container-px py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-semibold uppercase tracking-tightest md:text-6xl">
              Produktene
            </h2>
            <Link
              href="/produkter"
              className="font-display text-sm uppercase tracking-wide text-lime hover:underline"
            >
              Se alle produkter →
            </Link>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-6">
            <div className="border-2 border-cream/15 p-8">
              <Hoodie color="#D9CBAE" className="mx-auto w-3/5 max-w-[220px]" />
              <p className="mt-6 font-display text-xl uppercase">
                {GARMENTS[0].name}
              </p>
              <p className="mt-1 text-sm text-cream/60">{GARMENTS[0].tagline}</p>
              <p className="mt-4 font-display text-lg">Fra {GARMENTS[0].price},-</p>
            </div>
            <div className="border-2 border-cream/15 p-8">
              <Joggebukse color="#232C3D" className="mx-auto w-3/5 max-w-[220px]" />
              <p className="mt-6 font-display text-xl uppercase">
                {GARMENTS[1].name}
              </p>
              <p className="mt-1 text-sm text-cream/60">{GARMENTS[1].tagline}</p>
              <p className="mt-4 font-display text-lg">Fra {GARMENTS[1].price},-</p>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN SELV TEASER */}
      <section className="container-px grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="eyebrow text-ink/50">Designeren</p>
          <h2 className="mt-4 font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tightest md:text-5xl">
            Legg på skolens logo. Se den live. Bestill.
          </h2>
          <p className="mt-5 max-w-md text-ink/70">
            Last opp skolelogoen, velg farge på plagget, og dra logoen dit du
            vil ha den — bryst, rygg, erme. Du ser akkurat hvordan det blir
            før du bestiller for klassen.
          </p>
          <Button href="/design" variant="primary" className="mt-8">
            Prøv designeren →
          </Button>
        </div>
        <div className="relative border-2 border-ink bg-paper p-8 shadow-hard">
          <Hoodie color="#17181B" className="mx-auto w-2/3 max-w-[240px]" />
          <div className="absolute left-1/2 top-[38%] flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-2 border-dashed border-lime bg-lime/20 font-display text-[10px] uppercase text-ink">
            Din logo
          </div>
        </div>
      </section>

      {/* NULL UTSLIPP TEASER */}
      <section className="bg-forest text-cream">
        <div className="container-px flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-24">
          <div className="max-w-xl">
            <p className="eyebrow text-lime">Null utslipp</p>
            <h2 className="mt-4 font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tightest md:text-5xl">
              Kult skal ikke koste kloden.
            </h2>
            <p className="mt-5 text-cream/75">
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
      <section className="container-px py-16 md:py-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-ink/50">Om oss</p>
            <h2 className="mt-4 font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tightest md:text-5xl">
              Startet av to elever, ikke to menn i dress.
            </h2>
            <p className="mt-5 text-ink/70">
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
      <section className="border-t-2 border-ink bg-lime">
        <div className="container-px flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="font-display text-3xl font-semibold uppercase leading-[0.95] tracking-tightest md:text-5xl">
            Klar for å style klassen?
          </h2>
          <Button href="/design" variant="dark">
            Design din genser →
          </Button>
        </div>
      </section>
    </>
  );
}
