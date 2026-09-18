// Sortiment — ett sted som definerer alt om hvert plagg vi selger. Å legge
// til et nytt plagg er å legge til ett objekt i PRODUCTS; alt annet
// (produktsiden, forsidens produktbokser, konfiguratoren, relaterte
// produkter) leser derfra i stedet for å hardkode data flere steder.

export type GarmentType = "hoodie" | "joggebukse";

export type ColorOption = {
  name: string;
  hex: string;
};

export const COLORS: ColorOption[] = [
  { name: "Sort", hex: "#17181B" },
  { name: "Sand", hex: "#D9CBAE" },
  { name: "Steingrå", hex: "#9A968D" },
  { name: "Marine", hex: "#232C3D" },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export type Product = {
  /** Stabil id, dobler som URL-slug: /produkter/[id] */
  id: GarmentType;
  name: string;
  tagline: string;
  price: number;
  /** Løpende markedsføringstekst — brukes i kort og på produktsiden. */
  description: string;
  /** Kort materialbeskrivelse, vist rett under prisen på produktsiden. */
  fabric: string;
  /** Andre produkt-id-er å vise under "Relaterte produkter". */
  relatedIds: GarmentType[];
};

// Priser er foreløpige plassholdere — sett inn reelle priser før lansering.
export const PRODUCTS: Product[] = [
  {
    id: "hoodie",
    name: "Hettegenser",
    tagline: "Relaxed fit, tung bomull",
    price: 449,
    description:
      "Løs passform med droppede skuldre, kengurulomme og tykk, myk bomull. Bygget for å tåle en hel skolehverdag — og hele russetiden etterpå.",
    fabric: "Myk og holdbar bomullsblend.",
    relatedIds: ["joggebukse"],
  },
  {
    id: "joggebukse",
    name: "Joggebukse",
    tagline: "Vid, rett i beina",
    price: 499,
    description:
      "Rett og vid gjennom hele benet, ikke smal ved ankelen — samme fasong som du kjenner igjen fra Caspara. Elastisk snørelinning og romslige lommer.",
    fabric: "Myk og holdbar bomullsblend.",
    relatedIds: ["hoodie"],
  },
];

export const SET_PRICE = 849;

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}

// --- Bakoverkompatible aliaser -------------------------------------------
// Eldre kode i repoet kalte dette "Garment"/"GARMENTS". Beholdes som et
// tynt lag så vi ikke trenger å jage ned hver eneste importsti — nye steder
// bør bruke Product/PRODUCTS direkte.
export type Garment = Product;
export const GARMENTS = PRODUCTS;
