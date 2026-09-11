# Campus Wear

Nettside for Campus Wear — moderne skoleklær (hettegensere & joggebukser) for
videregående-elever, med egen designer for skolelogo og null-utslipp-profil.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000).

## Struktur

- `src/app` — sider (App Router): forside, `/produkter`, `/design`, `/null-utslipp`, `/om-oss`, `/kontakt`
- `src/components` — nav, footer, marquee, UI-komponenter
- `src/components/garments` — SVG-illustrasjoner av hettegenser og joggebukse (brukt i produktvisning og designeren)
- `src/components/design` — konfiguratoren (`Configurator.tsx`) hvor man velger plagg, farge og plasserer skolelogoen
- `src/lib` — produktdata (farger, størrelser, priser)

## Status / neste steg

Dette er en frontend-only versjon (ingen betaling eller ordre-backend enda):

- **Priser** i `src/lib/products.ts` er plassholdere — sett inn reelle priser.
- **Klimakompensasjon**: teksten sier dere kompenserer 100 % av produksjon og
  frakt, men det er ikke koblet til en navngitt leverandør/sertifisering ennå
  (f.eks. et anerkjent kompenseringsprogram). Bør på plass før lansering, så
  påstanden kan dokumenteres.
- **Bestilling** i `/design` og `/kontakt` samler bestillingen client-side og
  åpner en ferdigutfylt e-post (mailto). Når dere er klare for ordre/betaling
  (f.eks. Vipps eller Stripe), bør dette kobles til en ordentlig backend.
- **Skolelogo-opplasting** lagres kun i nettleseren (object URL) — ikke
  persistert noe sted.
