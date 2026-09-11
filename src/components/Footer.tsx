import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream text-ink">
      <div className="container-px grid gap-10 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:py-20">
        <div>
          <p className="font-display text-2xl italic">Campus Wear</p>
          <p className="mt-4 max-w-xs text-sm text-ink/60">
            Skoleklær laget for elever, ikke for gamle menn i dress. Kulere og
            billigere enn russedress-leverandørene — og null utslipp fra
            bomull til budbil.
          </p>
        </div>

        <div>
          <p className="eyebrow text-ink/40">Nettsiden</p>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            <li><Link href="/produkter" className="hover:text-rust">Produkter</Link></li>
            <li><Link href="/design" className="hover:text-rust">Design selv</Link></li>
            <li><Link href="/null-utslipp" className="hover:text-rust">Null utslipp</Link></li>
            <li><Link href="/om-oss" className="hover:text-rust">Om oss</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-ink/40">For skoler</p>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            <li><Link href="/kontakt" className="hover:text-rust">Bestill for skolen</Link></li>
            <li><Link href="/kontakt" className="hover:text-rust">Bli forhandler</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-ink/40">Kontakt</p>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            <li>
              <a href="mailto:hei@campuswear.no" className="hover:text-rust">
                hei@campuswear.no
              </a>
            </li>
            <li className="text-ink/50">Basert i Norge 🇳🇴</li>
          </ul>
        </div>
      </div>

      <div className="container-px flex flex-col gap-2 border-t border-ink/10 py-6 text-xs text-ink/45 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Campus Wear. Alle rettigheter forbeholdt.</p>
        <p>100 % av produksjon og frakt klimakompenseres.</p>
      </div>
    </footer>
  );
}
