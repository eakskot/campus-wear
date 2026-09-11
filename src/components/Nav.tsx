"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/produkter", label: "Produkter" },
  { href: "/design", label: "Design selv" },
  { href: "/null-utslipp", label: "Null utslipp" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "For skoler" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/90 backdrop-blur">
      <div className="container-px flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-display text-lg font-semibold uppercase tracking-tightest md:text-xl"
          onClick={() => setOpen(false)}
        >
          Campus Wear
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-display text-sm uppercase tracking-wide text-ink/80 transition hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/design"
          className="hidden shrink-0 items-center border-2 border-ink bg-ink px-4 py-2 font-display text-sm uppercase tracking-wide text-cream shadow-hard-sm transition hover:bg-lime hover:text-ink md:inline-flex"
        >
          Design din genser
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Åpne meny"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border-2 border-ink md:hidden"
        >
          <span
            className={`block h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/15 bg-paper md:hidden">
          <div className="container-px flex flex-col divide-y divide-ink/10">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-4 font-display text-base uppercase tracking-wide"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/design"
              onClick={() => setOpen(false)}
              className="py-4 font-display text-base uppercase tracking-wide text-limedark"
            >
              Design din genser →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
