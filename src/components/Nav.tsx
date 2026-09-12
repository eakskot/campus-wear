"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/produkter", label: "Produkter" },
  { href: "/design", label: "Design selv" },
  { href: "/null-utslipp", label: "Null utslipp" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "For skoler" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On the homepage the nav starts transparent, floating over the dark
  // hero, and becomes the normal solid cream bar once you've scrolled
  // past it. Everywhere else it's always solid.
  const [solid, setSolid] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparent = isHome && !solid;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        transparent
          ? "border-transparent bg-transparent"
          : "border-ink/10 bg-cream/95 backdrop-blur"
      }`}
    >
      <div className="container-px flex h-[76px] items-center justify-between md:h-24">
        <Link
          href="/"
          className={`font-display text-xl italic tracking-tight transition-colors duration-300 md:text-2xl ${
            transparent ? "text-cream" : "text-ink"
          }`}
          onClick={() => setOpen(false)}
        >
          Campus Wear
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`eyebrow transition-colors duration-300 ${
                transparent ? "text-cream/65 hover:text-cream" : "text-ink/55 hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/design"
          className={`hidden shrink-0 items-center border px-5 py-2.5 font-body text-[13px] uppercase tracking-[0.12em] transition duration-300 md:inline-flex ${
            transparent
              ? "border-cream/60 text-cream hover:bg-cream hover:text-ink"
              : "border-ink text-ink hover:bg-ink hover:text-cream"
          }`}
        >
          Design din genser
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Åpne meny"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-px w-5 transition ${transparent ? "bg-cream" : "bg-ink"} ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-5 transition ${transparent ? "bg-cream" : "bg-ink"} ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-5 transition ${transparent ? "bg-cream" : "bg-ink"} ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/10 bg-cream md:hidden">
          <div className="container-px flex flex-col divide-y divide-ink/10">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-4 font-body text-sm uppercase tracking-[0.12em]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/design"
              onClick={() => setOpen(false)}
              className="py-4 font-body text-sm uppercase tracking-[0.12em] text-rust"
            >
              Design din genser →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
