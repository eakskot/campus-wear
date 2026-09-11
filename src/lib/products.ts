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

export type Garment = {
  id: GarmentType;
  name: string;
  tagline: string;
  price: number;
  description: string;
};

// Priser er foreløpige plassholdere — sett inn reelle priser før lansering.
export const GARMENTS: Garment[] = [
  {
    id: "hoodie",
    name: "Hettegenser",
    tagline: "Relaxed fit, tung bomull",
    price: 449,
    description:
      "Løs passform med droppede skuldre, kengurulomme og tykk, myk bomull. Bygget for å tåle en hel skolehverdag — og hele russetiden etterpå.",
  },
  {
    id: "joggebukse",
    name: "Joggebukse",
    tagline: "Vid, rett i beina",
    price: 499,
    description:
      "Rett og vid gjennom hele benet, ikke smal ved ankelen — samme fasong som du kjenner igjen fra Caspara. Elastisk snørelinning og romslige lommer.",
  },
];

export const SET_PRICE = 849;
