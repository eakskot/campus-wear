import { Suspense } from "react";
import type { Metadata } from "next";
import Configurator from "@/components/design/Configurator";

export const metadata: Metadata = {
  title: "Design selv — Campus Wear",
  description: "Legg skolelogoen din på hettegenser eller joggebukse, og se den live før du bestiller.",
};

export default function DesignPage() {
  return (
    <section className="container-px pb-20 pt-14 md:pt-20">
      <p className="eyebrow text-ink/50">Designeren</p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tightest md:text-6xl">
        Din skole. Din logo. Din stil.
      </h1>
      <p className="mt-5 max-w-lg text-ink/70">
        Velg plagg og farge, last opp skolens logo (eller skriv navnet), og
        dra den dit du vil ha den.
      </p>

      <div className="mt-12">
        <Suspense fallback={null}>
          <Configurator />
        </Suspense>
      </div>
    </section>
  );
}
