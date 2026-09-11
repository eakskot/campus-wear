import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Null utslipp — Campus Wear",
  description: "Slik klimakompenserer Campus Wear produksjon og frakt.",
};

const steps = [
  {
    n: "01",
    title: "Produksjon",
    body: "Alt vi produserer regnes med i klimaregnskapet vårt — fra bomull til ferdig genser.",
  },
  {
    n: "02",
    title: "Frakt",
    body: "Hver eneste pakke vi sender, uansett hvor liten, telles med og kompenseres.",
  },
  {
    n: "03",
    title: "Kompensering",
    body: "Vi kjøper klimakompensasjon som dekker utslippet fra steg 1 og 2, slik at netto klimaregnskap for bestillingen din blir null.",
  },
];

export default function NullUtslippPage() {
  return (
    <>
      <section className="bg-ink text-cream">
        <div className="container-px py-20 md:py-28">
          <p className="eyebrow text-cream/45">Null utslipp</p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl italic leading-[1.05] md:text-6xl">
            Kult skal ikke koste kloden.
          </h1>
          <p className="mt-6 max-w-lg text-cream/70">
            Vi mener billig og kult skoleklær ikke trenger å bety mer utslipp.
            Derfor klimakompenserer vi 100 % av produksjonen og frakten på alt
            vi sender ut — uten at det gjør plagget dyrere for deg.
          </p>
        </div>
      </section>

      <section className="container-px grid gap-10 py-20 md:grid-cols-3 md:gap-6 md:py-28">
        {steps.map((s) => (
          <div key={s.n} className="border-t border-ink/15 pt-6">
            <p className="font-display text-sm italic text-ink/35">{s.n}</p>
            <h2 className="mt-3 font-display text-xl">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">{s.body}</p>
          </div>
        ))}
      </section>

      <section className="container-px pb-20 md:pb-28">
        <div className="bg-sand/50 p-8 md:p-14">
          <h2 className="font-display text-2xl md:text-3xl">
            Vi er tidlig i denne reisen — og åpne om det
          </h2>
          <p className="mt-4 max-w-2xl text-ink/65">
            Campus Wear er et nytt merke. Vi jobber med å velge et anerkjent
            kompenseringsprogram og en produsent vi kan stå inne for, og vil
            oppdatere denne siden med konkrete tall og dokumentasjon etter
            hvert som avtalene er på plass. Vil du vite nøyaktig hvor vi står
            akkurat nå — spør oss, vi svarer ærlig.
          </p>
          <Button href="/kontakt" variant="ghost" className="mt-6">
            Spør oss om klimaregnskapet →
          </Button>
        </div>
      </section>
    </>
  );
}
