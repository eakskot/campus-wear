import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cream/20 bg-ink text-cream">
      <div className="container-px grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:py-20">
        <div>
          <p className="font-display text-xl font-semibold uppercase tracking-tightest">
            Campus Wear
          </p>
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            Skoleklær laget for elever, ikke for gamle menn i dress. Kulere og
            billigere enn russedress-leverandørene — og null utslipp fra
            bomull til budbil.
          </p>
        </div>

        <div>
          <p className="eyebrow text-cream/50">Nettsiden</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/produkter" className="hover:text-lime">Produkter</Link></li>
            <li><Link href="/design" className="hover:text-lime">Design selv</Link></li>
            <li><Link href="/null-utslipp" className="hover:text-lime">Null utslipp</Link></li>
            <li><Link href="/om-oss" className="hover:text-lime">Om oss</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-cream/50">For skoler</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/kontakt" className="hover:text-lime">Bestill for skolen</Link></li>
            <li><Link href="/kontakt" className="hover:text-lime">Bli forhandler</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-cream/50">Kontakt</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="mailto:hei@campuswear.no" className="hover:text-lime">
                hei@campuswear.no
              </a>
            </li>
            <li className="text-cream/70">Basert i Norge 🇳🇴</li>
          </ul>
        </div>
      </div>

      <div className="container-px flex flex-col gap-2 border-t border-cream/10 py-6 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Campus Wear. Alle rettigheter forbeholdt.</p>
        <p>100 % av produksjon og frakt klimakompenseres.</p>
      </div>
    </footer>
  );
}
