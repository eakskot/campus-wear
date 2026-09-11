import { Suspense } from "react";
import type { Metadata } from "next";
import Configurator from "@/components/design/Configurator";

export const metadata: Metadata = {
  title: "Design selv — Campus Wear",
  description: "Legg skolelogoen din på hettegenser eller joggebukse, og se den live før du bestiller.",
};

export default function DesignPage() {
  return (
    <section className="container-px pb-24 pt-16 md:pt-24">
      <p className="eyebrow text-ink/45">Designeren</p>
      <h1 className="mt-5 max-w-2xl font-display text-4xl leading-[1.05] md:text-6xl">
        Din skole. Din logo. Din stil.
      </h1>
      <p className="mt-6 max-w-lg text-ink/65">
        Velg plagg og farge, last opp skolens logo (eller skriv navnet), og
        dra den dit du vil ha den.
      </p>

      <div className="mt-16">
        <Suspense fallback={null}>
          <Configurator />
        </Suspense>
      </div>
    </section>
  );
}
