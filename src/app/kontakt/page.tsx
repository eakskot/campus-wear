import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "For skoler — Campus Wear",
  description: "Bestill Campus Wear for hele skolen, eller bli forhandler.",
};

export default function KontaktPage() {
  return (
    <section className="container-px grid gap-12 py-16 md:grid-cols-2 md:py-24">
      <div>
        <p className="eyebrow text-ink/50">For skoler</p>
        <h1 className="mt-4 font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tightest md:text-5xl">
          La oss style hele klassen.
        </h1>
        <p className="mt-5 max-w-md text-ink/70">
          Send oss noen ord om skolen og hva dere trenger, så setter vi opp en
          egen designside med skolelogoen ferdig lagt inn — så bestiller
          hver elev sin egen størrelse selv.
        </p>

        <div className="mt-10 space-y-6">
          <div>
            <p className="font-display text-sm uppercase tracking-wide text-ink/50">
              E-post
            </p>
            <a href="mailto:hei@campuswear.no" className="text-lg hover:text-limedark">
              hei@campuswear.no
            </a>
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-wide text-ink/50">
              Svartid
            </p>
            <p className="text-lg">Vanligvis innen 1-2 dager</p>
          </div>
        </div>
      </div>

      <ContactForm />
    </section>
  );
}
