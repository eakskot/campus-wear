import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Configurator from "@/components/design/Configurator";
import ProductTile from "@/components/product/ProductTile";
import { PRODUCTS, getProduct, getRelatedProducts } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};
  return {
    title: `${product.name} — Campus Wear`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <>
      <section className="container-px pb-8 pt-16 md:pt-24">
        <nav className="font-body text-xs uppercase tracking-[0.12em] text-ink/40">
          <Link href="/" className="hover:text-ink">
            Hjem
          </Link>
          <span className="mx-2">/</span>
          <Link href="/produkter" className="hover:text-ink">
            Produkter
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink/70">{product.name}</span>
        </nav>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-ink/45">{product.tagline}</p>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] md:text-6xl">
              {product.name}
            </h1>
          </div>
          <div className="text-right">
            <p className="whitespace-nowrap font-display text-3xl">
              {product.price},-
            </p>
            <p className="mt-1 whitespace-nowrap text-xs text-ink/45">
              Pris per stk, med skolelogo
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-xl text-ink/65">{product.description}</p>
        <p className="mt-3 font-body text-sm font-medium uppercase tracking-[0.06em] text-ink/70">
          {product.fabric}
        </p>
      </section>

      {/* LAG DITT DESIGN — samme konfigurator som /design, forhåndsvalgt til
          dette plagget, slik at man kan legge på skolelogoen rett her uten
          å navigere bort fra produktsiden. */}
      <section id="design" className="container-px pb-20 md:pb-28">
        <Suspense fallback={null}>
          <Configurator initialGarment={product.id} />
        </Suspense>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-sand/20">
          <div className="container-px py-16 md:py-24">
            <h2 className="font-display text-2xl md:text-3xl">
              Relaterte produkter
            </h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 md:max-w-2xl md:gap-14">
              {related.map((p) => (
                <ProductTile key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
