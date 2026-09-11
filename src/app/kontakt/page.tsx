import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "For skoler — Campus Wear",
  description: "Bestill Campus Wear for hele skolen, eller bli forhandler.",
};

export default function KontaktPage() {
  return (
    <section className="container-px grid gap-16 py-20 md:grid-cols-2 md:py-28">
      <div>
        <p className="eyebrow text-ink/45">For skoler</p>
        <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-5xl">
          La oss style hele klassen.
        </h1>
        <p className="mt-6 max-w-md text-ink/65">
          Send oss noen ord om skolen og hva dere trenger, så setter vi opp en
          egen designside med skolelogoen ferdig lagt inn — så bestiller
          hver elev sin egen størrelse selv.
        </p>

        <div className="mt-12 space-y-6 border-t border-ink/10 pt-8">
          <div>
            <p className="eyebrow text-ink/40">E-post</p>
            <a href="mailto:hei@campuswear.no" className="mt-1 block text-lg hover:text-rust">
              hei@campuswear.no
            </a>
          </div>
          <div>
            <p className="eyebrow text-ink/40">Svartid</p>
            <p className="mt-1 text-lg">Vanligvis innen 1-2 dager</p>
          </div>
        </div>
      </div>

      <ContactForm />
    </section>
  );
}
